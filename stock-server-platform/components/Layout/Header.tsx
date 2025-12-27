"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { MdOutlineShoppingBag } from "react-icons/md";

interface HeaderProps {
  cartCount?: number;
  currency?: string;
  balance?: number;
  isAuthenticated?: boolean;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("fa-IR").format(num);
};

export default function Header({
  cartCount = 0,
  currency = "تومان",
  balance,
  isAuthenticated = false,
}: HeaderProps = {}) {
  return (
    <div className="bg-[#fcfbfd] shadow-md rounded-3xl z-50 mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k border border-gray-200 relative -mt-[5px]">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between w-full lg:w-auto lg:order-3">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="relative w-20 h-[28px] sm:w-24 sm:h-[34px] md:w-28 md:h-[40px]">
                <Image
                  src="/Images/Logo/logo stock copy 2.png"
                  alt="استوک سرور - Stock Server"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {!isAuthenticated ? (
                <Link
                  href="/auth"
                  className="text-gray-700 hover:text-[#17e2fe] transition-colors font-medium text-xs sm:text-sm md:text-base"
                >
                  <span className="hidden sm:inline">ورود / ثبت نام</span>
                  <span className="sm:hidden">ورود</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/cart"
                    className="relative text-gray-700 hover:text-[#17e2fe] transition-colors"
                    aria-label="سبد خرید"
                  >
                    <MdOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#17e2fe] text-white text-[8px] sm:text-[10px] rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-medium">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>
                  {balance !== undefined && (
                    <div className="hidden sm:flex items-center gap-1.5">
                      <span className="text-gray-700 font-medium text-sm md:text-base">
                        {formatNumber(balance)} {currency}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 lg:order-1 w-full lg:flex-1">
            <Link
              href="/"
              className="relative w-[140px] h-[51px] lg:w-[160px] lg:h-[58px] xl:w-[173px] xl:h-[63px] 2xl:w-[200px] 2xl:h-[73px] shrink-0"
            >
              <Image
                src="/Images/Logo/logo stock copy 2.png"
                alt="استوک سرور - Stock Server"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="flex-1 flex justify-center lg:px-6 xl:px-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
