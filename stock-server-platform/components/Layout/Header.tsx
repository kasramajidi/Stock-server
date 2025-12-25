"use client";

import Link from "next/link";
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
    <div className="bg-[#fcfbfd] shadow-2xl rounded-3xl z-50 mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k border border-gray-200 relative -mt-[5px] mb-2">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between w-full lg:w-auto lg:order-3">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  S
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 font-bold text-base sm:text-lg">
                  استوک سرور
                </span>
                <span className="text-blue-600 text-xs">STOCK SERVER</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {!isAuthenticated ? (
                <Link
                  href="/auth"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-xs sm:text-sm md:text-base"
                >
                  <span className="hidden sm:inline">ورود / ثبت نام</span>
                  <span className="sm:hidden">ورود</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/cart"
                    className="relative text-gray-700 hover:text-purple-600 transition-colors"
                    aria-label="سبد خرید"
                  >
                    <MdOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[8px] sm:text-[10px] rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center font-medium">
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
            <div className="relative w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-blue-600 font-bold text-lg">
                استوک سرور
              </span>
              <span className="text-blue-600 text-xs">STOCK SERVER</span>
            </div>
            <div className="flex-1 flex justify-center lg:px-6 xl:px-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
