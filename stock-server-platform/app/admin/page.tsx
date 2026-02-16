"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, ShoppingCart, MessageSquare, FileText, Package, ArrowLeft, TrendingUp, TrendingDown, ShoppingBag, Newspaper } from "lucide-react";
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
import { useAdminTheme } from "@/components/Admin/AdminThemeContext";

interface Counts {
  users: number;
  cartRequests: number;
  contact: number;
  comments: number;
  productComments: number;
  products: number;
  articles: number;
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

// دادهٔ پیش‌فرض ۱۲ ماه برای نمودار وقتی از API نیامده یا خالی است
function getChartDataFallback(
  cartItems: { label: string; value: number }[] | undefined,
  users: { label: string; count: number }[] | undefined
) {
  const emptyCart = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: 0,
  }));
  const emptyUsers = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    count: 0,
  }));
  return {
    cartItemsByMonth: cartItems?.length ? cartItems : emptyCart,
    usersByMonth: users?.length ? users : emptyUsers,
  };
}

const tooltipStyle = (isDark: boolean) =>
  isDark
    ? {
        backgroundColor: "rgb(30 41 59)",
        color: "rgb(248 250 252)",
        border: "1px solid rgb(71 85 105)",
        borderRadius: "8px",
      }
    : {
        backgroundColor: "rgb(248 250 252)",
        color: "rgb(30 41 59)",
        border: "1px solid rgb(203 213 225)",
        borderRadius: "8px",
      };

