"use client";

import React, { useState, useRef, useEffect } from "react";

const SORT_OPTIONS = [
  { value: "price-low", label: "ارزان‌ترین" },
  { value: "price-high", label: "گران‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
];

interface ProductHeaderProps {
  onSortChange?: (value: string) => void;
  totalCount?: number;
}

export default function ProductHeader({ onSortChange, totalCount = 0 }: ProductHeaderProps) {
  const [selectedSort, setSelectedSort] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setSelectedSort(value);
    setIsOpen(false);
    onSortChange?.(value);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const label = SORT_OPTIONS.find((o) => o.value === selectedSort)?.label ?? "مرتب‌سازی";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {totalCount >= 0 && (
        <p className="text-slate-600 text-sm">
          <span className="font-semibold text-slate-800">{totalCount}</span> محصول
        </p>
      )}
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 w-full sm:w-[200px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-slate-300 transition-colors cursor-pointer"
        >
          {label}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-full sm:w-[200px] py-1 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange(opt.value)}
                className={`w-full text-right px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  selectedSort === opt.value
                    ? "bg-slate-50 text-[#0e7490] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
