"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

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
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
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
    <main className="min-h-screen bg-slate-900 text-slate-100" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <nav className="mb-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors">
            بلاگ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{article?.title}</span>
        </nav>

        <article className="rounded-xl border border-slate-700 bg-slate-800/30 overflow-hidden">
          {article?.image && (
            <div className="aspect-video w-full bg-slate-800">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
              <span>{article?.category}</span>
              <span>•</span>
              <time dateTime={article?.publishedAt}>{article && formatDate(article.publishedAt)}</time>
              {article && article.viewCount > 0 && (
                <>
                  <span>•</span>
                  <span>{article.viewCount} بازدید</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">{article?.title}</h1>
            {article?.excerpt && (
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">{article.excerpt}</p>
            )}
            <div
              className="prose prose-invert prose-sm max-w-none text-slate-200"
              dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}
            />
            {article?.tags?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-700 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-700/50 px-3 py-1 text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
