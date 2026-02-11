"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";
import ListEmptyState from "./ListEmptyState";
import {
  fetchInvoicesForUser,
  getLoginPhoneFromStorage,
  normalizePhoneForComparison,
  type InvoiceItem,
} from "@/lib/dashboard-api";

function shopTitle(item: InvoiceItem): string {
  const t = (item.shop as { title?: string } | undefined)?.title;
  return typeof t === "string" ? t : "—";
}

function shopPrice(item: InvoiceItem): number | undefined {
  const p = item.price;
  if (p != null && typeof p === "number") return p;
  const sp = (item.shop as { price?: number } | undefined)?.price;
  return typeof sp === "number" ? sp : undefined;
}

function isPaidItem(item: InvoiceItem): boolean {
  return item.isPaid === true || String(item.paymentStatus || "").trim() === "پرداخت شده";
}

interface ApiOrderItem {
  productId?: string;
  quantity?: number;
  productName?: string;
  finalPrice?: number;
}
interface ApiOrder {
  id?: string;
  contact?: { phone?: string };
  items?: ApiOrderItem[];
  isPaid?: boolean;
  status?: string;
}

const ITEMS_PER_PAGE = 10;

export default function OrdersSection() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order", { cache: "no-store" }).catch(() => null);
      const data = res ? await res.json().catch(() => null) : null;
      let orders: ApiOrder[] = Array.isArray(data?.orders) ? data.orders : [];
      const loginPhone = getLoginPhoneFromStorage();
      if (loginPhone?.trim()) {
        const normalized = normalizePhoneForComparison(loginPhone);
        const orderPhone = (o: ApiOrder) => (o.contact?.phone && normalizePhoneForComparison(String(o.contact.phone).trim())) || "";
        orders = orders.filter((o) => orderPhone(o) === normalized);
      }
      if (orders.length > 0) {
        const mapped: InvoiceItem[] = orders.flatMap((order) => {
          const items = Array.isArray(order.items) ? order.items : [];
          if (!items.length) return [];
          const first = items[0];
          const paid = order.isPaid === true || String(order.status || "").trim() === "پرداخت شده";
          return [
            {
              id: order.id,
              shopid: first.productId,
              quantity: first.quantity,
              isPaid: paid,
              paymentStatus: paid ? "پرداخت شده" : (order.status ?? "در حال پردازش"),
              price: first.finalPrice,
              shop: { id: first.productId, title: first.productName, price: first.finalPrice },
              user: { phone: order.contact?.phone },
            },
          ];
        });
        setInvoices(mapped);
        return;
      }
      const list = await fetchInvoicesForUser();
      setInvoices(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const totalCount = invoices.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = invoices.slice(start, start + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <ListEmptyState loading message="در حال بارگذاری سفارش‌ها…" />
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <AccountEmptyState
        message="هنوز سفارشی ثبت نکرده‌اید. از فروشگاه می‌توانید خرید کنید."
        buttonText="مرور فروشگاه"
        onButtonClick={() => router.push("/shop")}
      />
    );
  }

  const formatPrice = (n: number | undefined) =>
    n != null ? new Intl.NumberFormat("fa-IR").format(n) + " تومان" : "—";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {pageItems.map((item) => (
          <div
            key={String(item.id ?? item.shopid ?? Math.random())}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-[13px]"
          >
            <span className="text-muted-foreground">{item.id ?? "—"}</span>
            <span className="font-medium text-foreground">{shopTitle(item)}</span>
            <span className="text-muted-foreground">{item.quantity ?? "—"}</span>
            <span className="text-muted-foreground">{formatPrice(shopPrice(item))}</span>
            <span className={isPaidItem(item) ? "text-emerald-600" : "text-amber-600"}>
              {isPaidItem(item) ? "پرداخت شده" : (item.paymentStatus ?? "در حال پردازش")}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label="قبل"
          >
            <ChevronRight size={18} />
          </button>
          <span className="min-w-[5rem] text-center text-[12px] text-muted-foreground">
            {new Intl.NumberFormat("fa-IR").format(currentPage)} از {new Intl.NumberFormat("fa-IR").format(totalPages)}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label="بعد"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => load()}
        className="self-start text-[13px] font-medium text-muted-foreground hover:text-[var(--primary-hover)]"
      >
        بارگذاری مجدد
      </button>
    </div>
  );
}
