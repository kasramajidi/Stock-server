"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, ShoppingCart, MessageSquare, FileText, Package, ArrowLeft } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

interface Counts {
  users: number;
  cartRequests: number;
  contact: number;
  comments: number;
  productComments: number;
}

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetch<{ users?: unknown[] }>("/api/users"),
      adminFetch<{ cartRequests?: unknown[] }>("/api/cart-requests"),
      adminFetch<{ inquiries?: unknown[] }>("/api/contact"),
      adminFetch<{ comments?: unknown[] }>("/api/comments"),
      adminFetch<{ comments?: unknown[] }>("/api/product-comments"),
    ])
      .then(([u, c, co, cm, pc]) => {
        setCounts({
          users: u.data?.users?.length ?? 0,
          cartRequests: c.data?.cartRequests?.length ?? 0,
          contact: co.data?.inquiries?.length ?? 0,
          comments: cm.data?.comments?.length ?? 0,
          productComments: pc.data?.comments?.length ?? 0,
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
      title: "تماس‌ها",
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
        <h1 className="text-2xl font-bold text-slate-100 mb-1">پیشخوان ادمین</h1>
        <p className="text-slate-400 text-sm mb-8">خلاصه وضعیت و دسترسی سریع به بخش‌ها</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => {
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
                      <p className="text-slate-400 text-sm font-medium">{card.title}</p>
                      <p className="text-2xl font-bold mt-1">{card.value}</p>
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
