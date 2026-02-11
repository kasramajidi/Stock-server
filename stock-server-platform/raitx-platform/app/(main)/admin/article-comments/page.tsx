"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import ArticleCommentsTable from "./components/ArticleCommentsTable";
import {
  getArticleComments,
  getArticlesForFilter,
  deleteArticleComment,
  type ArticleCommentItem,
  type ArticleOption,
} from "./lib/article-comments-api";

export default function ArticleCommentsPage() {
  const [comments, setComments] = useState<ArticleCommentItem[]>([]);
  const [articles, setArticles] = useState<ArticleOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const list = await getArticlesForFilter();
      setArticles(list);
    } catch {
      setArticles([]);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getArticleComments();
      setComments(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت نظرات");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const articleTitleById: Record<string, string> = {};
  articles.forEach((a) => {
    articleTitleById[String(a.id)] = a.title ?? "";
  });
  const filteredComments = searchTerm.trim()
    ? comments.filter((c) => {
        const title = c.articleTitle ?? articleTitleById[String(c.idarticle)] ?? "";
        const text = (c.commentText ?? "").toLowerCase();
        const user = (c.userName ?? "").toLowerCase();
        const q = searchTerm.toLowerCase();
        return title.toLowerCase().includes(q) || text.includes(q) || user.includes(q);
      })
    : comments;

  const uniqueArticles = new Set(comments.map((c) => String(c.idarticle))).size;
  const articleCommentStats = [
    { title: "کل نظرات مقالات", value: comments.length, icon: "📄", color: "bg-blue-50 text-blue-600" },
    { title: "مقالات دارای نظر", value: uniqueArticles, icon: "📝", color: "bg-emerald-50 text-emerald-600" },
    { title: "نتیجه جستجو", value: filteredComments.length, icon: "🔍", color: "bg-violet-50 text-violet-600" },
  ];

  const handleDelete = async (
    idarticle: number | string,
    id: number | string
  ) => {
    setDeletingId(`${idarticle}-${id}`);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteArticleComment(idarticle, id);
      setComments((prev) =>
        prev.filter(
          (c) =>
            String(c.id) !== String(id) ||
            String(c.idarticle) !== String(idarticle)
        )
      );
      setSuccessMessage("نظر حذف شد.");
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در حذف");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            کامنت مقاله‌ها
          </h1>
          <p className="text-sm text-gray-600">
            نمایش نظرات مقالات؛ حذف نظر از اینجا
          </p>
        </div>

        <AdminStatsCards items={articleCommentStats} />

        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="جستجو (عنوان مقاله، متن نظر، نام کاربر)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white rounded-xl border border-gray-200 pl-4 pr-12 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/20 focus:border-[#ff5538] transition-all text-sm shadow-sm"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
          </div>
        ) : (
          <ArticleCommentsTable
            comments={filteredComments}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </AdminLayout>
  );
}
