"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, ShoppingCart, MessageSquare, FileText, Package, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { adminFetch } from "@/lib/admin-api";

interface Counts {
  users: number;
  cartRequests: number;
  contact: number;
  comments: number;
  productComments: number;
}

interface ChartPoint {
  label: string;
  value?: number;
  count?: number;
}

interface DashboardStats {
  cartItems: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
    monthlyGrowthPercent: number;
    yearlyGrowthPercent: number;
  };
  users: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
    monthlyGrowthPercent: number;
    yearlyGrowthPercent: number;
  };
  chartData?: {
    cartItemsByMonth: { label: string; value: number }[];
    usersByMonth: { label: string; count: number }[];
  };
}

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetch<{ users?: unknown[] }>("/api/users"),
      adminFetch<{ cartRequests?: unknown[] }>("/api/cart-requests"),
      adminFetch<{ inquiries?: unknown[] }>("/api/contact"),
      adminFetch<{ comments?: unknown[] }>("/api/comments"),
      adminFetch<{ comments?: unknown[] }>("/api/product-comments"),
      adminFetch<{
          cartItems: DashboardStats["cartItems"];
          users: DashboardStats["users"];
          chartData?: DashboardStats["chartData"];
        }>("/api/admin/stats"),
    ])
      .then(([u, c, co, cm, pc, st]) => {
        setCounts({
          users: u.data?.users?.length ?? 0,
          cartRequests: c.data?.cartRequests?.length ?? 0,
          contact: co.data?.inquiries?.length ?? 0,
          comments: cm.data?.comments?.length ?? 0,
          productComments: pc.data?.comments?.length ?? 0,
        });
        if (st.data)
          setStats({
            cartItems: st.data.cartItems,
            users: st.data.users,
            chartData: st.data.chartData,
          });
      })
      .catch(() => setCounts({ users: 0, cartRequests: 0, contact: 0, comments: 0, productComments: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "کاربران",
      value: counts?.users ?? "—",
      href: "/admin/users",
      icon: Users,
      color: "cyan",
      delay: 0,
    },
    {
      title: "درخواست‌های سبد",
      value: counts?.cartRequests ?? "—",
      href: "/admin/cart-requests",
      icon: ShoppingCart,
      color: "emerald",
      delay: 50,
    },
    {
      title: "انتقادات و پیشنهادات",
      value: counts?.contact ?? "—",
      href: "/admin/contact",
      icon: MessageSquare,
      color: "amber",
      delay: 100,
    },
    {
      title: "کامنت مقالات",
      value: counts?.comments ?? "—",
      href: "/admin/comments",
      icon: FileText,
      color: "violet",
      delay: 150,
    },
    {
      title: "کامنت محصولات",
      value: counts?.productComments ?? "—",
      href: "/admin/product-comments",
      icon: Package,
      color: "rose",
      delay: 200,
    },
  ];

  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
    violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
    rose: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400",
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div
        className="max-w-5xl mx-auto"
        style={{ animation: "adminFadeIn 0.4s ease-out" }}
      >
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">پیشخوان ادمین</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">خلاصه وضعیت و دسترسی سریع به بخش‌ها</p>

        {/* ویجت‌های رشد: آیتم‌های سبد خرید و کاربران */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {loading ? (
            <>
              <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
              <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
            </>
          ) : (
            <>
              <div
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 p-5"
                style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "0ms" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="h-5 w-5 text-emerald-500" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">آیتم‌های سبد خرید</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  تعداد کل آیتم‌ها (بر اساس درخواست‌های ثبت‌شده در هر بازه)
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg bg-slate-200/80 dark:bg-slate-800/40 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">این ماه</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats?.cartItems?.thisMonth ?? "—"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-200/80 dark:bg-slate-800/40 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">امسال</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats?.cartItems?.thisYear ?? "—"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                      (stats?.cartItems?.monthlyGrowthPercent ?? 0) >= 0
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {(stats?.cartItems?.monthlyGrowthPercent ?? 0) >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    ماهانه: {(stats?.cartItems?.monthlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.cartItems?.monthlyGrowthPercent ?? 0}%
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                      (stats?.cartItems?.yearlyGrowthPercent ?? 0) >= 0
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {(stats?.cartItems?.yearlyGrowthPercent ?? 0) >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    سالانه: {(stats?.cartItems?.yearlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.cartItems?.yearlyGrowthPercent ?? 0}%
                  </span>
                </div>
              </div>

              <div
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 p-5"
                style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "50ms" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-cyan-500" />
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">کاربران</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  تعداد کل کاربران و رشد ثبت‌نام در ماه و سال
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg bg-slate-200/80 dark:bg-slate-800/40 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">کل کاربران</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats?.users?.total ?? "—"}</p>
                  </div>
                  <div className="rounded-lg bg-slate-200/80 dark:bg-slate-800/40 p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">ثبت‌نام این ماه</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats?.users?.thisMonth ?? "—"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                      (stats?.users?.monthlyGrowthPercent ?? 0) >= 0
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {(stats?.users?.monthlyGrowthPercent ?? 0) >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    رشد ماهانه: {(stats?.users?.monthlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.users?.monthlyGrowthPercent ?? 0}%
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                      (stats?.users?.yearlyGrowthPercent ?? 0) >= 0
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {(stats?.users?.yearlyGrowthPercent ?? 0) >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    رشد سالانه: {(stats?.users?.yearlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.users?.yearlyGrowthPercent ?? 0}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* نمودارها — زیر باکس‌ها، بزرگ و تمام‌عرض */}
        {!loading && stats?.chartData && (
          <div className="space-y-6 mb-8 w-full max-w-none">
            <div
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 p-4 sm:p-6"
              style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "100ms" }}
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-500" />
                روند آیتم‌های سبد خرید (۱۲ ماه اخیر)
              </h3>
              <div className="w-full h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.chartData.cartItemsByMonth}
                    margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-600" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "currentColor", fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <YAxis
                      tick={{ fill: "currentColor", fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--tw-bg-opacity)",
                        border: "1px solid rgb(148 163 184)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "inherit" }}
                      formatter={(value: number) => [value, "تعداد آیتم"]}
                      labelFormatter={(label) => `ماه: ${label}`}
                    />
                    <Bar dataKey="value" name="آیتم" radius={[4, 4, 0, 0]} fill="#10b981">
                      {stats.chartData.cartItemsByMonth.map((_, i) => (
                        <Cell key={i} fill="#10b981" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 p-4 sm:p-6"
              style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "150ms" }}
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-500" />
                روند ثبت‌نام کاربران (۱۲ ماه اخیر)
              </h3>
              <div className="w-full h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.chartData.usersByMonth}
                    margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-600" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "currentColor", fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <YAxis
                      tick={{ fill: "currentColor", fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--tw-bg-opacity)",
                        border: "1px solid rgb(148 163 184)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [value, "کاربر جدید"]}
                      labelFormatter={(label) => `ماه: ${label}`}
                    />
                    <Bar dataKey="count" name="کاربر" radius={[4, 4, 0, 0]} fill="#06b6d4">
                      {stats.chartData.usersByMonth.map((_, i) => (
                        <Cell key={i} fill="#06b6d4" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`block rounded-xl border bg-gradient-to-br p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 ${colorClasses[card.color]}`}
                  style={{
                    animation: "adminCardIn 0.45s ease-out backwards",
                    animationDelay: `${card.delay}ms`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{card.title}</p>
                      <p className="text-2xl font-bold mt-1 text-slate-800 dark:text-slate-100">{card.value}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm opacity-90">
                    مشاهده
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
