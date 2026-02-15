"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { Newspaper, RefreshCw, Plus, Search, Pencil, Trash2 } from "lucide-react";

const PERSIAN_LETTERS = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی";

interface ArticleRow {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  viewCount: number;
  publishedAt: string;
  createdAt: string;
  image?: string | null;
  tags: string[];
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [letterFilter, setLetterFilter] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedLetter, setAppliedLetter] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (appliedSearch.trim()) params.set("search", appliedSearch.trim());
    if (appliedCategory.trim()) params.set("category", appliedCategory.trim());
    if (appliedLetter.trim()) params.set("letter", appliedLetter.trim());
    const url = params.toString() ? `/api/articles?${params.toString()}` : "/api/articles";
    adminFetch<{ articles?: ArticleRow[] }>(url)
      .then(({ data, ok }) => {
        if (ok && data?.articles) setArticles(data.articles);
        else setError("خطا در بارگذاری مقالات.");
      })
      .finally(() => setLoading(false));
  }, [appliedSearch, appliedCategory, appliedLetter]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    adminFetch<{ categories?: string[] }>("/api/articles/categories").then(({ data, ok }) => {
      if (ok && data?.categories) setCategories(data.categories);
    });
  }, []);

  const applyFilters = () => {
    setAppliedSearch(searchInput);
    setAppliedCategory(categoryFilter);
    setAppliedLetter(letterFilter);
  };

  const clearFilters = () => {
    setSearchInput("");
    setCategoryFilter("");
    setLetterFilter("");
    setAppliedSearch("");
    setAppliedCategory("");
    setAppliedLetter("");
  };

  const deleteArticle = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف مقاله «${title}» مطمئن هستید؟`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) load();
      else alert(data?.errors?.[0] || "خطا در حذف مقاله.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return s;
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">مقالات</h1>
            <p className="text-slate-400 text-sm mt-1">مدیریت و افزودن مقالات بلاگ</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              بروزرسانی
            </button>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              افزودن مقاله
            </Link>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/30 p-4">
          <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 focus-within:ring-2 focus-within:ring-cyan-500/50">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyFilters())}
              placeholder="جستجو در عنوان..."
              className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="min-w-[160px] rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="">همهٔ دسته‌ها</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={applyFilters}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            اعمال فیلتر
          </button>
          {(appliedSearch || appliedCategory || appliedLetter) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-slate-500 hover:text-slate-300"
            >
              پاک کردن فیلتر
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500 ml-1">حرف اول عنوان:</span>
          <button
            type="button"
            onClick={() => {
              setLetterFilter("");
              setAppliedLetter("");
            }}
            className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
              !appliedLetter
                ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-600 hover:text-slate-200"
            }`}
          >
            همه
          </button>
          {PERSIAN_LETTERS.split("").map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => {
                setLetterFilter(char);
                setAppliedLetter(char);
              }}
              className={`rounded-lg px-2 py-1 text-sm font-medium transition-colors min-w-8 ${
                appliedLetter === char
                  ? "bg-cyan-500/30 text-cyan-400 border border-cyan-500/50"
                  : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-600 hover:text-slate-200"
              }`}
            >
              {char}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading && articles.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 overflow-hidden">
            <div className="h-12 border-b border-slate-700 bg-slate-800/50" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 border-b border-slate-700/50 animate-pulse bg-slate-800/20" />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl border border-slate-700 bg-slate-800/30 overflow-hidden"
            style={{ animation: "adminCardIn 0.35s ease-out" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50 text-slate-400 text-right">
                    <th className="p-3 font-medium">عنوان</th>
                    <th className="p-3 font-medium">دسته</th>
                    <th className="p-3 font-medium">بازدید</th>
                    <th className="p-3 font-medium">تاریخ انتشار</th>
                    <th className="p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b border-slate-700/50 text-slate-200 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="p-3 font-medium max-w-[200px] truncate" title={a.title}>
                        {a.title}
                      </td>
                      <td className="p-3 text-slate-400">{a.category}</td>
                      <td className="p-3 text-slate-400">{a.viewCount}</td>
                      <td className="p-3 text-slate-400">{formatDate(a.publishedAt)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/article/${a.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 min-w-16 rounded-lg border border-slate-600 bg-slate-700/50 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600 hover:text-slate-100 transition-colors"
                          >
                            مشاهده
                          </Link>
                          <Link
                            href={`/admin/articles/${a.id}/edit`}
                            className="inline-flex items-center justify-center gap-1 min-w-16 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-2.5 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5 shrink-0" />
                            ویرایش
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteArticle(a.id, a.title)}
                            disabled={!!actionLoading}
                            className="inline-flex items-center justify-center gap-1 min-w-16 rounded-lg border border-red-500/40 bg-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5 shrink-0" />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {articles.length === 0 && !loading && (
              <div className="p-8 text-center text-slate-500">مقاله‌ای ثبت نشده است.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
