"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { useFloatingMenu } from "@/components/Layout/FloatingMenuContext";
import { useEffect, useState } from "react";

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

const HOVER_CLOSE_DELAY = 180;

export default function FloatingCategoryMenu() {
  const pathname = usePathname();
  const { isOpen, open, toggle, scheduleClose, cancelScheduledClose } =
    useFloatingMenu();

  const [isNearFooter, setIsNearFooter] = useState(false);

  const shouldHide =
    HIDDEN_PATHS.some((path) => pathname?.startsWith(path)) ?? false;
  if (shouldHide) return null;

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      setIsNearFooter(footerRect.top < window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hidden md:flex z-50 w-12 flex-col items-center transition-all duration-300
        ${
          isNearFooter
            ? "absolute bottom-[100px] right-1"
            : "fixed -right-3 top-[90px] md:-right-3 md:top-[90px] lg:-right-1 lg:top-[90px] xl:right-2 xl:top-[110px] 2xl:right-2 2xl:top-[100px]"
        }
            `}
    >
      <div
        className="relative"
        onMouseEnter={() => {
          cancelScheduledClose();
          open();
        }}
        onMouseLeave={() => scheduleClose(HOVER_CLOSE_DELAY)}
      >
        <button
          type="button"
          onClick={toggle}
          className="w-8 h-8 rounded-full bg-[#17e3fe] text-white flex items-center justify-center shadow-md hover:bg-[#14c8e0] hover:scale-105 transition shrink-0 cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        >
          <BiCategoryAlt className="text-[16px]" />
        </button>

        <div
          className={`absolute right-0 top-full mt-2 flex flex-col items-center gap-1.5 transition-opacity duration-200 overflow-y-auto scrollbar-hide max-h-[calc(100vh-260px)] ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              scroll={false}
              className="group relative w-9 h-9 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-[#17e2fe] hover:border-[#17e2fe] transition"
            >
              <Image
                src={item.image}
                alt={item.label}
                width={18}
                height={18}
                className="object-contain group-hover:brightness-0 group-hover:invert"
              />

              <span className="absolute right-full mr-2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
