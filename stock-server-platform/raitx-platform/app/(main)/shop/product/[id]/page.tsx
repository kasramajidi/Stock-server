import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";
import { products } from "../../components/productsData";
import { fetchShopProducts, fetchProductById } from "../../lib/shop-api";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProductById(id: string) {
  const productId = parseInt(id, 10);
  if (Number.isNaN(productId)) return null;
  try {
    // اول از لیست کامل بگیر تا UserComments حتماً بیاید (مثل مقاله)
    const apiProducts = await fetchShopProducts();
    const fromList = apiProducts.find((p) => p.id === productId);
    if (fromList) return fromList;
    const fromApi = await fetchProductById(productId);
    if (fromApi) return fromApi;
  } catch {
    // fallback to static
  }
  return products.find((p) => p.id === productId) ?? null;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      description: "محصول مورد نظر یافت نشد",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const productUrl = `${siteUrl}/shop/product/${product.id}`;
  const productImage = product.image?.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product.image ?? "";

  return {
    title: `${product.name} | ريتكس`,
    description:
      product.description || `${product.name} از برند ${product.brand}`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      "گیفت کارت",
      "ريتكس",
    ],
    openGraph: {
      title: `${product.name} | ريتكس`,
      description:
        product.description || `${product.name} از برند ${product.brand}`,
      type: "website",
      images: [
        {
          url: productImage,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `/shop/product/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const productUrl = `${siteUrl}/shop/product/${product?.id}`;
  const productImage = product?.image?.startsWith("/")
    ? `${siteUrl}${product.image}`
    : product?.image || "";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: productImage,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "IRR",
          price: product.price.toString(),
          availability: "https://schema.org/InStock",
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
