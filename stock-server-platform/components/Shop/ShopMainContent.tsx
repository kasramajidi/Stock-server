"use client";

import React from "react";
import { useShopProducts } from "./context/ShopProductsContext";
import ProductGrid from "./ProductGrid";
import { useFilters } from "./context/FilterContext";

export default function ShopMainContent() {
  const { products, loading, error, refetch } = useShopProducts();
  const { appliedFilters } = useFilters();

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
        <p className="text-red-700 font-medium mb-2">خطا در بارگذاری محصولات</p>
        <p className="text-slate-600 text-sm mb-6">{error}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-2 border-slate-200 border-t-slate-700 rounded-full animate-spin" aria-hidden />
        <p className="mt-4 text-slate-500 text-sm">در حال بارگذاری...</p>
      </div>
    );
  }

  return <ProductGrid products={products} appliedFilters={appliedFilters} />;
}
