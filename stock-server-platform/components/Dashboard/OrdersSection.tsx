"use client";

import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";

const STATUS_LABELS: Record<string, string> = {
  pending: "در انتظار بررسی",
  in_progress: "در حال بررسی",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

const STATUS_BADGE_CLASS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

type CartRequestItem = {
  id: string;
  productId: string;
  quantity: number;
  product: { id: string; title: string; slug: string; category: string; priceLabel: string };
};

type CartRequest = {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  items: CartRequestItem[];
};

export default function OrdersSection() {
  const [cartRequests, setCartRequests] = useState<CartRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/cart-requests", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (data?.success && Array.isArray(data.cartRequests)) {
          setCartRequests(data.cartRequests);
        } else {
          setCartRequests([]);
        }
      } catch {
        if (mounted) setCartRequests([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <p className="text-muted-foreground">در حال بارگذاری…</p>
        </section>
      </div>
    );
  }

  if (cartRequests.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            سفارش‌های من
          </p>
          <AccountEmptyState
            message="هنوز سفارشی ثبت نکرده‌اید."
            buttonText="مشاهده فروشگاه"
            onButtonClick={() => window.location.assign("/shop")}
            icon={<Package size={24} className="text-muted-foreground" strokeWidth={1.8} />}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          سفارش‌های من
        </p>
        <ul className="flex flex-col gap-3">
          {cartRequests.map((cr) => (
            <li
              key={cr.id}
              className="rounded-lg border border-border bg-background p-4 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(cr.createdAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    STATUS_BADGE_CLASS[cr.status] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {STATUS_LABELS[cr.status] ?? cr.status}
                </span>
              </div>
              <ul className="space-y-1">
                {cr.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-2">
                    <span className="font-medium">{item.product.title}</span>
                    <span className="text-muted-foreground">× {item.quantity}</span>
                  </li>
                ))}
              </ul>
              {cr.note && (
                <p className="mt-2 text-muted-foreground text-xs border-t border-border pt-2">
                  {cr.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
