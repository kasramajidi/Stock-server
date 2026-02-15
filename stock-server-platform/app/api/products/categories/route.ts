import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/products/categories
 * لیست دسته‌بندی‌های یکتا (برای فیلتر در پنل ادمین)
 */
export async function GET() {
  try {
    const rows = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });
    const categories = rows.map((r) => r.category).filter(Boolean);
    return NextResponse.json({ success: true, categories });
  } catch (e) {
    console.error("Products categories GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت دسته‌بندی‌ها."] },
      { status: 500 }
    );
  }
}
