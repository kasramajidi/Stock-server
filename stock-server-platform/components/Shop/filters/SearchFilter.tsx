"use client";

import { useFilters } from "../context/FilterContext";

export default function SearchFilter() {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <div className="space-y-2">
      <label htmlFor="shop-search" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        جستجو
      </label>
      <div className="relative">
        <input
          id="shop-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="نام محصول..."
          aria-label="جستجو"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/20 focus:border-[#0e7490] transition-colors"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
