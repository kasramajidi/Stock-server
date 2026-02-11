"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/app/(main)/auth/lib/cookie";
import {
  Package,
  Download,
  MapPin,
  LogOut,
  Heart,
  User,
  CreditCard,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

const cards = [
  {
    icon: <Package size={22} strokeWidth={2} />,
    label: "سفارش‌ها",
    section: "orders",
    desc: "پیگیری سفارشات",
  },
  {
    icon: <Download size={22} strokeWidth={2} />,
    label: "دانلودها",
    section: "downloads",
    desc: "محصولات دانلودی",
  },
  {
    icon: <MapPin size={22} strokeWidth={2} />,
    label: "آدرس‌ها",
    section: "addresses",
    desc: "آدرس تحویل و صورتحساب",
  },
  {
    icon: <User size={22} strokeWidth={2} />,
    label: "جزئیات حساب",
    section: "accountDetails",
    desc: "نام، ایمیل و رمز عبور",
  },
  {
    icon: <Heart size={22} strokeWidth={2} />,
    label: "علاقه‌مندی‌ها",
    section: "favorites",
    desc: "لیست علاقه‌مندی",
  },
  {
    icon: <LogOut size={22} strokeWidth={2} />,
    label: "خروج",
    section: "logout",
    desc: "خروج از حساب",
  },
];

export default function DashboardCards() {
  const router = useRouter();

  const handleCardClick = (section: string) => {
    if (section === "logout") {
      if (typeof window !== "undefined") {
        deleteAuthCookie();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("loginPhone");
        localStorage.removeItem("loginval");
        window.dispatchEvent(new CustomEvent("userLogout"));
        router.push("/auth", { scroll: false });
      }
    } else if (section === "favorites") {
      router.push("/my-account/favorites", { scroll: false });
    } else {
      router.push(`/my-account/${section}`, { scroll: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {cards.map((card) => {
          const isLogout = card.section === "logout";
          return (
            <button
              key={card.section}
              type="button"
              onClick={() => handleCardClick(card.section)}
              className={`group flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5 ${
                isLogout
                  ? "border-gray-200/80 bg-white hover:border-red-200 hover:bg-red-50/50 hover:shadow-md hover:shadow-red-100/50"
                  : "border-gray-200/80 bg-white hover:border-[#ff5538]/40 hover:shadow-md hover:shadow-[#ff5538]/5"
              }`}
            >
              <div
                className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                  isLogout
                    ? "bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600 group-hover:ring-2 group-hover:ring-red-100"
                    : "bg-gray-100 text-gray-500 group-hover:bg-[#ff5538]/10 group-hover:text-[#ff5538] group-hover:ring-2 group-hover:ring-[#ff5538]/10"
                }`}
              >
                {card.icon}
              </div>
              <span
                className={`text-sm font-semibold ${
                  isLogout
                    ? "text-gray-600 group-hover:text-red-600"
                    : "text-gray-700 group-hover:text-[#ff5538]"
                }`}
              >
                {card.label}
              </span>
              <span className="mt-0.5 block text-xs text-gray-400">
                {card.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* لینک‌های مفید */}
      <div className="rounded-xl border border-gray-200/80 bg-gradient-to-br from-gray-50/80 to-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          دسترسی سریع به خدمات
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/currency-payment"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff5538]/30 hover:text-[#ff5538] hover:shadow-md hover:shadow-[#ff5538]/5"
          >
            <CreditCard size={16} strokeWidth={2} />
            پرداخت ارزی
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff5538]/30 hover:text-[#ff5538] hover:shadow-md hover:shadow-[#ff5538]/5"
          >
            <ShoppingBag size={16} strokeWidth={2} />
            فروشگاه
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff5538]/30 hover:text-[#ff5538] hover:shadow-md hover:shadow-[#ff5538]/5"
          >
            <MessageCircle size={16} strokeWidth={2} />
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  );
}
