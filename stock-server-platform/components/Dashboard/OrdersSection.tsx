"use client";

import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import type { InvoiceItem } from "@/lib/dashboard-api";
import AccountEmptyState from "./AccountEmptyState";

/** تبدیل شناسه به عدد برای سازگاری با InvoiceItem.shop.id */
function toShopId(value: string | number | undefined): number | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return Number.isNaN(value) ? undefined : value;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

type OrderItem = {
  productId?: string | number;
  productName?: string;
  finalPrice?: number;
  quantity?: number;
  [key: string]: unknown;
};

type Order = {
  id?: string;
  items?: OrderItem[];
  isPaid?: boolean;
  paymentStatus?: string;
  price?: number;
  user?: { name?: string; phone?: string; [key: string]: unknown };
  [key: string]: unknown;
};

export default function OrdersSection() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const raw = typeof window !== "undefined" ? localStorage.getItem("orders") : null;
        const orders: Order[] = raw ? (JSON.parse(raw) as Order[]) : [];
        if (!mounted) return;
        if (orders.length > 0) {
          const mapped: InvoiceItem[] = orders.flatMap((order) => {
            const items = Array.isArray(order.items) ? order.items : [];
            if (!items.length) return [];
            const first = items[0];
            return [
              {
                id: order.id,
                shopid: first.productId,
                quantity: first.quantity ?? order.price,
                isPaid: Boolean(order.isPaid),
                paymentStatus: order.paymentStatus ?? "",
                price: first.finalPrice ?? order.price,
                shop: {
                  id: toShopId(first.productId),
                  title: first.productName,
                  price: first.finalPrice,
                },
                user: order.user,
              },
            ];
          });
          setInvoices(mapped);
        }
      } catch {
        if (mounted) setInvoices([]);
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

  if (invoices.length === 0) {
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
          {invoices.map((inv, i) => (
            <li
              key={inv.id ?? i}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-background p-3 text-sm"
            >
              <span className="font-medium">{inv.shop?.title ?? "سفارش"}</span>
              <span className="text-muted-foreground">
                {inv.price != null ? `${inv.price.toLocaleString("fa-IR")} ریال` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
