import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * DELETE /api/admin/banners/[id] — حذف بنر (ادمین)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(_request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  try {
    await prisma.heroBanner.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Admin banner DELETE error:", e);
    return NextResponse.json(
      { success: false, errors: ["بنر یافت نشد یا خطا در حذف."] },
      { status: 404 }
    );
  }
}
