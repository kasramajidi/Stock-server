import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/promo-grid-banners — لیست بنرهای تبلیغاتی گرید وسط صفحه (عمومی)
 * سه اسلات ۱، ۲، ۳ — هر کدام که پر باشد برمی‌گردد؛ بقیه در فرانت با پیش‌فرض پر می‌شوند
 */
export async function GET() {
  try {
    const rows = await prisma.promoGridBanner.findMany({
      orderBy: { position: "asc" },
      select: { id: true, position: true, imageUrl: true, alt: true, link: true },
    });
    const banners = rows.map((b) => ({
      id: b.id,
      position: b.position,
      image: b.imageUrl,
      alt: b.alt ?? "بنر تبلیغاتی",
      link: b.link ?? undefined,
    }));
    return NextResponse.json({ success: true, banners });
  } catch (e) {
    console.error("Promo grid banners GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت بنرها."] },
      { status: 500 }
    );
  }
}
