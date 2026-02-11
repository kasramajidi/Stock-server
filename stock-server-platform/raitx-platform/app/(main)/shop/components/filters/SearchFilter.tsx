"use client";

import { useFilters } from "../../../context/FilterContext";

export default function SearchFilter() {
  const { searchQuery, setSearchQuery } = useFilters();
  const isSearching = false;
  
  const updateSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-gray-900">جستجو</h3>
      <div className="relative">
        <label htmlFor="product-search" className="sr-only">
          جستجو محصولات
        </label>
        <input
          id="product-search"
          type="search"
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="جستجو محصولات"
          aria-label="جستجو محصولات"
          className="w-full pl-12 pr-4 py-2.5 outline-none border-b border-gray-300 bg-transparent focus:border-[#ff5538] transition-colors text-right text-sm placeholder-gray-400"
        />
        <button
          type="button"
          aria-label={isSearching ? "در حال جستجو" : "جستجو"}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isSearching ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
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
          )}
        </button>
      </div>
    </div>
  );
}
