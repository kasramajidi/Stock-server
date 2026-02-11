"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Info, Plus } from "lucide-react";
import {
  fetchWalletBalance,
  fetchInvoicesForUser,
  fetchRecentSupportTickets,
  getLoginPhoneFromStorage,
  normalizePhoneForComparison,
  type InvoiceItem,
  type SupportTicket,
} from "../lib/my-account-api";

function shopTitle(item: InvoiceItem): string {
  const t = (item.shop as { title?: string } | undefined)?.title;
  return typeof t === "string" ? t : "—";
}

export default function DashboardMain() {
  const router = useRouter();
  const [wallet, setWallet] = useState<{ total?: number; available?: number; blocked?: number }>({});
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSupport, setLoadingSupport] = useState(true);

  const ORDERS_PER_PAGE = 5;
  const ordersTotalPages = Math.max(1, Math.ceil(invoices.length / ORDERS_PER_PAGE));
  const ordersStart = (ordersPage - 1) * ORDERS_PER_PAGE;
  const ordersPageItems = invoices.slice(ordersStart, ordersStart + ORDERS_PER_PAGE);

  useEffect(() => {
    if (ordersPage > ordersTotalPages && ordersTotalPages >= 1) setOrdersPage(1);
  }, [invoices.length, ordersTotalPages, ordersPage]);

  useEffect(() => {
    fetchWalletBalance().then((w) => {
      setWallet(w);
      setLoadingWallet(false);
    });
  }, []);
  useEffect(() => {
    (async () => {
      try {
        // همان منبع «سفارش‌های من»: اول سفارش‌های محلی، بعد فاکتور بک‌اند
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
          setInvoices(mapped.slice(0, 10));
          setLoadingOrders(false);
          return;
        }
        const list = await fetchInvoicesForUser();
        setInvoices(list.slice(0, 10));
      } finally {
        setLoadingOrders(false);
      }
    })();
  }, []);
  useEffect(() => {
    fetchRecentSupportTickets().then((list) => {
      setSupportTickets(list);
      setLoadingSupport(false);
    });
  }, []);

  const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";
  const totalRial = wallet.total ?? 0;
  const availableRial = wallet.available ?? wallet.total ?? 0;
  const blockedRial = wallet.blocked ?? 0;

  const walletCards = [
    { label: "موجودی بلوکه شده", value: blockedRial, action: null as string | null, href: null as string | null },
    { label: "موجودی در دسترس", value: availableRial, action: "افزایش", href: "/my-account/wallet-increase" },
    { label: "موجودی کیف پول", value: totalRial, action: null as string | null, href: null as string | null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          کیف پول
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {walletCards.map(({ label, value, action, href }) => (
            <div
              key={label}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <button type="button" className="text-gray-400 hover:text-gray-600" title="اطلاعات">
                  <Info size={14} />
                </button>
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {loadingWallet ? "—" : formatRial(value)}
              </p>
              {action && href && (
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  className="mt-4 text-sm font-medium text-[#ff5538] hover:underline"
                >
                  {action}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین درخواست های پشتیبانی</h3>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="درخواست جدید"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">عنوان پیام</th>
                  <th className="px-4 py-3 font-medium text-gray-600">شماره پیام</th>
                </tr>
              </thead>
              <tbody>
                {loadingSupport ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      در حال بارگذاری…
                    </td>
                  </tr>
                ) : supportTickets.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      پیامی ثبت نشده است
                    </td>
                  </tr>
                ) : (
                  supportTickets.map((t) => (
                    <tr key={t.id} className="border-b border-gray-50">
                      <td className="px-4 py-3">{t.status}</td>
                      <td className="px-4 py-3">{t.lastUpdate}</td>
                      <td className="px-4 py-3">{t.title}</td>
                      <td className="px-4 py-3">{t.messageNumber ?? t.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین سفارش ها</h3>
            <button
              type="button"
              onClick={() => router.push("/my-account/orders")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="مشاهده همه سفارش‌ها"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">شماره سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">نوع سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {loadingOrders ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      در حال بارگذاری…
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      سفارشی ثبت نشده است
                    </td>
                  </tr>
                ) : (
                  ordersPageItems.map((item) => {
                    const paid = item.isPaid === true || String(item.paymentStatus || "").trim() === "پرداخت شده";
                    return (
                      <tr
                        key={String(item.id ?? item.shopid ?? Math.random())}
                        className="border-b border-gray-50 cursor-pointer hover:bg-gray-50/50"
                        onClick={() => router.push("/my-account/orders")}
                      >
                        <td className="px-4 py-3 text-gray-700">{item.id ?? "—"}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{shopTitle(item)}</td>
                        <td className="px-4 py-3 text-gray-500">—</td>
                        <td className="px-4 py-3">
                          <span className={paid ? "text-emerald-600 font-medium" : "text-amber-600"}>
                            {paid ? "پرداخت شده" : "پرداخت نشده"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {invoices.length > ORDERS_PER_PAGE && (
            <div className="flex flex-wrap items-center justify-center gap-3 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
              <span className="text-xs text-gray-600">
                تعداد: <span className="font-medium">{new Intl.NumberFormat("fa-IR").format(invoices.length)}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                  disabled={ordersPage <= 1}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="صفحه قبل"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#ff5538] text-xs font-medium text-white">
                  {new Intl.NumberFormat("fa-IR").format(ordersPage)} / {new Intl.NumberFormat("fa-IR").format(ordersTotalPages)}
                </span>
                <button
                  type="button"
                  onClick={() => setOrdersPage((p) => Math.min(ordersTotalPages, p + 1))}
                  disabled={ordersPage >= ordersTotalPages}
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="صفحه بعد"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
