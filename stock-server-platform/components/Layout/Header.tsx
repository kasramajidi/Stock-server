"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import {
  MdOutlineShoppingBag,
  MdOutlineFavoriteBorder,
  MdPersonOutline,
} from "react-icons/md";
import { clearAuth, getAuthCookie } from "@/lib/cookie";

interface HeaderProps {
  cartCount?: number;
  cartTotal?: number;
  currency?: string;
  balance?: number;
  isAuthenticated?: boolean;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("fa-IR").format(num);
};

export default function Header({
  cartCount = 0,
  cartTotal = 0,
  currency = "تومان",
  balance,
  isAuthenticated: isAuthenticatedProp,
}: HeaderProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedProp ?? false
  );

  useEffect(() => {
    if (isAuthenticatedProp !== undefined) {
      setIsAuthenticated(isAuthenticatedProp);
      return;
    }
    const check = () => {
      const hasToken = !!getAuthCookie();
      try {
        const user =
          typeof window !== "undefined" && localStorage.getItem("user");
        setIsAuthenticated(hasToken || !!user);
      } catch {
        setIsAuthenticated(hasToken);
      }
    };
    check();
  }, [isAuthenticatedProp, pathname]);

  const handleLogout = () => {
    clearAuth();
    router.push("/auth", { scroll: false });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl sm:rounded-3xl z-50 mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 2xl:mx-14 min-[1700px]:mx-16 min-[1920px]:mx-20 header-4k border border-gray-200 relative -mt-[5px]">
      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 min-[1700px]:px-14 min-[1920px]:px-16 py-3 sm:py-4 md:py-5 xl:py-5 2xl:py-6 min-[1700px]:py-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 xl:gap-5 2xl:gap-6">
          <div className="flex items-center justify-between w-full lg:w-auto lg:order-3">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="relative w-20 h-[28px] sm:w-24 sm:h-[34px] md:w-28 md:h-[40px]">
                <Image
                  src="/Images/Logo/logo stock copy 2.png"
                  alt="استوک سرور - Stock Server"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                />
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 2xl:gap-6 min-[1700px]:gap-7">
              <Link
                href="/favorites"
                className="text-gray-700 hover:text-[#17e2fe] transition-colors p-1"
                aria-label="علاقه‌مندی‌ها"
              >
                <MdOutlineFavoriteBorder className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
              </Link>

              {!isAuthenticated ? (
                <Link
                  href="/auth"
                  className="text-gray-700 hover:text-[#17e2fe] transition-colors font-medium text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-[19px]"
                >
                  <span className="hidden sm:inline">ورود / ثبت نام</span>
                  <span className="sm:hidden">ورود</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-[#17e2fe] transition-colors p-1"
                    aria-label="حساب کاربری"
                  >
                    <MdPersonOutline className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
                  </Link>

                  {balance !== undefined && (
                    <div className="hidden sm:flex items-center gap-1.5 xl:gap-2">
                      <span className="text-gray-700 font-medium text-sm md:text-base xl:text-lg 2xl:text-[19px] whitespace-nowrap">
                        {formatNumber(balance)} {currency}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-[#17e2fe] transition-colors font-medium text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-[19px]"
                  >
                    خروج
                  </button>
                </>
              )}

              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 xl:gap-2 2xl:gap-2.5 text-gray-700 hover:text-[#17e2fe] transition-colors"
                aria-label="سبد خرید"
              >
                <MdOutlineShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap xl:text-base 2xl:text-lg">
                  {formatNumber(cartTotal)} {currency}
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#17e2fe] text-white text-[8px] sm:text-[10px] xl:text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5 2xl:gap-6 lg:order-1 w-full lg:flex-1 min-w-0">
            <Link
              href="/"
              className="relative w-[140px] h-[51px] lg:w-[160px] lg:h-[58px] xl:w-[173px] xl:h-[63px] 2xl:w-[205px] 2xl:h-[75px] min-[1700px]:w-[230px] min-[1700px]:h-[84px] shrink-0"
            >
              <Image
                src="/Images/Logo/logo stock copy 2.png"
                alt="استوک سرور - Stock Server"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 140px, (max-width: 1280px) 160px, (max-width: 1536px) 173px, (max-width: 1700px) 205px, 230px"
              />
            </Link>

            <div className="flex-1 flex justify-center lg:px-6 xl:px-8 2xl:px-10 min-[1700px]:px-12 min-w-0">
              <div className="w-full max-w-2xl xl:max-w-3xl 2xl:max-w-[56rem] min-[1700px]:max-w-[62rem]">
                <Suspense
                  fallback={
                    <div className="h-10 xl:h-11 2xl:h-12 w-full rounded-3xl bg-gray-100 animate-pulse" />
                  }
                >
                  <SearchBar />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
