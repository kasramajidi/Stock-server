"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbBoxProps {
  pageName: string;
}

const BreadcrumbBox = ({ pageName }: BreadcrumbBoxProps) => {
  return (
    <nav
      className="flex justify-center items-center w-full"
      aria-label="مسیر صفحه"
    >
      <div className="w-full max-w-[500px] bg-white rounded-lg p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-4 m-4 sm:m-8 h-16 sm:h-14 shadow-sm border border-gray-200">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center text-center">
          <Link
            href="/"
            className="text-gray-800 font-medium text-xs sm:text-sm hover:text-[#ff5538] transition-colors"
          >
            خانه
          </Link>
          <span className="text-gray-600 text-xs sm:text-sm">/</span>
          <span className="text-gray-800 font-medium text-xs sm:text-sm wrap-break-word">
            {pageName}
          </span>
        </div>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </nav>
  );
};

export default BreadcrumbBox;
