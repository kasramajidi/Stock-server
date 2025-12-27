"use client";

import Link from "next/link";
import Image from "next/image";

import { RxDoubleArrowDown } from "react-icons/rx";

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
    <section className="bg-white rounded-3xl mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-6 mb-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="relative mb-4 sm:mb-6 -mt-4 sm:-mt-6">
          <div className="flex justify-center">
            <div className="relative w-10 sm:w-16 h-3 sm:h-8">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-full bg-gray-100 rounded-b-full"></div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-3 sm:-translate-y-1/2 text-gray-400">
                <RxDoubleArrowDown className="text-xs sm:text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            دسته بندی محصولات
          </h2>
          <div className="relative w-full h-0.5 bg-[#f7f7f7]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-56 h-full bg-[#ff5b5b]"></div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 justify-center min-w-max px-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex flex-col items-center gap-2 sm:gap-3 group hover:scale-105 transition-transform duration-200 min-w-[80px] sm:min-w-[100px]"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm text-center text-gray-700 font-medium max-w-[100px] sm:max-w-[120px] leading-tight">
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
