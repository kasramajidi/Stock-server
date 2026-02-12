import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin, normalizeMobile } from "@/lib/auth";

const userSelect = {
  id: true,
  fullName: true,
  mobile: true,
  email: true,
  role: true,
  isBanned: true,
  createdAt: true,
  updatedAt: true,
};

async function getAuthAndTarget(request: NextRequest, mobileParam: string) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;
  const mobile = normalizeMobile(decodeURIComponent(mobileParam));
  const target = await prisma.user.findUnique({ where: { mobile } });
  if (!target) {
    return NextResponse.json(
      { success: false, errors: ["کاربر با این شماره یافت نشد."] },
      { status: 404 }
    );
  }
  const isAdmin = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { role: true },
  }).then((u) => u?.role === "admin");
  const isSelf = target.id === auth.userId;
  if (!isAdmin && !isSelf) {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز."] },
      { status: 403 }
    );
  }
  return { auth, target, isAdmin };
}

/**
 * GET /api/users/[mobile] — دریافت یک کاربر با موبایل (ادمین یا خود کاربر)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const { mobile } = await params;
  const result = await getAuthAndTarget(request, mobile);
  if (result instanceof NextResponse) return result;
  const user = await prisma.user.findUnique({
    where: { id: result.target.id },
    select: userSelect,
  });
  return NextResponse.json({ success: true, user });
}

/**
 * PATCH /api/users/[mobile] — بروزرسانی کاربر (ادمین یا خود کاربر)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const { mobile } = await params;
  const result = await getAuthAndTarget(request, mobile);
  if (result instanceof NextResponse) return result;
  const body = await request.json().catch(() => ({}));
  const data: { fullName?: string; email?: string } = {};
  if (typeof body.fullName === "string" && body.fullName.trim().length >= 2) {
    data.fullName = body.fullName.trim();
  }
  if (typeof body.email === "string" && body.email.includes("@")) {
    data.email = body.email.trim().toLowerCase();
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { success: false, errors: ["هیچ فیلد معتبری برای بروزرسانی ارسال نشده است."] },
      { status: 400 }
    );
  }
  const updated = await prisma.user.update({
    where: { id: result.target.id },
    data,
    select: userSelect,
  });
  return NextResponse.json({ success: true, user: updated });
}

/**
 * DELETE /api/users/[mobile] — حذف کاربر (فقط ادمین)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { mobile } = await params;
  const normalized = normalizeMobile(decodeURIComponent(mobile));
  const target = await prisma.user.findUnique({ where: { mobile: normalized } });
  if (!target) {
    return NextResponse.json(
      { success: false, errors: ["کاربر با این شماره یافت نشد."] },
      { status: 404 }
    );
  }
  if (target.id === auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["امکان حذف خودتان وجود ندارد."] },
      { status: 400 }
    );
  }
  await prisma.user.delete({ where: { id: target.id } });
  return NextResponse.json({
    success: true,
    message: "کاربر با موفقیت حذف شد.",
  });
}
