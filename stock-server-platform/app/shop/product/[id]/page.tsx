import type { Metadata } from "next";
import ProductDetails from "@/components/Shop/ProductDetails";
import { fetchShopProducts, fetchProductById } from "@/lib/shop-api";
import { prisma } from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProductById(id: string) {
  const productId = parseInt(id, 10);
  if (!Number.isNaN(productId)) {
    try {
      const apiProducts = await fetchShopProducts();
      const fromList = apiProducts.find((p) => p.id === productId);
      if (fromList) return fromList;
      const fromApi = await fetchProductById(productId);
      if (fromApi) return fromApi;
    } catch {
      // fallback
    }
    return null;
  }
  // id ممکن است slug یا cuid محصول Prisma باشد
  try {
    const p = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!p) return null;
    return {
      id: 0,
      prismaProductId: p.id,
      name: p.title,
      price: 0,
      image: p.image || "",
      rating: p.rating ?? 5,
      reviews: 0,
      isNew: false,
      category: p.category,
      brand: p.brand,
      createdAt: p.createdAt.toISOString().slice(0, 10),
      sales: 0,
      description: p.shortDescription,
      mainCategoryId: "server",
      productType: "server" as const,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      description: "محصول مورد نظر یافت نشد",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir";
  const productImage = product.image?.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product.image ?? "";

  return {
    title: `${product.name} | استوک سرور`,
    description: product.description || `${product.name} از برند ${product.brand}`,
    keywords: [product.name, product.brand, product.category, "سرور", "استوک سرور"],
    openGraph: {
      title: `${product.name} | استوک سرور`,
      description: product.description || `${product.name} از برند ${product.brand}`,
      type: "website",
      images: productImage ? [{ url: productImage, alt: product.name }] : undefined,
    },
    alternates: { canonical: `/shop/product/${id}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir";
  const productUrl = `${siteUrl}/shop/product/${id}`;
  const productImage = product?.image?.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product?.image ?? "";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: productImage,
        brand: { "@type": "Brand", name: product.brand },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "IRR",
          price: product.price > 0 ? product.price.toString() : undefined,
          availability: product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/ContactForPrice",
        },
        aggregateRating:
          product.reviews > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating.toString(),
                reviewCount: product.reviews.toString(),
              }
            : undefined,
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetails initialProduct={product} />
    </>
  );
}
