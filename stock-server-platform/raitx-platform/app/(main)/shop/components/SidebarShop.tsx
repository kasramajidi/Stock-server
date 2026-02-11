"use client";

import React from "react";
import { useFilters } from "../../context/FilterContext";
import SearchFilter from "./filters/SearchFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";

export default function ShopSidebar() {
  const { applyFilters } = useFilters();

  return (
    <aside
      className="bg-[#f6f5ff] p-5 space-y-6 rounded-2xl"
      aria-label="فیلترهای فروشگاه"
    >
      <SearchFilter />
      <PriceRangeFilter />
      <CategoryFilter />
      <BrandFilter />
      <button
        type="button"
        onClick={applyFilters}
        aria-label="اعمال فیلترهای انتخاب شده"
        className="w-full bg-[#ff5538] text-white py-2 px-4 rounded-lg hover:bg-[#e54d32] transition-colors duration-200 font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        اعمال فیلترها
      </button>
    </aside>
  );
}
