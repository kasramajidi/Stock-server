"use client";

import { HiCheckCircle } from "react-icons/hi";

const tips = [
  "دامنه ای انتخاب کنید که کوتاه و به یادماندنی باشد",
  "از کلمات کلیدی مرتبط با کسب و کار خود استفاده کنید",
  "از استفاده از خط تیره و اعداد اجتناب کنید",
  "پسوند مناسب برای نوع فعالیت خود انتخاب کنید",
  "قبل از خرید، از در دسترس بودن دامنه اطمینان حاصل کنید",
];

export default function DomainTips() {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
        نکاتی برای انتخاب دامنه
      </h2>
      <ul className="space-y-3 sm:space-y-4 text-right">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700"
          >
            <HiCheckCircle className="text-[#ff5538] shrink-0 mt-0.5 text-lg sm:text-xl" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
