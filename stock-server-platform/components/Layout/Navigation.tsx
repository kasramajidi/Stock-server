"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { BiCategoryAlt } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiCircleInfo } from "react-icons/ci";
import { ReactNode } from "react";
import { useFloatingMenu } from "./FloatingMenuContext";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export default function Navigation() {
  const pathname = usePathname();
  const { toggle: toggleFloatingMenu } = useFloatingMenu();

  const navItems: NavItem[] = [
    { label: "صفحه اصلی", href: "/", icon: <GoHome /> },
    { label: "فروشگاه", href: "/shop", icon: <GiShoppingCart /> },
    { label: "وبلاگ", href: "/blog", icon: <AiOutlineFileText /> },
    { label: "تماس با ما", href: "/contact", icon: <HiOutlineUsers /> },
    { label: "درباره ما", href: "/about", icon: <CiCircleInfo /> },
  ];

  return (
    <div className="bg-white border-b rounded-2xl sm:rounded-3xl border-gray-200 z-10 relative mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-[80px] lg:mx-[80px] navigation-1080 xl:mx-[80px] navigation-4k -mt-2">
      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 md:gap-3 w-full sm:w-auto">
            {/* دکمه دسته‌بندی — فقط با کلیک منوی فیکس سمت راست باز می‌شود */}
            <button
              type="button"
              onClick={toggleFloatingMenu}
              className="flex items-center font-semibold hover:bg-[#14c8e0] transition-colors cursor-pointer gap-1 sm:gap-1.5 md:gap-2 bg-[#17e2fe] text-white rounded-2xl sm:rounded-3xl px-3 min-[400px]:px-2.5 sm:px-2.5 md:px-2.5 lg:px-3 py-2.5 sm:py-1.5 md:py-2 lg:py-3 shrink-0 min-h-[44px] sm:min-h-0"
              aria-label="باز کردن منوی دسته‌بندی"
            >
              <BiCategoryAlt className="text-sm sm:text-sm md:text-base lg:text-lg shrink-0" />
              <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap hidden sm:inline">
                دسته بندی محصولات
              </span>
            </button>

            <div className="flex items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 overflow-x-auto scrollbar-hide flex-1 sm:flex-initial">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 px-2 sm:px-1 md:px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2 sm:py-1 md:py-1.5 lg:py-2 transition-colors font-medium text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base whitespace-nowrap min-h-[44px] sm:min-h-0 ${
                        isActive
                          ? "text-[#17e2fe]"
                          : "text-[#585858] hover:text-[#17e2fe]"
                      }`}
                    >
                      <span className="text-sm sm:text-sm md:text-base lg:text-lg shrink-0">
                        {item.icon}
                      </span>
                      <span className="hidden lg:inline">{item.label}</span>
                      <span className="lg:hidden hidden sm:inline text-[10px] md:text-xs">
                        {item.label.split(" ")[0]}
                      </span>
                    </Link>
                    {index < navItems.length - 1 && (
                      <span className="text-[#eeeeee] hidden sm:inline text-[8px] sm:text-[10px] md:text-xs">
                        |
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <Link
            href="/harajestoon"
            className="hidden sm:inline-block bg-[#f6cfd4] hover:bg-[#f1b8bf] text-[#d00219] font-bold px-2.5 md:px-3 lg:px-4 xl:px-5 py-2 md:py-2.5 rounded-3xl transition-colors text-xs md:text-sm lg:text-base text-center whitespace-nowrap shrink-0"
          >
            حراجستون
          </Link>
        </div>
      </div>
    </div>
  );
}
