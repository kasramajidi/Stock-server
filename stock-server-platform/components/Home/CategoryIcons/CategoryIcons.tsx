"use client";

import Link from "next/link";
import Image from "next/image";
import { RxDoubleArrowDown } from "react-icons/rx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    <section className="bg-white rounded-2xl sm:rounded-3xl mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-4 sm:mt-6 mb-0">
      {/* اول بنرهای تبلیغاتی */}
      <div className="-mx-4 sm:-mx-6 md:-mx-8">
        <PromotionalBanners />
      </div>

      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-6 md:px-8 py-4 min-[400px]:py-5 sm:py-6 md:py-8">
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
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00DDFF] text-white px-5 py-2.5 sm:px-6 sm:py-3 mb-2">
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

        {/* اسلایدر دسته‌بندی */}
        <div className="relative w-full max-w-[1260px] mx-auto">
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            className="relative w-full"
          >
            <CarouselContent className="-ms-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="ps-4 basis-1/3 min-[400px]:basis-1/4 sm:basis-1/5 md:basis-1/6 min-w-0"
                >
                  <Link
                    href={category.href}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 group hover:scale-105 transition-transform duration-200"
                  >
                    <div className="relative w-14 h-14 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain group-hover:opacity-80 transition-opacity"
                        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                        quality={75}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[9px] min-[400px]:text-[10px] sm:text-xs md:text-sm text-center text-gray-700 font-medium max-w-[90px] min-[400px]:max-w-[100px] sm:max-w-[120px] leading-tight">
                      {category.name}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 z-10 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
            <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 z-10 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
