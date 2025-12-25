"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه دسته‌بندی‌ها");

  const categories = [
    "همه دسته‌بندی‌ها",
    "سرور",
    "تجهیزات شبکه",
    "رم سرور",
    "هارد سرور",
    "پردازنده",
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 w-full max-w-2xl mx-auto">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-r-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-xs sm:text-sm md:text-base"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="جستجوی محصولات"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right text-xs sm:text-sm md:text-base"
      />

      <button
        type="button"
        className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] sm:min-w-[56px]"
        aria-label="جستجو"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
