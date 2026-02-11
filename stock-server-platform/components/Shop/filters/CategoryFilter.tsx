"use client";

import { useState } from "react";
import { useFilters } from "../context/FilterContext";
import { categories } from "../productsData";

export default function CategoryFilter() {
  const { selectedCategories, updateCategory } = useFilters();
  const [showAll, setShowAll] = useState(false);

  const initialCategories = categories.slice(0, 4);
  const visibleCategories = showAll ? categories : initialCategories;
  const hasMore = categories.length > 4;

  return (
    <section className="space-y-2" aria-label="فیلتر دسته بندی">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">دسته‌بندی محصول</span>
      <div className="space-y-0.5" role="group" aria-label="انتخاب دسته بندی">
        {visibleCategories.map((category) => {
          const isChecked = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group py-1.5"
              onClick={(e) => {
                e.preventDefault();
                updateCategory(category);
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => updateCategory(category)}
                className="sr-only"
                aria-label={`انتخاب ${category}`}
              />
              <div
                className={`w-4 h-4 border-2 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                  isChecked ? "bg-[#0e7490] border-[#0e7490]" : "border-slate-300 bg-white group-hover:border-slate-400"
                }`}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    updateCategory(category);
                  }
                }}
              >
                {isChecked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm transition-colors ${isChecked ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-800"}`}>
                {category}
              </span>
            </label>
          );
        })}
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-[#0e7490] cursor-pointer hover:underline text-xs font-medium flex items-center gap-1 mt-2"
          >
            {showAll ? (
              <>
                <span>مخفی کردن</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>نمایش همه</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
