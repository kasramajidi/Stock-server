import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, normalizeMobile } from "@/lib/auth";

/**
 * PATCH /api/users/[mobile]/role — تنظیم نقش کاربر (ادمین کردن یا برگرداندن به کاربر عادی)
 * فقط ادمین می‌تواند فراخوانی کند. ادمین نمی‌تواند نقش خودش را تغییر دهد.
 * Body: { role: "admin" | "user" }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const auth = await requireAdmin(request);
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

  if (target.id === auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["امکان تغییر نقش خودتان وجود ندارد."] },
      { status: 400 }
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

  const role = body.role === "admin" ? "admin" : body.role === "user" ? "user" : null;
  if (role === null) {
    return NextResponse.json(
      { success: false, errors: ["نقش باید admin یا user باشد."] },
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

  return NextResponse.json({
    success: true,
    message: role === "admin" ? "کاربر به ادمین تغییر کرد." : "نقش کاربر به کاربر عادی تغییر کرد.",
    user: updated,
  });
}
