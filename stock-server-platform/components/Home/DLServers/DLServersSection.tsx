"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const serversData = activeTab === "dl" ? dlServersData : mlServersData;

  return (
    <section className="bg-white rounded-[18px] shadow-sm border border-gray-100 w-full p-4 sm:p-6 overflow-visible">
      {/* تب‌ها */}
      <div className="flex items-center justify-center gap-3 mb-4">
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

      {/* هدر مثل حافظه رم */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-800 border-b-2 border-b-[#00DDFF] pb-1">
          {activeTab === "dl" ? "سرورهای DL" : "سرورهای ML"}
        </h2>
        <Link
          href="/shop"
          className="text-sm text-[#00DDFF] hover:underline flex items-center gap-1"
        >
          مشاهده همه
          <span>›</span>
        </Link>
      </div>

      {/* کاروسل — موبایل ۱ کارت، دسکتاپ ۴ کارت در هر اسلاید */}
      <div className="relative w-full max-w-[1260px] mx-auto">
        <Carousel
          opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
          className="relative w-full"
        >
          <CarouselContent className="-ms-4">
            {serversData.map((server, i) => (
              <CarouselItem
                key={`${activeTab}-${i}`}
                className="ps-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 min-w-0"
              >
                <div className="flex justify-center lg:justify-start">
                  <DLServerCard {...server} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 z-10 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
          <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 z-10 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
        </Carousel>
      </div>
    </section>
  );
}
