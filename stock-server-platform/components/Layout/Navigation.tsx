"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";

import { BiCategoryAlt } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiCircleInfo } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { useFloatingMenu } from "./FloatingMenuContext";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface MobileCategoryItem {
  label: string;
  href: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const { toggle: toggleFloatingMenu } = useFloatingMenu();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "صفحه اصلی", href: "/", icon: <GoHome /> },
    { label: "فروشگاه", href: "/shop", icon: <GiShoppingCart /> },
    { label: "وبلاگ", href: "/blog", icon: <AiOutlineFileText /> },
    { label: "تماس با ما", href: "/contact", icon: <HiOutlineUsers /> },
    { label: "درباره ما", href: "/about", icon: <CiCircleInfo /> },
  ];

  const mobileCategoryItems: MobileCategoryItem[] = [
    { label: "لپ‌تاپ", href: "/shop" },
    { label: "ماوس", href: "/shop" },
    { label: "پردازنده", href: "/category/cpu" },
    { label: "موبایل", href: "/shop" },
    { label: "گیم پد", href: "/shop" },
    { label: "دوربین", href: "/shop" },
    { label: "دوربین دیجیتال", href: "/shop" },
  ];

  const handleCategoryClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen(true);
    } else {
      toggleFloatingMenu();
    }
  };

  return (
    <>
      <div className="bg-white border-b rounded-2xl sm:rounded-3xl border-gray-200 z-10 relative mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 navigation-1080 xl:mx-12 2xl:mx-14 min-[1700px]:mx-16 min-[1920px]:mx-20 navigation-4k -mt-2">
        <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 min-[1700px]:px-14 min-[1920px]:px-16 py-2.5 sm:py-3 md:py-3.5 xl:py-4 2xl:py-4.5 min-[1700px]:py-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 xl:gap-5 2xl:gap-6 min-w-0">
            <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 md:gap-3 xl:gap-4 2xl:gap-5 w-full sm:w-auto min-w-0">

              {/* دکمه دسته بندی */}
              <button
                type="button"
                onClick={handleCategoryClick}
                className="flex items-center font-semibold hover:bg-[#14c8e0] transition-colors cursor-pointer gap-1 sm:gap-1.5 md:gap-2 xl:gap-2.5 2xl:gap-3 bg-[#17e2fe] text-white rounded-2xl sm:rounded-3xl px-3 min-[400px]:px-2.5 sm:px-2.5 md:px-2.5 lg:px-3 xl:px-4 2xl:px-5 min-[1700px]:px-6 py-2.5 sm:py-1.5 md:py-2 lg:py-3 xl:py-3.5 2xl:py-4 shrink-0 min-h-[44px] sm:min-h-0"
              >
                <BiCategoryAlt className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px] shrink-0" />

                <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-[17px] whitespace-nowrap hidden sm:inline">
                  دسته بندی محصولات
                </span>
              </button>

              {/* منو */}
              <div className="flex items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 2xl:gap-3 overflow-x-auto scrollbar-hide flex-1 sm:flex-initial min-w-0">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <div key={item.href} className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 px-2 sm:px-1 md:px-1.5 lg:px-2 xl:px-3 2xl:px-4 min-[1700px]:px-5 py-2 sm:py-1 md:py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 transition-colors font-medium text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-[17px] whitespace-nowrap min-h-[44px] sm:min-h-0 ${
                          isActive
                            ? "text-[#17e2fe]"
                            : "text-[#585858] hover:text-[#17e2fe]"
                        }`}
                      >
                        <span className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px] shrink-0">
                          {item.icon}
                        </span>

                        {/* نسخه نهایی — فقط یک span */}
                        <span className="hidden sm:inline whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>

                      {index < navItems.length - 1 && (
                        <span className="text-[#eeeeee] hidden sm:inline text-[8px] sm:text-[10px] md:text-xs xl:text-sm 2xl:text-base">
                          |
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* حراجستون */}
            <Link
              href="/#special-offers"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("special-offers")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className="hidden sm:inline-block bg-[#f6cfd4] hover:bg-[#f1b8bf] text-[#d00219] font-bold px-2.5 md:px-3 lg:px-4 xl:px-5 2xl:px-6 min-[1700px]:px-7 py-2 md:py-2.5 xl:py-3 2xl:py-3.5 rounded-3xl transition-colors text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-[19px] text-center whitespace-nowrap shrink-0"
            >
              حراجستون
            </Link>
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <h2 className="font-bold text-sm text-gray-800">
              دسته بندی محصولات
            </h2>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-black transition"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-col p-3 gap-2">
            {mobileCategoryItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-[#17e2fe] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
