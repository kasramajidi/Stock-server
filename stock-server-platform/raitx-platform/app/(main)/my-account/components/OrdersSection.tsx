"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";
import { fetchInvoicesForUser, getLoginPhoneFromStorage, normalizePhoneForComparison, type InvoiceItem } from "../lib/my-account-api";

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

const ITEMS_PER_PAGE = 10;

export default function OrdersSection() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const load = async () => {
    setLoading(true);
    try {
      // اول: سفارش‌های همین سایت (data/orders.json) تا وضعیت پرداخت (isPaid) درست نمایش داده شود
      const res = await fetch("/api/order", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      let orders: any[] = Array.isArray(data?.orders) ? data.orders : [];

      const loginPhone = getLoginPhoneFromStorage();
      if (loginPhone?.trim()) {
        const normalized = normalizePhoneForComparison(loginPhone);
        const orderPhone = (o: any) => (o.contact?.phone && normalizePhoneForComparison(String(o.contact.phone).trim())) || "";
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

      // اگر سفارش محلی نداشت، از بک‌اند فاکتور (mrpremiumhub) بگیر
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
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="w-10 h-10 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
        <p className="mt-3 text-sm">در حال بارگذاری سفارش‌ها…</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <AccountEmptyState
        message="هنوز سفارشی ثبت نکرده‌اید. از فروشگاه یا خدمات پرداخت ارزی می‌توانید خرید کنید."
        buttonText="مرور فروشگاه"
        onButtonClick={() => router.push("/")}
      />
    );
  }

  const formatPrice = (n: number | undefined) =>
    n != null ? new Intl.NumberFormat("fa-IR").format(n) + " تومان" : "—";

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">سفارش‌های من</h3>
        <p className="mt-0.5 text-sm text-gray-500">فهرست فاکتورها و وضعیت پرداخت</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right" aria-label="جدول سفارش‌های من">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-4 py-3 font-medium text-gray-600">شناسه</th>
                <th className="px-4 py-3 font-medium text-gray-600">محصول</th>
                <th className="px-4 py-3 font-medium text-gray-600">تعداد</th>
                <th className="px-4 py-3 font-medium text-gray-600">قیمت</th>
                <th className="px-4 py-3 font-medium text-gray-600">وضعیت پرداخت</th>
                <th className="px-4 py-3 font-medium text-gray-600">پرداخت شده</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={String(item.id ?? item.shopid ?? Math.random())} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-700">{item.id ?? "—"}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{shopTitle(item)}</td>
                  <td className="px-4 py-3 text-gray-700">{item.quantity ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-700">{formatPrice(shopPrice(item))}</td>
                  <td className="px-4 py-3">
                    <span className={isPaidItem(item) ? "text-emerald-600 font-medium" : "text-amber-600"}>
                      {isPaidItem(item) ? "پرداخت شده" : (item.paymentStatus ?? "در حال پردازش")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${isPaidItem(item) ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {isPaidItem(item) ? "پرداخت شده" : "پرداخت نشده"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
          <span className="text-sm text-gray-600">
            تعداد کل: <span className="font-medium">{new Intl.NumberFormat("fa-IR").format(totalCount)}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="صفحه قبل"
            >
              <ChevronRight size={20} />
            </button>
            <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[#ff5538] text-sm font-medium text-white">
              {new Intl.NumberFormat("fa-IR").format(currentPage)}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="صفحه بعد"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => load()}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        بارگذاری مجدد
      </button>
    </div>
  );
}
