import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

const BEARER_PREFIX = "Bearer ";

export function getTokenFromRequest(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith(BEARER_PREFIX)) return null;
  return auth.slice(BEARER_PREFIX.length).trim() || null;
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

/**
 * فقط ادمین — در غیر این صورت 403 برمی‌گرداند.
 */
export async function requireAdmin(request: NextRequest): Promise<{ userId: string } | NextResponse> {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;
  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { role: true },
  });
  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز. فقط ادمین."] },
      { status: 403 }
    );
  }
  return { userId: auth.userId };
}

/** نرمال‌سازی موبایل برای استفاده در URL/query */
export function normalizeMobile(mobile: string): string {
  return mobile.replace(/\s/g, "").replace(/^\+98/, "0");
}
