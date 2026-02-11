"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/lib/cookie";
import {
  Package,
  Download,
  MapPin,
  LogOut,
  Heart,
  User,
  ChevronLeft,
} from "lucide-react";

const items = [
  { icon: <Package size={16} strokeWidth={1.8} />, label: "سفارش‌ها", section: "orders" },
  { icon: <Download size={16} strokeWidth={1.8} />, label: "دانلودها", section: "downloads" },
  { icon: <MapPin size={16} strokeWidth={1.8} />, label: "آدرس‌ها", section: "addresses" },
  { icon: <User size={16} strokeWidth={1.8} />, label: "جزئیات حساب", section: "accountDetails" },
  { icon: <Heart size={16} strokeWidth={1.8} />, label: "علاقه‌مندی‌ها", section: "favorites" },
];

export default function DashboardCards() {
  const router = useRouter();

  const handleClick = (section: string) => {
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
      router.push("/dashboard/favorites", { scroll: false });
    } else {
      router.push(`/dashboard/${section}`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          دسترسی سریع
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {items.map((item) => (
            <button
              key={item.section}
              type="button"
              onClick={() => handleClick(item.section)}
              className="flex items-center gap-2 text-[13px] font-medium text-foreground transition-colors hover:text-[var(--primary-hover)]"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleClick("logout")}
            className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-red-600"
          >
            <LogOut size={16} strokeWidth={1.8} />
            خروج
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          لینک‌ها
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-[var(--primary-hover)]"
          >
            <ChevronLeft size={14} className="rotate-180" />
            فروشگاه
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-[var(--primary-hover)]"
          >
            <ChevronLeft size={14} className="rotate-180" />
            تماس با ما
          </Link>
        </div>
      </section>
    </div>
  );
}
