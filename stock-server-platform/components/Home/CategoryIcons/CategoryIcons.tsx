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
    <section
      className="bg-white rounded-2xl sm:rounded-3xl 
mx-3 xs:mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12
mt-4 sm:mt-6 overflow-hidden"
    >
      {/* بنر تبلیغاتی و دکمه دسته‌بندی */}
      <div className="-mx-2 min-[400px]:-mx-3 sm:-mx-4 md:-mx-5">
        <PromotionalBanners />
        <div className="flex justify-center pt-3 sm:pt-4 pb-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00DDFF] text-white px-4 min-[400px]:px-5 py-2 sm:px-6 sm:py-3 shadow-sm hover:bg-[#00ccee] transition-colors">
            <h2 className="text-lg min-[400px]:text-xl sm:text-2xl font-bold">
              دسته بندی محصولات
            </h2>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-90"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7zm11 0h7v7h-7v-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-6 md:px-8 py-4 min-[400px]:py-5 sm:py-6 md:py-8">
        <div className="relative w-full h-0.5 bg-[#f7f7f7] mb-4 sm:mb-6 md:mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-56 h-full bg-[#00DDFF]"></div>
        </div>

        {/* دسته‌بندی محصولات — همه در یک سطر */}
        <div className="w-full max-w-[1260px] mx-auto overflow-x-auto scrollbar-hide">
          <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:flex lg:flex-nowrap gap-3 sm:gap-4 md:gap-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex flex-1 min-w-0 flex-col items-center gap-1.5 sm:gap-2 md:gap-3 group hover:scale-105 transition-transform duration-200"
              >
                <div
                  className="relative 
w-12 h-12 
min-[400px]:w-14 min-[400px]:h-14
sm:w-16 sm:h-16
md:w-20 md:h-20
flex items-center justify-center shrink-0"
                >
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
                <span className="text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm text-center text-gray-700 font-medium max-w-[70px] min-[400px]:max-w-[80px] sm:max-w-[90px] leading-tight">
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
