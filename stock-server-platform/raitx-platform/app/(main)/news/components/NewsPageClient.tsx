"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import FeaturedArticles from "./FeaturedArticles";
import LatestArticlesSection from "./LatestArticlesSection";
import NewsSidebar from "./NewsSidebar";

const LATEST_ARTICLES_PER_PAGE = 8;

/** حذف تگ‌های HTML از متن تا در کارت به‌صورت متن ساده نمایش داده شود */
function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ArticleForList {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
}

interface NewsPageClientProps {
  articles: ArticleForList[];
  categories: string[];
}

export default function NewsPageClient({ articles, categories }: NewsPageClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category")?.trim() ?? "";

  const filteredArticles = useMemo(() => {
    if (!categoryParam) return articles;
    return articles.filter((a) => (a.category ?? "").trim() === categoryParam);
  }, [articles, categoryParam]);

  const featuredArticles = useMemo(
    () =>
      filteredArticles.slice(0, 5).map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category ?? "—",
        comments: a.comments ?? 0,
        image: a.image || "/Images/Shop/product-pic1.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  const latestArticles = useMemo(
    () =>
      filteredArticles.map((a) => ({
        id: a.id,
        title: a.title,
        description: stripHtml(a.content?.[0] ?? "").substring(0, 150) || a.title,
        date: a.date ?? "",
        image: a.image || "/Images/Shop/product-pic1.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  const [latestPage, setLatestPage] = useState(1);
  const totalLatestPages = Math.max(1, Math.ceil(latestArticles.length / LATEST_ARTICLES_PER_PAGE));
  const paginatedLatest = useMemo(
    () =>
      latestArticles.slice(
        (latestPage - 1) * LATEST_ARTICLES_PER_PAGE,
        latestPage * LATEST_ARTICLES_PER_PAGE
      ),
    [latestArticles, latestPage]
  );

  useEffect(() => {
    setLatestPage(1);
  }, [categoryParam]);

  useEffect(() => {
    if (latestPage > totalLatestPages) setLatestPage(totalLatestPages);
  }, [latestPage, totalLatestPages]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-3 order-2 lg:order-2">
          {filteredArticles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {categoryParam ? `مقاله‌ای در دسته «${categoryParam}» یافت نشد.` : "مقاله‌ای یافت نشد."}
            </p>
          ) : (
            <FeaturedArticles articles={featuredArticles} />
          )}
        </div>
        <aside className="lg:col-span-1 order-1 lg:order-1">
          <NewsSidebar categories={categories} selectedCategory={categoryParam || undefined} />
        </aside>
      </div>
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        {filteredArticles.length > 0 ? (
          <>
            <LatestArticlesSection articles={paginatedLatest} />
            {latestArticles.length > LATEST_ARTICLES_PER_PAGE && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8 mb-8 sm:mb-10">
                <button
                  type="button"
                  onClick={() => setLatestPage((p) => Math.max(1, p - 1))}
                  disabled={latestPage <= 1}
                  className="min-w-[80px] h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  قبلی
                </button>
                <span className="text-sm text-gray-600 px-2">
                  صفحه {latestPage} از {totalLatestPages}
                </span>
                <button
                  type="button"
                  onClick={() => setLatestPage((p) => Math.min(totalLatestPages, p + 1))}
                  disabled={latestPage >= totalLatestPages}
                  className="min-w-[80px] h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}
