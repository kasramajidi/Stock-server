"use client";

import Image from "next/image";
import { useState } from "react";

const configs = [
  {
    id: 1,
    title: "کانفیگ پیشنهادی",
    image: "/Images/PromotionalBanners/Baner.png",
    link: "/products/dl380-configs",
  },
  {
    id: 2,
    title: "کانفیگ ویژه",
    image: "/Images/PromotionalBanners/Baner.png",
    link: "/products/dl360-configs",
  },
];

export default function SuggestedConfigsSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % configs.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + configs.length) % configs.length);

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-base font-semibold text-gray-800">
          کانفیگ‌های پیشنهادی
        </h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#4F46E5]" />
      </div>

      {/* Slider */}
      <div className="relative flex-1 overflow-hidden mt-4">
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(${index * 100}%)` }}
        >
          {configs.map((item) => (
            <div
              key={item.id}
              className="min-w-full flex flex-col items-center justify-between px-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={220}
                className="object-contain"
                priority
              />

              <a
                href={item.link}
                className="mt-4 w-full text-center py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition"
              >
                مشاهده {item.title}
              </a>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-8 h-8"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-8 h-8"
        >
          ›
        </button>
      </div>
    </div>
  );
}
