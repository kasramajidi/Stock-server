"use client";

import React from "react";
import Link from "next/link";

const actions = [
  { name: "افزودن مقاله", href: "/admin/articles", icon: "➕" },
  { name: "افزودن محصول", href: "/admin/products", icon: "➕" },
  { name: "مدیریت کاربران", href: "/admin/users", icon: "👥" },
  { name: "تنظیمات", href: "/admin/settings", icon: "⚙️" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        دسترسی سریع
      </h3>
      <div className="space-y-0.5">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <span className="text-base">{action.icon}</span>
            <span>{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
