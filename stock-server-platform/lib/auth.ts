import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

const BEARER_PREFIX = "Bearer ";
const AUTH_COOKIE_NAME = "loginval";

export function getTokenFromRequest(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith(BEARER_PREFIX)) {
    const token = auth.slice(BEARER_PREFIX.length).trim();
    if (token) return token;
  }
  const cookie = request.headers.get("cookie");
  if (cookie) {
    const match = cookie.match(new RegExp("(?:^|;\\s*)" + AUTH_COOKIE_NAME + "=([^;]*)"));
    const value = match?.[1];
    if (value) return decodeURIComponent(value.trim());
  }
  return null;
}

export type AuthResult = { userId: string; tokenPayload: Awaited<ReturnType<typeof verifyToken>> };

/**
 * احراز هویت اجباری — در صورت نبود یا نامعتبر بودن توکن 401 برمی‌گرداند.
 */
export async function requireAuth(request: NextRequest): Promise<AuthResult | NextResponse> {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json(
      { success: false, errors: ["توکن احراز هویت ارسال نشده است."] },
      { status: 401 }
    );
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, errors: ["توکن نامعتبر یا منقضی است."] },
      { status: 401 }
    );
  }
  return { userId: payload.sub, tokenPayload: payload };
}

/** آیا نقش جزو ادمین (یا ادمین کل) است */
export function isAdminRole(role: string | null | undefined): boolean {
  return role === "admin" || role === "super_admin";
}

/** فقط ادمین یا ادمین کل — در غیر این صورت 403 برمی‌گرداند. */
export async function requireAdmin(request: NextRequest): Promise<{ userId: string } | NextResponse> {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;
  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { role: true },
  });
  if (!user || !isAdminRole(user.role)) {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز. فقط ادمین."] },
      { status: 403 }
    );
  }
  return { userId: auth.userId };
}

/** فقط ادمین کل — برای عملیات‌هایی مثل ادمین اضافه کردن. */
export async function requireSuperAdmin(request: NextRequest): Promise<{ userId: string } | NextResponse> {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;
  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { role: true },
  });
  if (!user || user.role !== "super_admin") {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز. فقط ادمین کل می‌تواند این کار را انجام دهد."] },
      { status: 403 }
    );
  }
  return { userId: auth.userId };
}

/** نرمال‌سازی موبایل برای استفاده در URL/query */
export function normalizeMobile(mobile: string): string {
  return mobile.replace(/\s/g, "").replace(/^\+98/, "0");
}
