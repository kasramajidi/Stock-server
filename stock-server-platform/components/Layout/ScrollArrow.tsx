"use client";

import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";

const FOOTER_ID = "site-footer";
const TOP_ID = "site-top";

type Direction = "down" | "up";

interface ScrollArrowProps {
  direction: Direction;
  /** برای دسترسی‌پذیری و عنوان دکمه */
  label?: string;
  className?: string;
}

export default function ScrollArrow({
  direction,
  label,
  className = "",
}: ScrollArrowProps) {
  const isDown = direction === "down";
  const defaultLabel = isDown ? "رفتن به پایین صفحه" : "رفتن به بالای صفحه";
  const ariaLabel = label ?? defaultLabel;

  const scroll = () => {
    if (isDown) {
      const el = document.getElementById(FOOTER_ID);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const el = document.getElementById(TOP_ID);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pillRound = isDown ? "rounded-b-full" : "rounded-t-full";
  const pillPosition = isDown ? "-top-2" : "-bottom-2";
  const iconTranslate = isDown ? "-translate-y-[3px]" : "translate-y-[8px]";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={scroll}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          scroll();
        }
      }}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`flex justify-center items-center cursor-pointer min-h-[44px] py-4 select-none ${className}`}
    >
      <span className="relative w-10 sm:w-16 h-5 sm:h-9 flex items-center justify-center">
        <span
          className={`absolute left-1/2 -translate-x-1/2 w-full h-full bg-gray-100 ${pillRound} ${pillPosition} pointer-events-none`}
        />
        <span
          className={`relative z-10 flex items-center justify-center text-gray-400 pointer-events-none ${iconTranslate}`}
        >
          {isDown ? (
            <RxDoubleArrowDown className="text-xs sm:text-sm shrink-0" />
          ) : (
            <RxDoubleArrowUp className="text-xs sm:text-sm shrink-0" />
          )}
        </span>
      </span>
    </div>
  );
}
