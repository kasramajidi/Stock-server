"use client";

import React from "react";
import { useFilters } from "../../context/FilterContext";
import { useShopProducts } from "../context/ShopProductsContext";
import ProductGrid from "./ProductGrid";
import { brands } from "./productsData";

export default function ShopMainContent() {
  const { products, loading, error, refetch } = useShopProducts();
  const { appliedFilters, setSelectedBrands, applyFilters } = useFilters();
  const mainCategoryId = appliedFilters?.mainCategoryId ?? null;
  const isGiftCards = mainCategoryId != null && (mainCategoryId.includes("گیفت") || mainCategoryId === "انواع گیفت کارت");

  return (
    <div className="space-y-6">
      {isGiftCards && brands.length > 0 && !error && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">فیلتر برند:</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedBrands([]);
                applyFilters();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                !appliedFilters?.brands?.length
                  ? "bg-[#ff5538] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              همه
            </button>
            {brands.map((brand) => {
              const isActive = appliedFilters?.brands?.includes(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    setSelectedBrands(isActive ? [] : [brand]);
                    applyFilters();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#ff5538] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm">
          <p className="font-medium mb-2">خطا در بارگذاری محصولات</p>
          <p className="mb-4">{error}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-[#ff5538] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            تلاش مجدد
          </button>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" aria-hidden />
        </div>
      ) : !error ? (
        <ProductGrid products={products} appliedFilters={appliedFilters} />
      ) : null}
    </div>
  );
}
