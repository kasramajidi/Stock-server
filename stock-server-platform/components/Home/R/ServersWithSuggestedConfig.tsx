"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServersWithSuggestedConfig() {
  return (
    <section className="bg-white rounded-[18px] mx-[20px] sm:mx-[30px] md:mx-[50px] mt-6 mb-8 shadow-sm border border-gray-100">
      <div className="p-4 sm:p-6 md:p-8">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-stretch">

          {/* ================= LEFT : DL / ML SERVERS ================= */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col">

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-3 bg-gray-100 p-1 rounded-xl">
                <button className="px-6 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-medium">
                  DL
                </button>
                <button className="px-6 py-2 rounded-lg text-gray-600 text-sm font-medium">
                  ML
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                سرورهای رکمونت (DL)
              </h2>
              <Link
                href="/shop"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#4F46E5] text-white text-xs hover:bg-[#4338CA]"
              >
                مشاهده همه
              </Link>
            </div>

            {/* Slider */}
            <div
              className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="shrink-0 w-[240px] sm:w-[260px] bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg transition"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-[170px] bg-[#4F46E5] rounded-t-xl flex items-center justify-center">
                    <Image
                      src="/Images/Category/Server.png"
                      alt="server"
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                      سرور HPE ProLiant DL380 G10
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      ۲۶۵,۰۰۰,۰۰۰ تومان
                    </p>
                    <p className="text-sm font-bold text-gray-800 mb-3">
                      ۱۷۵,۰۰۰,۰۰۰ تومان
                    </p>

                    <button className="w-8 h-8 mx-auto flex items-center justify-center rounded-lg bg-[#4F46E5] text-white">
                      🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT : SUGGESTED CONFIG ================= */}
          <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm flex flex-col">

            {/* Title */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                کانفیگ‌های پیشنهادی
              </h2>
              <div className="mt-2 h-[2px] w-20 bg-[#4F46E5]" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col items-center justify-between">

              {/* Image */}
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden mb-4">
                <Image
                  src="/Images/Baner/Layer 5.png"
                  alt="Suggested Config"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Button */}
              <Link
                href="/configs"
                className="w-full text-center py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
              >
                مشاهده کانفیگ‌های سرور DL380 G10
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
