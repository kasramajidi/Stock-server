import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, normalizeMobile } from "@/lib/auth";

/**
 * PATCH /api/users/[mobile]/ban — بن / آنبن کاربر (فقط ادمین)
 * Body: { banned: true | false }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { mobile } = await params;
  const normalized = normalizeMobile(decodeURIComponent(mobile));
  const user = await prisma.user.findUnique({ where: { mobile: normalized } });
  if (!user) {
    return NextResponse.json(
      { success: false, errors: ["کاربر با این شماره یافت نشد."] },
      { status: 404 }
    );
  }
  if (user.id === auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["امکان بن کردن خودتان وجود ندارد."] },
      { status: 400 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const banned = typeof body.banned === "boolean" ? body.banned : true;

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { isBanned: banned },
    select: {
      id: true,
      fullName: true,
      mobile: true,
      isBanned: true,
    },
  });
  return NextResponse.json({
    success: true,
    message: banned ? "کاربر بن شد." : "کاربر آنبن شد.",
    user: updated,
  });
}
