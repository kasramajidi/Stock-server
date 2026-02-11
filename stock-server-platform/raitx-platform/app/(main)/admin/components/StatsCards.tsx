"use client";

import React, { useState, useEffect } from "react";
import { getDashboardStats, type DashboardStats } from "../lib/dashboard-api";

const formatNum = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

const STAT_CONFIG: Record<
  keyof Pick<DashboardStats, "articles" | "products" | "comments" | "orders">,
  { title: string; icon: string; color: string }
> = {
  articles: {
    title: "مقالات",
    icon: "📝",
    color: "bg-amber-50 text-amber-600",
  },
  products: {
    title: "محصولات",
    icon: "🛍️",
    color: "bg-emerald-50 text-emerald-600",
  },
  comments: {
    title: "انتقادات و پیشنهادات",
    icon: "💬",
    color: "bg-violet-50 text-violet-600",
  },
  orders: {
    title: "سفارشات",
    icon: "📦",
    color: "bg-brand-muted text-brand",
  },
};

export default function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats({ articles: 0, products: 0, comments: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm animate-pulse"
          >
            <div className="h-10 w-10 rounded-lg bg-gray-200 mb-3" />
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const entries = (Object.keys(STAT_CONFIG) as (keyof typeof STAT_CONFIG)[])
    .filter((key) => {
      const value = key === "orders" ? stats?.orders : stats?.[key];
      return typeof value === "number" && value > 0;
    })
    .map((key) => ({
      key,
      ...STAT_CONFIG[key],
      value: key === "orders" ? stats!.orders! : stats![key],
    }));

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 p-6 text-center text-gray-500 text-sm">
        آماری از API دریافت نشد.
      </div>
    );
  }

  const displayEntries = entries.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {displayEntries.map(({ key, title, icon, color, value }) => (
        <div
          key={key}
          className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm hover:shadow transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${color}`}
            >
              {icon}
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-0.5">{title}</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            {formatNum(value)}
          </p>
        </div>
      ))}
    </div>
  );
}
