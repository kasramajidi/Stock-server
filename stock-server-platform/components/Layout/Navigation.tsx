"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

// ایمپورت آیکون‌ها
import { BiCategoryAlt } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiCircleInfo } from "react-icons/ci";
import { ReactNode } from "react"; // ایمپورت نوع ReactNode برای آیکون‌ها

// تعریف Interface برای آیتم‌های ناوبری
interface NavItem {
  label: string;
  href: string;
  icon: ReactNode; // آیکون می‌تواند هر المان React باشد
}

export default function Navigation() {
  const pathname = usePathname();
  // تعریف نوع برای useState: boolean
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  // تعریف نوع برای useRef: ارجاع به یک المان HTMLDivElement
  const dropdownRef = useRef<HTMLDivElement>(null);

  // تعریف نوع برای navItems: آرایه‌ای از NavItem
  const navItems: NavItem[] = [
    { label: "صفحه اصلی", href: "/", icon: <GoHome /> },
    { label: "فروشگاه", href: "/shop", icon: <GiShoppingCart /> },
    { label: "وبلاگ", href: "/blog", icon: <AiOutlineFileText /> },
    { label: "تماس با ما", href: "/contact", icon: <HiOutlineUsers /> },
    { label: "درباره ما", href: "/about", icon: <CiCircleInfo /> },
  ];

  // لیست دسته‌بندی‌های تستی برای زیرمنو - تعریف نوع: string[]
  const categories: string[] = [
    "دسته بندی تست ۱",
    "دسته بندی تست ۲",
    "دسته بندی تست ۳",
    "دسته بندی تست ۴",
    "دسته بندی تست ۵ طولانی تر",
  ];

  // Effect برای مدیریت کلیک‌های خارج از زیرمنو
  useEffect(() => {
    // تعریف صریح نوع برای event
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        event.target instanceof Node && // اطمینان از اینکه event.target یک Node است
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    }

    // متصل کردن event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // حذف event listener هنگام پاکسازی کامپوننت
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // **تغییر z-index از z-0 به z-10 برای اطمینان از بالاتر بودن نوار ناوبری**
    <div className="bg-white border-b rounded-3xl border-gray-200 z-10 relative mx-[60px] md:mx-[80px] lg:mx-[80px] navigation-1080 xl:mx-[80px] navigation-4k -mt-2">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 md:gap-3 w-full sm:w-auto">
            {/* کانتینر دکمه دسته‌بندی و زیرمنو - با position relative */}
            {/* ref={dropdownRef} به یک HTMLDivElement ارجاع می‌دهد */}
            <div className="relative" ref={dropdownRef}> 
              <div
                className="flex items-center font-semibold hover:bg-[#14c8e0] transition-colors cursor-pointer gap-1 sm:gap-1.5 md:gap-2 bg-[#17e2fe] text-white rounded-3xl px-2 sm:px-2.5 md:px-2.5 lg:px-3 py-2 sm:py-1.5 md:py-2 lg:py-3 shrink-0"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} 
              >
                <BiCategoryAlt className="text-sm sm:text-sm md:text-base lg:text-lg shrink-0" />
                <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap hidden sm:inline">
                  دسته بندی محصولات
                </span>
              </div>

              {/* زیرمنوی دسته‌بندی - z-20 برای بالاتر بودن از z-10 نوار ناوبری */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-max min-w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <ul className="py-1">
                    {categories.map((category, index) => (
                      <li key={index}>
                        {/* تبدیل نام دسته به یک slug برای URL تمیزتر */}
                        <Link 
                          href={`/categories/${category.replace(/\s/g, '-')}`} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                          onClick={() => setIsCategoryDropdownOpen(false)} // بستن زیرمنو بعد از کلیک روی لینک
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 overflow-x-auto scrollbar-hide flex-1 sm:flex-initial">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 px-1 sm:px-1 md:px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-1 sm:py-1 md:py-1.5 lg:py-2 transition-colors font-medium text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base whitespace-nowrap ${
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
