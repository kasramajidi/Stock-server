"use client";

import Link from "next/link";

/** وقتی API دسته‌ای برنگرداند، این لیست نمایش داده می‌شود تا سایدبار خالی نباشد */
const FALLBACK_CATEGORIES = [
  "خدمات ارزی",
  "پرداخت ارزی",
  "ویزا و سفارت",
  "آزمون‌های بین‌المللی",
  "سفر و رزرو",
];

interface NewsSidebarProps {
  /** دسته‌بندی‌ها از API مقالات؛ در صورت خالی بودن از fallback استفاده می‌شود */
  categories?: string[];
  selectedCategory?: string;
}

export default function NewsSidebar({ categories = [], selectedCategory }: NewsSidebarProps) {
  const list = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;
  return (
    <aside className="lg:w-[190px] xl:w-[210px] w-full bg-white shadow-sm rounded-lg p-3 sm:p-4 md:p-5 h-fit border border-gray-200">
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 sm:mb-4 text-right hidden sm:block">
        دسته‌بندی‌ها
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-0">
        <div className="flex items-center gap-x-2 mb-0 sm:mb-3 md:mb-4 col-span-2 sm:col-span-1">
          <span className="block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 bg-gray-400" />
          <Link
            href="/news"
            className={`text-[11px] xs:text-xs sm:text-sm md:text-base line-clamp-1 transition-colors ${
              !selectedCategory ? "text-[#ff5538] font-medium" : "text-gray-600 hover:text-[#ff5538]"
            }`}
          >
            همه مقالات
          </Link>
        </div>
        {list.map((category, index) => {
          const isActive = selectedCategory === category;
          return (
            <div key={index} className="flex items-center gap-x-2 mb-0 sm:mb-3 md:mb-4 last:mb-0">
              <span
                className="block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? "#ff5538" : "#ff5538" }}
              />
              <Link
                href={`/news?category=${encodeURIComponent(category)}`}
                className={`text-[11px] xs:text-xs sm:text-sm md:text-base line-clamp-1 transition-colors ${
                  isActive ? "text-[#ff5538] font-medium" : "text-gray-600 hover:text-[#ff5538]"
                }`}
              >
                {category}
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

