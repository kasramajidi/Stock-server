import type { Metadata } from "next";
import {
  AboutHero,
  StatsSection,
  TestimonialsSection,
  ArticlesSection,
  AboutContactSection,
} from "./components";
import { getArticlesFromApi } from "../news/lib/articles-api";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره ريتكس - خدمات ارزی و پرداخت ارزی، نقد پی‌پال، مسترکارت، ویزا و سفارت",
  keywords: [
    "درباره ما",
    "ريتكس",
    "RAITX",
    "خدمات ارزی",
    "پرداخت ارزی",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const apiArticles = await getArticlesFromApi();
  const articlesForAbout = apiArticles.slice(0, 4).map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    date: a.date ?? "",
    image: a.image || "/Images/Shop/product-pic1.jpg",
    description:
      (Array.isArray(a.content) && a.content[0]
        ? String(a.content[0]).substring(0, 120)
        : a.title) + "...",
  }));

  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <AboutHero />
        <StatsSection />
        <TestimonialsSection />
        <ArticlesSection articles={articlesForAbout} />
        <AboutContactSection />
      </div>
    </main>
  );
}

