"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import { useFloatingMenu } from "@/components/Layout/FloatingMenuContext";
import { useEffect, useRef, useState } from "react";

const HIDDEN_PATHS = ["/auth", "/contact", "/dashboard"];

interface MenuItem {
  href: string;
  image: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { href: "/shop", image: "/Images/Menu/laptop.svg", label: "لپ‌تاپ" },
  { href: "/shop", image: "/Images/Menu/mouse.svg", label: "ماوس" },
  { href: "/shop?search=پردازنده", image: "/Images/Menu/cpu.svg", label: "پردازنده" },
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [inlineTop, setInlineTop] = useState<number | undefined>(undefined);

  const shouldHide =
    HIDDEN_PATHS.some((path) => pathname?.startsWith(path)) ?? false;

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector("footer");
      const el = containerRef.current;
      if (!footer || !el) {
        setInlineTop(undefined);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const defaultTop = parseFloat(getComputedStyle(el).top) || 90;
      const height = el.offsetHeight;
      const gap = 16;
      const maxTop = footerTop - height - gap;

      if (footerTop < window.innerHeight && maxTop < defaultTop) {
        setInlineTop(Math.max(gap, maxTop));
      } else {
        setInlineTop(undefined);
      }
    };

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  if (shouldHide) return null;

  return (
    <div
      ref={containerRef}
      style={inlineTop !== undefined ? { top: inlineTop } : undefined}
      className="hidden md:flex fixed z-50 w-10 sm:w-11 lg:w-12 flex-col items-center transition-[top] duration-200
        -right-1 top-[72px]
        sm:-right-1.5 sm:top-[80px]
        md:-right-2 md:top-[88px]
        lg:right-0 lg:top-[90px]
        xl:right-1 xl:top-[100px]
        2xl:right-2 2xl:top-[100px]"
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
          className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-[#17e3fe] text-white flex items-center justify-center shadow-md hover:bg-[#14c8e0] hover:scale-105 transition shrink-0 cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        >
          <BiCategoryAlt className="text-sm sm:text-base lg:text-lg" />
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
              className="group relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-[#17e2fe] hover:border-[#17e2fe] transition"
            >
              <Image
                src={item.image}
                alt={item.label}
                width={20}
                height={20}
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 object-contain group-hover:brightness-0 group-hover:invert"
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
