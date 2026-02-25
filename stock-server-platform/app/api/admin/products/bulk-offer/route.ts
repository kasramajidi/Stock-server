import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * POST /api/admin/products/bulk-offer
 * اعمال درصد تخفیف آفر به همهٔ محصولات یک دسته‌بندی
 * Body: { category: string, offerDiscountPercent: number } — 0 برای حذف آفر
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const percent = typeof body.offerDiscountPercent === "number" ? body.offerDiscountPercent : null;

    if (!category) {
      return NextResponse.json(
        { success: false, errors: ["دسته‌بندی الزامی است."] },
        { status: 400 }
      );
    }

    if (percent !== null && (percent < 0 || percent > 99)) {
      return NextResponse.json(
        { success: false, errors: ["درصد تخفیف باید بین ۰ تا ۹۹ باشد."] },
        { status: 400 }
      );
    }

    const result = await prisma.product.updateMany({
      where: { category },
      data: { offerDiscountPercent: percent === 0 ? null : percent },
    });

    return NextResponse.json({
      success: true,
      message:
        percent === 0 || percent === null
          ? `آفر از ${result.count} محصول حذف شد.`
          : `آفر ${percent}٪ به ${result.count} محصول اعمال شد.`,
      updatedCount: result.count,
    });
  } catch (e) {
    console.error("Bulk offer error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در اعمال آفر به دسته."] },
      { status: 500 }
    );
  }
}
