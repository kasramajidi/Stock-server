// مسیر: components/Layout/FloatingCategoryMenu.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { useFloatingMenu } from "@/components/Layout/FloatingMenuContext";

const HIDDEN_PATHS = ["/auth", "/contact", "/dashboard"];

interface MenuItem {
  href: string;
  image: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { href: "/shop", image: "/Images/Menu/laptop.svg", label: "لپ‌تاپ" },
  { href: "/shop", image: "/Images/Menu/mouse.svg", label: "ماوس" },
  { href: "/category/cpu", image: "/Images/Menu/cpu.svg", label: "پردازنده" },
  { href: "/shop", image: "/Images/Menu/smartphone.svg", label: "موبایل" },
  { href: "/shop", image: "/Images/Menu/gamepad.svg", label: "گیم پد" },
  { href: "/shop", image: "/Images/Menu/camera.svg", label: "دوربین" },
  { href: "/shop", image: "/Images/Menu/camera-box.svg", label: "دوربین دیجیتال" },
];

export default function FloatingCategoryMenu() {
  const pathname = usePathname();
  const { isOpen, toggle } = useFloatingMenu();

  const shouldHide =
    HIDDEN_PATHS.some((path) => pathname?.startsWith(path)) ?? false;
  if (shouldHide) return null;

  return (
    <div className="hidden md:flex fixed -right-1 top-[50px] z-50 w-14 flex-col items-center">
      <div className="relative">
        <button
          onClick={toggle}
          className="w-12 h-12 rounded-xl bg-[#17e2fe] text-white flex items-center justify-center shadow-lg hover:bg-[#14c8e0] transition shrink-0"
          aria-expanded={isOpen}
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        >
          <BiCategoryAlt className="text-xl" />
        </button>

        <div
          className={`absolute right-0 top-full mt-2 flex flex-col items-center gap-2 transition-opacity duration-200 overflow-y-auto scrollbar-hide max-h-[calc(100vh-280px)] min-w-11 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            scroll={false}
            className="group relative w-11 h-11 shrink-0 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-[#17e2fe] hover:border-[#17e2fe] transition"
          >
            <Image
              src={item.image}
              alt={item.label}
              width={22}
              height={22}
              className="object-contain text-gray-600 group-hover:brightness-0 group-hover:invert"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="absolute right-full mr-2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
              {item.label}
            </span>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
