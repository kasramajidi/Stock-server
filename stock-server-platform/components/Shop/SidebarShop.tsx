"use client";

import React from "react";
import SearchFilter from "./filters/SearchFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";

export default function SidebarShop() {
  return (
    <aside className="bg-[#f6f5ff] p-5 space-y-6 rounded-2xl" aria-label="فیلترهای فروشگاه">
      <SearchFilter />
      <PriceRangeFilter />
      <CategoryFilter />
      <BrandFilter />
    </aside>
  );
}