export default function AdminOverviewPage() {
  const { theme } = useAdminTheme();
  const isDark = theme === "dark";
  const [counts, setCounts] = useState<Counts | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const chartData = getChartDataFallback(
    stats?.chartData?.cartItemsByMonth,
    stats?.chartData?.usersByMonth
  );

  useEffect(() => {
    Promise.all([
      adminFetch<{ users?: unknown[] }>("/api/users"),
      adminFetch<{ cartRequests?: unknown[] }>("/api/cart-requests"),
      adminFetch<{ inquiries?: unknown[] }>("/api/contact"),
      adminFetch<{ comments?: unknown[] }>("/api/comments"),
      adminFetch<{ comments?: unknown[] }>("/api/product-comments"),
      adminFetch<{ total?: number }>("/api/products?limit=1"),
      adminFetch<{ articles?: unknown[] }>("/api/articles"),
      adminFetch<{
          cartItems: DashboardStats["cartItems"];
          users: DashboardStats["users"];
          chartData?: DashboardStats["chartData"];
        }>("/api/admin/stats"),
    ])
      .then(([u, c, co, cm, pc, pr, ar, st]) => {
        setCounts({
          users: u.data?.users?.length ?? 0,
          cartRequests: c.data?.cartRequests?.length ?? 0,
          contact: co.data?.inquiries?.length ?? 0,
          comments: cm.data?.comments?.length ?? 0,
          productComments: pc.data?.comments?.length ?? 0,
          products: pr.data?.total ?? 0,
          articles: ar.data?.articles?.length ?? 0,
        });
        if (st.ok && st.data)
          setStats({
            cartItems: st.data.cartItems,
            users: st.data.users,
            chartData: st.data.chartData,
          });
      })
      .catch(() => setCounts({ users: 0, cartRequests: 0, contact: 0, comments: 0, productComments: 0, products: 0, articles: 0 }))
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
    {
      title: "محصولات",
      value: counts?.products ?? "—",
      href: "/admin/products",
      icon: ShoppingBag,
      color: "sky",
      delay: 250,
    },
    {
      title: "مقالات",
      value: counts?.articles ?? "—",
      href: "/admin/articles",
      icon: Newspaper,
      color: "violet",
      delay: 300,
    },
  ];

  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
    violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
    rose: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400",
    sky: "from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-400",
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div
        className="max-w-5xl mx-auto w-full min-w-0"
        style={{ animation: "adminFadeIn 0.4s ease-out" }}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">پیشخوان ادمین</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">خلاصه وضعیت و دسترسی سریع به بخش‌ها</p>

        {/* ویجت‌های رشد: آیتم‌های سبد خرید و کاربران */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {loading ? (
            <>
              <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
              <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
            </>
          ) : (
            <>
              <div
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 p-4 sm:p-5"
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
                    {(stats?.cartItems?.monthlyGrowthPercent ?? 0) >= 0 ? "رشد" : "افت"} ماهانه: {(stats?.cartItems?.monthlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
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
                    {(stats?.cartItems?.yearlyGrowthPercent ?? 0) >= 0 ? "رشد" : "افت"} سالانه: {(stats?.cartItems?.yearlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.cartItems?.yearlyGrowthPercent ?? 0}%
                  </span>
                </div>
              </div>

              <div
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 p-4 sm:p-5"
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
                    {(stats?.users?.monthlyGrowthPercent ?? 0) >= 0 ? "رشد" : "افت"} ماهانه: {(stats?.users?.monthlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
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
                    {(stats?.users?.yearlyGrowthPercent ?? 0) >= 0 ? "رشد" : "افت"} سالانه: {(stats?.users?.yearlyGrowthPercent ?? 0) >= 0 ? "+" : ""}
                    {stats?.users?.yearlyGrowthPercent ?? 0}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* نمودارها — زیر باکس‌ها، بزرگ و تمام‌عرض (همیشه نمایش داده می‌شوند، با داده خالی در صورت خطای API) */}
        {!loading && (
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 w-full max-w-none overflow-hidden">
            <div
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 p-3 sm:p-4 md:p-6"
              style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "100ms" }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                <span className="truncate">روند آیتم‌های سبد خرید (۱۲ ماه اخیر)</span>
              </h3>
              <div
                className={`w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-lg min-w-0 ${isDark ? "bg-slate-800/90" : "bg-slate-200/70"}`}
                style={{ backgroundColor: isDark ? "rgb(30 41 59 / 0.9)" : "rgb(226 232 240 / 0.7)" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.cartItemsByMonth}
                    margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "rgb(71 85 105)" : "rgb(203 213 225)"}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: isDark ? "rgb(248 250 252)" : "rgb(51 65 85)", fontSize: 12 }}
                    />
                    <YAxis
                      domain={(_dataMin: number, dataMax: number) => [0, Math.max(1, dataMax)]}
                      tick={{ fill: isDark ? "rgb(248 250 252)" : "rgb(51 65 85)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle(isDark)}
                      labelStyle={{ color: isDark ? "rgb(248 250 252)" : "rgb(30 41 59)" }}
                      formatter={(value: number | undefined) => [value ?? 0, "تعداد آیتم"]}
                      labelFormatter={(label) => `ماه: ${label}`}
                      cursor={false}
                    />
                    <Bar
                      dataKey="value"
                      name="آیتم"
                      radius={[4, 4, 0, 0]}
                      fill={isDark ? "#34d399" : "#059669"}
                      stroke="none"
                      activeBar={{
                        fill: isDark ? "#6ee7b7" : "#10b981",
                        stroke: "none",
                        opacity: 1,
                      }}
                      cursor="pointer"
                    >
                      {chartData.cartItemsByMonth.map((_, i) => (
                        <Cell
                          key={i}
                          fill={isDark ? "#34d399" : "#059669"}
                          stroke="none"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 p-3 sm:p-4 md:p-6"
              style={{ animation: "adminCardIn 0.4s ease-out backwards", animationDelay: "150ms" }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500 shrink-0" />
                <span className="truncate">روند ثبت‌نام کاربران (۱۲ ماه اخیر)</span>
              </h3>
              <div
                className={`w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-lg min-w-0 ${isDark ? "bg-slate-800/90" : "bg-slate-200/70"}`}
                style={{ backgroundColor: isDark ? "rgb(30 41 59 / 0.9)" : "rgb(226 232 240 / 0.7)" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.usersByMonth}
                    margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "rgb(71 85 105)" : "rgb(203 213 225)"}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: isDark ? "rgb(248 250 252)" : "rgb(51 65 85)", fontSize: 12 }}
                    />
                    <YAxis
                      domain={(_dataMin: number, dataMax: number) => [0, Math.max(1, dataMax)]}
                      tick={{ fill: isDark ? "rgb(248 250 252)" : "rgb(51 65 85)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle(isDark)}
                      labelStyle={{ color: isDark ? "rgb(248 250 252)" : "rgb(30 41 59)" }}
                      formatter={(value: number | undefined) => [value ?? 0, "کاربر جدید"]}
                      labelFormatter={(label) => `ماه: ${label}`}
                      cursor={false}
                    />
                    <Bar
                      dataKey="count"
                      name="کاربر"
                      radius={[4, 4, 0, 0]}
                      fill={isDark ? "#22d3ee" : "#0891b2"}
                      stroke="none"
                      activeBar={{
                        fill: isDark ? "#67e8f9" : "#06b6d4",
                        stroke: "none",
                        opacity: 1,
                      }}
                      cursor="pointer"
                    >
                      {chartData.usersByMonth.map((_, i) => (
                        <Cell
                          key={i}
                          fill={isDark ? "#22d3ee" : "#0891b2"}
                          stroke="none"
                        />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
