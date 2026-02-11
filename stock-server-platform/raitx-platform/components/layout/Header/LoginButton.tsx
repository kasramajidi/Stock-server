"use client";

import Link from "next/link";
import { HiOutlineLogin, HiUserCircle } from "react-icons/hi";

interface LoginButtonProps {
  isAuthenticated?: boolean;
}

export default function LoginButton({ isAuthenticated = false }: LoginButtonProps) {
  if (isAuthenticated) {
    return (
      <Link
        href="/my-account"
        className="inline-flex items-center justify-center w-9 h-9 min-[500px]:w-10 min-[500px]:h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-[#ff5538] transition-colors"
        aria-label="پروفایل کاربری"
      >
        <HiUserCircle className="text-xl min-[500px]:text-2xl" />
      </Link>
    );
  }

  return (
    <Link
      href="/auth"
      className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#ff5538] hover:bg-[#e6442e] active:bg-[#cc3a26] text-white px-2.5 min-[500px]:px-3 sm:px-4 md:px-4 lg:px-4 py-1.5 min-[500px]:py-2 sm:py-2.5 rounded-lg font-medium text-xs min-[500px]:text-xs sm:text-sm lg:text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
      aria-label="ورود / ثبت نام"
    >
      <HiOutlineLogin className="text-sm min-[500px]:text-base sm:text-lg shrink-0" />
      <span className="whitespace-nowrap hidden min-[500px]:inline">ورود / ثبت نام</span>
    </Link>
  );
}

