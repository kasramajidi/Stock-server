import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/promotional-banners — لیست بنرهای تبلیغاتی چپ و راست (عمومی)
 * خروجی به ترتیب: چپ اول، راست دوم
 */
export async function GET() {
  try {
    const rows = await prisma.promotionalBanner.findMany({
      orderBy: { position: "asc" },
      select: { id: true, position: true, imageUrl: true, alt: true, link: true },
    });
    const banners = rows.map((b) => ({
      id: b.id,
      position: b.position as "left" | "right",
      image: b.imageUrl,
      alt: b.alt ?? "بنر تبلیغاتی",
      link: b.link ?? undefined,
    }));
    return NextResponse.json({ success: true, banners });
  } catch (e) {
    console.error("Promotional banners GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت بنرها."] },
      { status: 500 }
    );
  }
}
