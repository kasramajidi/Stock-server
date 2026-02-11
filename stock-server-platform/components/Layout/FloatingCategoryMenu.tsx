// مسیر: components/Layout/FloatingCategoryMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
// آیکون اصلی: آیکون مربع دسته‌بندی
import { BiCategoryAlt } from "react-icons/bi";
// آیکون‌های آیتم‌های زیرمنو
import { GiShoppingCart } from "react-icons/gi";
import type { ReactNode } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiCircleInfo } from "react-icons/ci";

interface MenuItem {
    href: string;
    icon: ReactNode;
    label: string;
  }
  

export default function FloatingCategoryMenu() {
  // مدیریت وضعیت باز یا بسته بودن منو
  const [open, setOpen] = useState<boolean>(false);

  // آیتم‌های منوی شناور
  const items: MenuItem[] = [
    { href: "/shop", icon: <GiShoppingCart />, label: "فروشگاه" },
    { href: "/blog", icon: <AiOutlineFileText />, label: "وبلاگ" },
    { href: "/about", icon: <CiCircleInfo />, label: "درباره ما" },
    { href: "/contact", icon: <HiOutlineUsers />, label: "تماس با ما" },
  ];

  return (
    // کانتینر اصلی: موقعیت ثابت (fixed) در راست (right-4) و وسط عمودی (top-1/2 -translate-y-1/2)
    // z-50 برای اطمینان از قرارگیری روی همه عناصر (مثل z-index بالا)
    <div className="md:block hidden fixed right-0 top-[20%] -translate-y-1/2 z-50">
      <div className="flex flex-col items-center gap-2">
        
        {/* دکمه اصلی (آیکون مربع دسته‌بندی) - همیشه نمایش داده می‌شود */}
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-xl bg-[#17e2fe] text-white flex items-center justify-center shadow-lg hover:bg-[#14c8e0] transition"
        >
          <BiCategoryAlt className="text-xl" />
        </button>

        {/* کانتینر آیتم‌های منو - با انیمیشن باز و بسته شدن */}
        <div
          className={`flex flex-col gap-2 transition-all duration-300 ${
            // اگر open بود: کاملاً نمایش داده شود.
            open ? "opacity-100 translate-y-0" : 
            // اگر open نبود: شفاف، کمی جابجا شده و غیرقابل کلیک (pointer-events-none) باشد.
            "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // styling گروهی برای Tooltip
              className="group relative w-11 h-11 rounded-xl bg-white border shadow-md flex items-center justify-center hover:bg-[#17e2fe] transition"
            >
              <span className="text-gray-700 group-hover:text-white text-lg">
                {item.icon}
              </span>

              {/* Tooltip (راهنمای متنی) که فقط هنگام نگه داشتن ماوس ظاهر می‌شود */}
              <span className="absolute right-full mr-2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
