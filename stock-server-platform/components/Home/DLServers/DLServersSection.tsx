"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import DLServerCard from "./DLServerCard";

const dlServersData = [
  { title: "خرید و قیمت سرور استوک HP ProLiant DL360 G9", image: "/Images/Category/Server.png", oldPrice: "۲۶,۲۵۰,۰۰۰", price: "۱۶۵,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant DL360 G10", image: "/Images/Category/Server.png", oldPrice: "۲۹۴,۰۰۰,۰۰۰", price: "۱,۴۶۶,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant DL360 G11", image: "/Images/Category/Server.png" },
  { title: "قیمت و خرید سرور HP DL380 G10", image: "/Images/Category/Server.png" },
  { title: "سرور HPE ProLiant DL380 Gen10", image: "/Images/Category/Server.png", oldPrice: "۳۲۰,۰۰۰,۰۰۰", price: "۳۸۰,۰۰۰,۰۰۰" },
  { title: "خرید سرور HP DL360 Gen9", image: "/Images/Category/Server.png", price: "۹۵,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant DL380 G9", image: "/Images/Category/Server.png" },
  { title: "قیمت و خرید سرور DL380 Gen11", image: "/Images/Category/Server.png", oldPrice: "۴۵۰,۰۰۰,۰۰۰", price: "۵۲۰,۰۰۰,۰۰۰" },
  { title: "سرور HP ProLiant DL320 Gen10", image: "/Images/Category/Server.png", price: "۱۱۰,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant DL360 Gen10 Plus", image: "/Images/Category/Server.png", oldPrice: "۲۸۰,۰۰۰,۰۰۰", price: "۳۴۰,۰۰۰,۰۰۰" },
];

const mlServersData = [
  { title: "خرید و قیمت سرور HP ProLiant ML350 Gen10", image: "/Images/Category/Server.png", oldPrice: "۱۸۰,۰۰۰,۰۰۰", price: "۲۲۰,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant ML350 Gen9", image: "/Images/Category/Server.png", oldPrice: "۱۲۰,۰۰۰,۰۰۰", price: "۱۴۵,۰۰۰,۰۰۰" },
  { title: "سرور HP ProLiant ML310 Gen10", image: "/Images/Category/Server.png", price: "۹۵,۰۰۰,۰۰۰" },
  { title: "قیمت و خرید سرور استوک HP ML110 Gen10", image: "/Images/Category/Server.png", oldPrice: "۴۵,۰۰۰,۰۰۰", price: "۵۵,۰۰۰,۰۰۰" },
  { title: "سرور HPE ProLiant ML30 Gen10", image: "/Images/Category/Server.png" },
  { title: "خرید سرور تاور HP ProLiant ML350 Gen11", image: "/Images/Category/Server.png", oldPrice: "۳۵۰,۰۰۰,۰۰۰", price: "۴۲۰,۰۰۰,۰۰۰" },
  { title: "سرور HP ProLiant ML110 Gen9", image: "/Images/Category/Server.png", price: "۳۸,۰۰۰,۰۰۰" },
  { title: "قیمت و خرید سرور ML HPE ProLiant ML310 Gen9", image: "/Images/Category/Server.png" },
  { title: "سرور تاور HPE ProLiant ML350 Gen10 Plus", image: "/Images/Category/Server.png", oldPrice: "۲۸۰,۰۰۰,۰۰۰", price: "۳۳۰,۰۰۰,۰۰۰" },
];

export default function DLServersSection() {
  const [activeTab, setActiveTab] = useState<"dl" | "ml">("dl");
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const serversData = activeTab === "dl" ? dlServersData : mlServersData;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeTab]);

  return (
    <section className="bg-white rounded-[18px] mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] mt-6 mb-8 shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 md:p-8">
        
        {/* Tabs - عین تصویر: pill شکل، فیروزه فعال، خاکستری غیرفعال */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("dl")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === "dl"
                  ? "bg-[#00DDFF] text-white shadow-sm hover:bg-[#00c4e6]"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              سرور DL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ml")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === "ml"
                  ? "bg-[#00DDFF] text-white shadow-sm hover:bg-[#00c4e6]"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              سرور ML
            </button>
          </div>
        </div>

        {/* Title & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center sm:text-right">
            {activeTab === "dl" ? "سرورهای DL" : "سرورهای ML"}
          </h2>
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00DDFF] text-white text-sm font-medium hover:bg-[#00c4e6] transition-colors"
          >
            <span>مشاهده همه</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
            </svg>
          </Link>
        </div>

        {/* Slider */}
        <div className="relative flex items-center">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide flex gap-4 sm:gap-5 md:gap-6 py-2 px-2 sm:px-12 md:px-14"
            style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          >
            {serversData.map((server, i) => (
              <div
                key={`${activeTab}-${i}`}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{ scrollSnapAlign: "start" }}
                className="shrink-0"
              >
                <DLServerCard {...server} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
