"use client";

import Link from "next/link";
import DLServerCard from "./DLServerCard";

const serversData = [
  {
    title: "خرید و قیمت سرور استوک HP ProLiant DL360 G9",
    image: "/Images/Category/Server.png",
    oldPrice: "۲۶,۲۵۰,۰۰۰",
    price: "۱۶۵,۰۰۰,۰۰۰",
  },
  {
    title: "سرور HPE ProLiant DL360 G10",
    image: "/Images/Category/Server.png",
    oldPrice: "۲۹۴,۰۰۰,۰۰۰",
    price: "۱,۴۶۶,۰۰۰,۰۰۰",
  },
  {
    title: "سرور HPE ProLiant DL360 G11",
    image: "/Images/Category/Server.png",
  },
  {
    title: "قیمت و خرید سرور HP DL380 G10",
    image: "/Images/Category/Server.png",
  },
];

export default function DLServersSection() {
  return (
    <section className="bg-white rounded-[18px] mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] mt-6 mb-8 shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 md:p-8">
        
        {/* Tabs */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-medium">
              سرور DL
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition">
              سرور ML
            </button>
          </div>
        </div>

        {/* Title & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center sm:text-right">
            سرورهای DL
          </h2>
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338CA] transition-colors"
          >
            <span>مشاهده همه</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Scrollable Product Cards - Slider */}
        <div className="relative flex items-center">
          <div
            className="overflow-x-auto scrollbar-hide flex gap-4 sm:gap-5 md:gap-6 py-2 px-3 sm:px-10 md:px-14"
            style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          >
            {serversData.map((server, i) => (
              <DLServerCard key={i} {...server} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
