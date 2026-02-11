"use client";

import React, { useState, useMemo } from "react";
import ProductHeader from "./ProductHeader";
import ProductCard from "./CardProduct";
import type { ShopProduct } from "@/lib/shop-api";

interface ProductGridProps {
  products: ShopProduct[];
  appliedFilters?: {
    categories: string[];
    brands: string[];
    mainCategoryId: string | null;
    search: string;
    price: [number, number];
  };
}

export default function ProductGrid({ products, appliedFilters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    if (!appliedFilters) return products;
    let list = products;
    if (appliedFilters.mainCategoryId)
      list = list.filter((p) => p.category === appliedFilters!.mainCategoryId);
    if (appliedFilters.categories?.length)
      list = list.filter((p) => appliedFilters!.categories.includes(p.category));
    if (appliedFilters.brands?.length)
      list = list.filter((p) => appliedFilters!.brands.includes(p.brand));
    if (appliedFilters.search) {
      const q = appliedFilters.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (appliedFilters.price[0] > 0 || appliedFilters.price[1] < 5000000000)
      list = list.filter(
        (p) => p.price >= appliedFilters!.price[0] && p.price <= appliedFilters!.price[1]
      );
    return list;
  }, [products, appliedFilters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [filtered, sortBy]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageProducts = sorted.slice(start, start + perPage);

  const setPage = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <ProductHeader onSortChange={handleSortChange} totalCount={sorted.length} />

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 sm:p-16 text-center">
          <p className="text-slate-500 text-lg font-medium mb-1">محصولی یافت نشد</p>
          <p className="text-slate-400 text-sm">فیلترها را تغییر دهید یا عبارت جستجو را عوض کنید.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {pageProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 6} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 pt-4">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="صفحه قبل"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`min-w-[2.5rem] py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === p
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    aria-label={`صفحه ${p}`}
                    aria-current={currentPage === p ? "page" : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="صفحه بعد"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
