"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "داشبورد", href: "/admin", icon: "📊" },
  { name: "مقالات", href: "/admin/articles", icon: "📝" },
  { name: "محصولات", href: "/admin/products", icon: "🛍️" },
  { name: "سفارشات", href: "/admin/orders", icon: "📦" },
  { name: "کاربران", href: "/admin/users", icon: "👥" },
  { name: "انتقادات و پیشنهادات", href: "/admin/comments", icon: "💬" },
  { name: "کامنت فروشگاه", href: "/admin/shop-comments", icon: "🛒" },
  { name: "کامنت مقاله‌ها", href: "/admin/article-comments", icon: "📄" },
  { name: "پشتیبانی", href: "/admin/support", icon: "💬" },
  { name: "تنظیمات", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-56 lg:w-60 bg-white border-l border-gray-200/80 min-h-screen sticky top-0 shrink-0 flex flex-col">
      <nav className="p-3 space-y-0.5 flex-1" aria-label="منوی ادمین">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#ff5538] text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-200/80 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          بازگشت به سایت
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          {loggingOut ? "در حال خروج…" : "خروج"}
        </button>
      </div>
    </aside>
  );
}
