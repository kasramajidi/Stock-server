"use client";

import Link from "next/link";
import Image from "next/image";
import PromotionalBanners from "../PromotionalBanners/PromotionalBanners";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    id: "other-parts",
    name: "سایر قطعات سرور",
    image: "/Images/Category/Server.png",
    href: "/category/other-parts",
  },
  {
    id: "network-card",
    name: "کارت شبکه",
    image: "/Images/Category/Network Card.png",
    href: "/category/network-card",
  },
  {
    id: "battery",
    name: "باتری سرور HP",
    image: "/Images/Category/Battery.png",
    href: "/category/battery",
  },
  {
    id: "raid-controller",
    name: "رید کنترلر سرور HP",
    image: "/Images/Category/Raid controller.png",
    href: "/category/raid-controller",
  },
  {
    id: "power-supply",
    name: "پاور سرور HP",
    image: "/Images/Category/Power Supply.png",
    href: "/category/power-supply",
  },
  {
    id: "fan",
    name: "فن سرور HP",
    image: "/Images/Category/Fan.png",
    href: "/category/fan",
  },
  {
    id: "hdd",
    name: "هارد سرور",
    image: "/Images/Category/HDD.png",
    href: "/category/hdd",
  },
  {
    id: "motherboard",
    name: "مادربرد سرور HP",
    image: "/Images/Category/Motherboard.png",
    href: "/category/motherboard",
  },
  {
    id: "ram",
    name: "رم سرور HP",
    image: "/Images/Category/Ram.png",
    href: "/category/ram",
  },
  {
    id: "cpu",
    name: "CPU سرور HP",
    image: "/Images/Category/CPU.png",
    href: "/category/cpu",
  },
  {
    id: "server",
    name: "سرور HP",
    image: "/Images/Category/Server.png",
    href: "/category/server",
  },
];

export default function CategoryIcons() {
  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-4 sm:mt-6 mb-0 overflow-hidden">
      {/* اول بنرهای تبلیغاتی */}
      <div className="-mx-3 min-[400px]:-mx-4 sm:-mx-6 md:-mx-8">
        <PromotionalBanners />
      </div>

      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-6 md:px-8 py-4 min-[400px]:py-5 sm:py-6 md:py-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00DDFF] text-white px-4 min-[400px]:px-5 py-2 sm:px-6 sm:py-3 mb-2">
            <h2 className="text-lg min-[400px]:text-xl sm:text-2xl font-bold">
              دسته بندی محصولات
            </h2>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-90" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
            </svg>
          </div>
          <div className="relative w-full h-0.5 bg-[#f7f7f7]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-56 h-full bg-[#00DDFF]"></div>
          </div>
        </div>

        {/* دسته‌بندی محصولات — همه در یک سطر */}
        <div className="w-full max-w-[1260px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap items-stretch justify-between gap-1 sm:gap-2 md:gap-4 min-w-max md:min-w-0">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-1 min-w-0 flex-col items-center gap-1.5 sm:gap-2 md:gap-3 group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain group-hover:opacity-80 transition-opacity"
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                  quality={75}
                  loading="lazy"
                />
              </div>
              <span className="text-[8px] min-[400px]:text-[9px] sm:text-[10px] md:text-xs text-center text-gray-700 font-medium max-w-[70px] min-[400px]:max-w-[80px] sm:max-w-[90px] leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
