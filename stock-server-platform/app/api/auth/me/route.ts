import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/auth/me — اطلاعات کاربر لاگین‌شده (برای چک نقش و نمایش در پنل)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: {
      id: true,
      fullName: true,
      mobile: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { success: false, errors: ["کاربر یافت نشد."] },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      fullName: user.fullName,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      isBanned: user.isBanned,
      createdAt: user.createdAt,
    },
  });
}
