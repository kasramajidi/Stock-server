"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { PackagePlus, RefreshCw, ChevronRight, ChevronLeft, Pencil, Trash2, Search } from "lucide-react";

const PER_PAGE = 10;

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  brand: string;
  priceLabel: string;
  inStock: boolean;
  viewCount: number;
  createdAt: string;
  image?: string | null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const load = useCallback(
    (p: number) => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: String(p),
        limit: String(PER_PAGE),
        order: "newest",
      });
      if (appliedSearch.trim()) params.set("search", appliedSearch.trim());
      if (appliedCategory.trim()) params.set("category", appliedCategory.trim());
      const url = `/api/products?${params.toString()}`;
      adminFetch<{ products?: Product[]; total?: number; totalPages?: number }>(url)
        .then(({ data, ok }) => {
          if (ok && data) {
            setProducts(data.products ?? []);
            setTotal(data.total ?? 0);
            setTotalPages(data.totalPages ?? 0);
            setPage(p);
          } else setError("خطا در بارگذاری محصولات.");
        })
        .finally(() => setLoading(false));
    },
    [appliedSearch, appliedCategory]
  );

  const applyFilters = () => {
    setAppliedSearch(searchInput);
    setAppliedCategory(categoryFilter);
    setPage(1);
  };

  useEffect(() => {
    adminFetch<{ categories?: string[] }>("/api/products/categories").then(({ data, ok }) => {
      if (ok && data?.categories) setCategories(data.categories);
    });
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    load(p);
  };

  const deleteProduct = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف «${title}» مطمئن هستید؟`)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) load(page);
      else alert(data?.errors?.[0] || "خطا در حذف محصول.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">محصولات</h1>
            <p className="text-slate-400 text-sm mt-1">مدیریت و افزودن محصولات فروشگاه</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => load(page)}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              بروزرسانی
            </button>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors"
            >
              <PackagePlus className="h-4 w-4" />
              افزودن محصول
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
              placeholder="جستجو در عنوان محصول..."
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
          {(appliedSearch || appliedCategory) && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setCategoryFilter("");
                setAppliedSearch("");
                setAppliedCategory("");
                setPage(1);
              }}
              className="text-sm text-slate-500 hover:text-slate-300"
            >
              پاک کردن فیلتر
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading && products.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 overflow-hidden">
            <div className="h-12 border-b border-slate-700 bg-slate-800/50" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 border-b border-slate-700/50 animate-pulse bg-slate-800/20" />
            ))}
          </div>
        ) : (
          <>
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
                      <th className="p-3 font-medium">برند</th>
                      <th className="p-3 font-medium">قیمت</th>
                      <th className="p-3 font-medium">موجودی</th>
                      <th className="p-3 font-medium">بازدید</th>
                      <th className="p-3 font-medium">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-slate-700/50 text-slate-200 hover:bg-slate-700/20 transition-colors"
                      >
                        <td className="p-3 font-medium">{p.title}</td>
                        <td className="p-3 text-slate-400">{p.category}</td>
                        <td className="p-3 text-slate-400">{p.brand}</td>
                        <td className="p-3 text-slate-400">{p.priceLabel}</td>
                        <td className="p-3">
                          {p.inStock ? (
                            <span className="text-emerald-400/90 text-xs">موجود</span>
                          ) : (
                            <span className="text-slate-500 text-xs">ناموجود</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-400">{p.viewCount}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/shop/product/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 min-w-16 rounded-lg border border-slate-600 bg-slate-700/50 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600 hover:text-slate-100 transition-colors"
                            >
                              مشاهده
                            </Link>
                            <Link
                              href={`/admin/products/${p.id}/edit`}
                              className="inline-flex items-center justify-center gap-1 min-w-16 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-2.5 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                            >
                              <Pencil className="h-3.5 w-3.5 shrink-0" />
                              ویرایش
                            </Link>
                            <button
                              type="button"
                              onClick={() => deleteProduct(p.id, p.title)}
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
              {products.length === 0 && !loading && (
                <div className="p-8 text-center text-slate-500">محصولی ثبت نشده است.</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                  قبلی
                </button>
                <span className="px-3 py-2 text-sm text-slate-400">
                  صفحه {page} از {totalPages} (جمع {total} محصول)
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  بعدی
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
