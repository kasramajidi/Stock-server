"use client";

import React from "react";
import { useFilters } from "../../context/FilterContext";
import { useShopProducts } from "../context/ShopProductsContext";

type CategoryIconType = "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other";

function getIconForCategory(categoryName: string): CategoryIconType {
  const s = categoryName || "";
  if (/پرداخت|ارزی|ویزا|مستر|پی پال/.test(s)) return "currency";
  if (/آزمون|تافل|آیلتس|جی آر ای|ثبت نام/.test(s)) return "exams";
  if (/سفارت|ویزا|وقت مصاحبه/.test(s)) return "embassy";
  if (/اپلای|دانشگاه|شهریه|اپلیکیشن/.test(s)) return "apply";
  if (/گیفت|کارت/.test(s)) return "giftcards";
  return "other";
}

function CategoryIcon({ icon, active }: { icon: CategoryIconType; active: boolean }) {
  const className = `w-5 h-5 shrink-0 ${active ? "text-[#ff5538]" : "text-gray-400"}`;
  switch (icon) {
    case "currency":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "exams":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "embassy":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "apply":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case "giftcards":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      );
    case "other":
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
}

export default function ShopCategoryMenu() {
  const { selectedMainCategoryId, setSelectedMainCategoryId } = useFilters();
  const { categories } = useShopProducts();

  return (
    <div className="overflow-hidden">
      <p className="text-sm font-bold text-gray-800 mb-2">
        دسته‌بندی‌ها
      </p>
      <ul className="space-y-1" role="list" aria-label="انتخاب دسته">
        {categories.map((cat) => {
          const isSelected = selectedMainCategoryId === cat;
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => setSelectedMainCategoryId(isSelected ? null : cat)}
                aria-pressed={isSelected}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-right transition-colors border border-transparent cursor-pointer ${
                  isSelected
                    ? "bg-[#ff5538]/10 text-[#ff5538]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <CategoryIcon icon={getIconForCategory(cat)} active={isSelected} />
                <span className="flex-1 text-sm font-medium">{cat}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#ff5538] shrink-0" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
