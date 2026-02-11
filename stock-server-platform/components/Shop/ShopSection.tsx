"use client";

import React from "react";
import Link from "next/link";
import { useFilters } from "./context/FilterContext";
import SearchFilter from "./filters/SearchFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";
import ShopCategoryMenu from "./ShopCategoryMenu";
import ShopMainContent from "./ShopMainContent";

export default function ShopSection() {
  const { applyFilters } = useFilters();

  const pageMargin =
    "mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k";

  return (
    <div className="min-h-screen bg-slate-50/80">
      <div className={`${pageMargin} pt-6 pb-4 sm:pt-8 sm:pb-6`}>
        <nav className="mb-6" aria-label="مسیر صفحه">
          <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
            <Link
              href="/"
              className="text-slate-700 hover:text-[#0e7490] transition-colors font-medium"
            >
              خانه
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">فروشگاه</span>
          </div>
        </nav>

        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            فروشگاه سرور و تجهیزات شبکه
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            سرور استوک HP و HPE، رم، هارد، CPU، پاور و قطعات با گارانتی معتبر و قیمت رقابتی.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-[#0e7490]" aria-hidden />
        </header>
      </div>

      <div className={`${pageMargin} pb-12 sm:pb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
          <aside
            className="lg:sticky lg:top-24 lg:self-start shrink-0"
            aria-label="فیلترهای فروشگاه"
          >
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  فیلترها
                </h2>
              </div>
              <div className="p-5 space-y-6">
                <SearchFilter />
                <ShopCategoryMenu />
                <PriceRangeFilter />
                <CategoryFilter />
                <BrandFilter />
                <button
                  type="button"
                  onClick={applyFilters}
                  aria-label="اعمال فیلترها"
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  اعمال فیلترها
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <ShopMainContent />
          </div>
        </div>
      </div>
    </div>
  );
}
