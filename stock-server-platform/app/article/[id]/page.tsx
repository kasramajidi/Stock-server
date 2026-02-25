"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import ArticleCommentsSection from "@/components/Article/ArticleCommentsSection";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string | null;
  viewCount: number;
  publishedAt: string;
  tags: string[];
  createdBy?: { fullName: string } | null;
}

export default function ArticleViewPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.article) setArticle(data.article);
        else setArticle(null);
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) notFound();
  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#17e2fe]/30 border-t-[#17e2fe]" />
          <span className="text-sm text-gray-500">در حال بارگذاری مقاله...</span>
        </div>
      </main>
    );
  }
  if (!article) notFound();

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return s;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <nav
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 animate-[articleContentIn_0.5s_ease-out_0.1s_both]"
          aria-label="مسیر"
        >
          <Link href="/" className="transition-colors hover:text-[#17e2fe]">
            خانه
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/blog" className="transition-colors hover:text-[#17e2fe]">
            بلاگ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="truncate max-w-48 text-gray-700 sm:max-w-md">{article.title}</span>
        </nav>

        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-[articleContentIn_0.6s_ease-out_0.15s_both]">
          <div className="px-8 py-8 sm:px-12 sm:py-10 lg:px-16 lg:py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#17e2fe]/40 bg-[#17e2fe]/5 px-4 py-1.5 text-xs font-medium text-[#0b7a8a]">
              <span className="h-2 w-2 rounded-full bg-[#17e2fe]" />
              {article.category}
            </span>

            <h1 className="mt-6 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-snug">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {article.createdBy?.fullName && (
                <>
                  <span>{article.createdBy.fullName}</span>
                  <span className="text-gray-300">•</span>
                </>
              )}
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {article.viewCount > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{article.viewCount.toLocaleString("fa-IR")} بازدید</span>
                </>
              )}
            </div>

            {article.excerpt && (
              <p className="mt-8 border-b border-gray-100 pb-8 text-lg leading-relaxed text-gray-600">
                {article.excerpt}
              </p>
            )}

            <div
              className="article-prose-light mt-10 animate-[articleStagger_0.4s_ease-out_0.2s_both]"
              dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
            />

            {article.tags?.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-3 pt-10 border-t border-gray-100">
                {article.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#17e2fe]/30 bg-[#17e2fe]/5 px-4 py-2 text-sm text-[#0b7a8a] transition-all duration-300 hover:border-[#17e2fe]/50 hover:bg-[#17e2fe]/10"
                    style={{ animationDelay: `${0.25 + i * 0.03}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <ArticleCommentsSection articleId={article.id} articleTitle={article.title} />
          </div>
        </article>
      </div>
    </main>
  );
}
