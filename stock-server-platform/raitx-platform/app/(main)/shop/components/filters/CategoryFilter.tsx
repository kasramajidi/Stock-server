"use client";

import { useState } from "react";
import { useFilters } from "../../../context/FilterContext";
import { categories } from "../productsData";

export default function CategoryFilter() {
  const { selectedCategories, updateCategory } = useFilters();
  const [showAll, setShowAll] = useState(false);

  const initialCategories = categories.slice(0, 4);
  const visibleCategories = showAll ? categories : initialCategories;
  const hasMore = categories.length > 4;

  return (
    <section className="space-y-3" aria-label="فیلتر دسته بندی">
      <h3 className="text-base font-medium text-gray-900">دسته‌بندی‌ها</h3>

      <div className="space-y-3" role="group" aria-label="انتخاب دسته بندی">
        {visibleCategories.map((category) => {
          const isChecked = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
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
                aria-label={`انتخاب دسته بندی ${category}`}
              />
              <div
                className={`w-4 h-4 border-2 rounded group-hover:border-[#ff5538] transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isChecked
                    ? "bg-[#ff5538] border-[#ff5538]"
                    : "border-gray-300 bg-white"
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
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className={`text-sm sm:text-base transition-colors duration-200 ${
                isChecked 
                  ? "text-[#ff5538] font-medium" 
                  : "text-gray-700 group-hover:text-[#ff5538]"
              }`}>
                {category}
              </span>
            </label>
          );
        })}
        {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#ff5538] cursor-pointer hover:opacity-80 text-xs sm:text-sm font-medium transition-opacity duration-200 flex items-center gap-1 mt-1"
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
