"use client";

import { HiCheckCircle } from "react-icons/hi";

const tips = [
  "فضای دیسک کافی",
  "پهنای باند مناسب",
  "کنترل پنل کاربرپسند",
  "امکان افزودن دامنه‌های اضافی",
  "پشتیبان‌گیری منظم",
  "آپتایم بالا (99.9%)",
  "پشتیبانی فنی ۲۴/۷",
];

export default function HostTips() {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center justify-end gap-2">
        <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
        مهم‌ترین نکات انتخاب هاست
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 hover:border-[#ff5538]/30 hover:shadow-md transition-all duration-200 flex items-center gap-3 flex-row-reverse text-right"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff5538]/10 flex items-center justify-center shrink-0">
              <HiCheckCircle className="text-[#ff5538] text-lg sm:text-xl" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
