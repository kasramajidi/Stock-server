"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainContainer from "../ui/MainContainer";
import BreadcrumbBox from "../ui/BreadcrumbBox";

export default function EmptyCartState() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <MainContainer>
        <BreadcrumbBox pageName="تسویه حساب" />
        <div className="mt-8 text-center">
          <div className="bg-white p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              سبد خرید شما خالی است
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              برای ادامه تسویه حساب، ابتدا محصولی به سبد خرید اضافه کنید
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#ff5538] text-white px-8 py-3 font-medium hover:opacity-90 transition-opacity text-sm"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
