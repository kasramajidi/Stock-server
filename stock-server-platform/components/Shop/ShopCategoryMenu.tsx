"use client";

import React from "react";
import { useFilters } from "./context/FilterContext";
import { useShopProducts } from "./context/ShopProductsContext";

export default function ShopCategoryMenu() {
  const { selectedMainCategoryId, setSelectedMainCategoryId } = useFilters();
  const { categories } = useShopProducts();

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">دسته‌بندی</span>
      <ul className="space-y-0.5" role="list" aria-label="انتخاب دسته">
        {categories.map((cat) => {
          const isSelected = selectedMainCategoryId === cat;
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => setSelectedMainCategoryId(isSelected ? null : cat)}
                aria-pressed={isSelected}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#0e7490]/10 text-[#0e7490]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex-1">{cat}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0e7490] shrink-0" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
