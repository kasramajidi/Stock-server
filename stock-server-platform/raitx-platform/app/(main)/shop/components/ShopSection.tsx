"use client";

import React from "react";
import Link from "next/link";
import { useFilters } from "../../context/FilterContext";
import SearchFilter from "./filters/SearchFilter";
import ShopCategoryMenu from "./ShopCategoryMenu";
import ShopMainContent from "./ShopMainContent";

export default function ShopSection() {
  const { applyFilters } = useFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
        <nav className="mb-4 sm:mb-6" aria-label="مسیر صفحه">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link
              href="/"
              className="text-[#ff5538] hover:opacity-80 transition-opacity"
            >
              خانه
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">فروشگاه</span>
          </div>
        </nav>
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 sm:mb-8" aria-labelledby="shop-hero-heading">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
              <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 id="shop-hero-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              فروشگاه گیفت کارت و خدمات مالی دیجیتال
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
              خرید و فروش گیفت کارت‌های معتبر بین‌المللی با تحویل فوری. استیم، گوگل پلی، اپل، ایکس‌باکس، پلی‌استیشن، نتفلیکس، اسپاتیفای، آمازون و سایر پلتفرم‌ها با پشتیبانی ۲۴/۷.
            </p>
          </div>
        </section>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 sm:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <aside className="lg:col-span-1" aria-label="فیلترهای فروشگاه">
          <div className="sticky top-4 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 mb-3">جستجو</h2>
                <SearchFilter />
              </div>
              <div className="p-4 border-b border-gray-100">
                <ShopCategoryMenu />
              </div>
              <div className="p-4">
                <button
                  type="button"
                  onClick={applyFilters}
                  aria-label="اعمال فیلترهای انتخاب شده"
                  className="w-full bg-[#ff5538] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#e54d32] transition-colors shadow-sm cursor-pointer"
                >
                  اعمال فیلترها
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <ShopMainContent />
        </div>
      </div>
      </div>
    </div>
  );
}
