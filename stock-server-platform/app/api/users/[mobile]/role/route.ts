import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin, normalizeMobile } from "@/lib/auth";

/**
 * PATCH /api/users/[mobile]/role — تنظیم نقش کاربر با شماره موبایل
 * فقط ادمین کل (super_admin) دسترسی دارد. می‌تواند نقش را user، admin یا super_admin قرار دهد.
 * Body: { role: "user" | "admin" | "super_admin" }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const auth = await requireSuperAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { mobile } = await params;
  const normalized = normalizeMobile(decodeURIComponent(mobile));

  const target = await prisma.user.findUnique({
    where: { mobile: normalized },
    select: { id: true, fullName: true, mobile: true, role: true },
  });
  if (!target) {
    return NextResponse.json(
      { success: false, errors: ["کاربر با این شماره موبایل یافت نشد."] },
      { status: 404 }
    );
  }

  let body: { role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: ["بدنه درخواست نامعتبر است."] },
      { status: 400 }
    );
  }

  const role =
    body.role === "super_admin" ? "super_admin" : body.role === "admin" ? "admin" : body.role === "user" ? "user" : null;
  if (role === null) {
    return NextResponse.json(
      { success: false, errors: ["نقش باید user، admin یا super_admin باشد."] },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: target.id },
    data: { role },
    select: {
      id: true,
      fullName: true,
      mobile: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const messages: Record<string, string> = {
    user: "نقش به کاربر عادی تغییر کرد.",
    admin: "نقش به ادمین تغییر کرد.",
    super_admin: "نقش به ادمین کل تغییر کرد.",
  };
  return NextResponse.json({
    success: true,
    message: messages[role] ?? "نقش بروزرسانی شد.",
    user: updated,
  });
}
