import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsPageClient } from "./components";
import { getArticlesFromApi } from "./lib/articles-api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";

export const metadata: Metadata = {
  title: "اخبار و مقالات | ريتكس",
  description:
    "آخرین اخبار و مقالات ريتكس در زمینه خدمات ارزی، پرداخت ارزی، پی‌پال، مسترکارت و ویزا",
  keywords: [
    "اخبار",
    "مقالات",
    "ريتكس",
    "خدمات ارزی",
    "پرداخت ارزی",
  ],
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: `${siteUrl}/news`,
    siteName: "ريتكس",
    title: "اخبار و مقالات | ريتكس",
    description:
      "آخرین اخبار و مقالات ريتكس در زمینه خدمات ارزی، پرداخت ارزی، پی‌پال، مسترکارت و ویزا",
    images: [
      {
        url: `${siteUrl}/Images/Baner/Layer 5.png`,
        width: 1200,
        height: 630,
        alt: "اخبار و مقالات ريتكس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "اخبار و مقالات | ريتكس",
    description: "آخرین اخبار و مقالات ريتكس در زمینه خدمات ارزی و پرداخت ارزی",
  },
};

export default async function NewsPage() {
  const apiArticles = await getArticlesFromApi();
  const articlesForClient = apiArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    image: a.image || "/Images/Shop/product-pic1.jpg",
    date: a.date ?? "",
    comments: a.comments ?? 0,
    content: a.content ?? [],
  }));

  // دسته‌بندی‌ها مستقیماً از مقالات API (داینامیک)
  const categoriesFromArticles = Array.from(
    new Set(
      apiArticles
        .map((a) => a.category)
        .filter((c): c is string => c != null && String(c).trim() !== "")
    )
  ).sort((a, b) => a.localeCompare(b, "fa"));

  return (
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#ff5538] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <NewsPageClient articles={articlesForClient} categories={categoriesFromArticles} />
        </Suspense>
      </div>
    </main>
  );
}
