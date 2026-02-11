"use client";

import React, { useState, useRef, useEffect } from "react";

const sortOptions = [
  { value: "price-low", label: "از ارزان به گران" },
  { value: "price-high", label: "از گران به ارزان" },
  { value: "newest", label: "از جدید به قدیم" },
  { value: "oldest", label: "از قدیم به جدید" },
];

interface ProductHeaderProps {
  onSortChange?: (value: string) => void;
}

export default function ProductHeader({ onSortChange }: ProductHeaderProps) {
  const [selectedSort, setSelectedSort] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setIsDropdownOpen(false);
    onSortChange?.(value);
  };

  const selectedSortLabel =
    sortOptions.find((option) => option.value === selectedSort)?.label ||
    "مرتب سازی براساس...";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">فروشگاه گیفت کارت</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-700 px-4 py-2 flex items-center justify-between gap-3 hover:text-gray-900 transition-colors min-w-[200px] border-b border-gray-300"
          >
            <span className="text-sm font-medium text-right">
              {selectedSortLabel}
            </span>
            <svg
              className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gray-500 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {sortOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedSort === option.value
                      ? "bg-gray-50 text-[#ff5538] font-medium"
                      : "text-gray-700 hover:text-[#ff5538]"
                  } ${
                    index !== sortOptions.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
