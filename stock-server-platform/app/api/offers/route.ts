import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/offers
 * محصولاتی که درصد تخفیف آفر دارند (offerDiscountPercent > 0)
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        offerDiscountPercent: { not: null, gt: 0 },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        image: true,
        specs: true,
        offerDiscountPercent: true,
        priceLabel: true,
        price: true,
        originalPrice: true,
      },
    });

    return NextResponse.json({
      success: true,
      offers: products.map((p) => {
        const specList = specsToArray(p.specs);
        const specs = specList.length > 0 ? specList : [p.shortDescription];
        const discount = p.offerDiscountPercent ?? 0;
        const price = p.price ?? 0;
        const originalPrice =
          p.originalPrice ??
          (price > 0 && discount > 0 ? Math.round(price / (1 - discount / 100)) : 0);
        return {
          id: p.id,
          title: p.title,
          image: p.image ?? undefined,
          specs,
          shortDescription: p.shortDescription,
          offerDiscountPercent: discount,
          priceLabel: p.priceLabel,
          price,
          originalPrice: price > 0 && originalPrice > 0 ? originalPrice : null,
          href: `/shop/product/${p.slug}`,
        };
      }),
    });
  } catch (e) {
    console.error("Offers GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت آفرها."] },
      { status: 500 }
    );
  }
}

function specsToArray(specs: unknown): string[] {
  if (!specs) return [];
  if (Array.isArray(specs)) {
    return specs
      .map((item) => {
        if (item && typeof item === "object" && "value" in item) return String((item as { value: unknown }).value);
        if (item && typeof item === "object" && "key" in item)
          return `${(item as { key: string }).key}: ${(item as { value: unknown }).value ?? ""}`;
        return null;
      })
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  }
  if (typeof specs === "object" && specs !== null) {
    return Object.entries(specs)
      .map(([k, v]) => (v != null && v !== "" ? `${k}: ${v}` : null))
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  }
  return [];
}
