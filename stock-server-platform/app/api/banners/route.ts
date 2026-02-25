import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/banners — لیست بنرهای اصلی (عمومی، برای Hero)
 */
export async function GET() {
  try {
    const banners = await prisma.heroBanner.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, imageUrl: true, alt: true, sortOrder: true },
    });
    return NextResponse.json({
      success: true,
      banners: banners.map((b) => ({
        id: b.id,
        imageUrl: b.imageUrl,
        alt: b.alt ?? "بنر استوک سرور",
        sortOrder: b.sortOrder,
      })),
    });
  } catch (e) {
    console.error("Banners GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت بنرها."] },
      { status: 500 }
    );
  }
}
