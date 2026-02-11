"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MessageCircle, Package, Plus } from "lucide-react";
import ListEmptyState from "./ListEmptyState";
import {
  fetchWalletBalance,
  fetchInvoicesForUser,
  fetchRecentSupportTickets,
  getLoginPhoneFromStorage,
  normalizePhoneForComparison,
  type InvoiceItem,
  type SupportTicket,
} from "@/lib/dashboard-api";

function shopTitle(item: InvoiceItem): string {
  const t = (item.shop as { title?: string } | undefined)?.title;
  return typeof t === "string" ? t : "—";
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
          const mapped = orders.flatMap((order) => {
            const items = Array.isArray(order.items) ? order.items : [];
            if (!items.length) return [];
            const first = items[0];
            const paid = order.isPaid === true || String(order.status || "").trim() === "پرداخت شده";
            const shopId = first.productId != null ? Number(first.productId) : undefined;
            return [
              {
                id: order.id,
                shopid: first.productId,
                quantity: first.quantity,
                isPaid: paid,
                paymentStatus: paid ? "پرداخت شده" : (order.status ?? "در حال پردازش"),
                price: first.finalPrice,
                shop: { id: shopId, title: first.productName, price: first.finalPrice },
                user: { phone: order.contact?.phone },
              },
            ];
          }) as InvoiceItem[];
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

  const totalRial = wallet.total ?? 0;
  const availableRial = wallet.available ?? wallet.total ?? 0;
  const blockedRial = wallet.blocked ?? 0;

  return (
    <div className="flex flex-col gap-10">
      {/* کیف پول */}
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          کیف پول
        </p>
        <div className="flex flex-wrap gap-8 sm:gap-12">
          <div className="min-w-0 rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-light tabular-nums text-foreground">
              {loadingWallet ? "—" : new Intl.NumberFormat("fa-IR").format(availableRial)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">موجودی در دسترس</p>
            <button
              type="button"
              onClick={() => router.push("/dashboard/wallet-increase")}
              className="mt-2 text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
            >
              افزایش
            </button>
          </div>
          <div className="min-w-0 rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-light tabular-nums text-foreground">
              {loadingWallet ? "—" : new Intl.NumberFormat("fa-IR").format(blockedRial)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">بلوکه شده</p>
          </div>
          <div className="min-w-0 rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-light tabular-nums text-foreground">
              {loadingWallet ? "—" : new Intl.NumberFormat("fa-IR").format(totalRial)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">کل</p>
          </div>
        </div>
      </section>

      {/* پشتیبانی و سفارش */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              درخواست‌های پشتیبانی
            </p>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-[var(--primary-hover)] hover:text-[var(--primary-hover)]"
              title="درخواست جدید"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {loadingSupport ? (
              <ListEmptyState loading message="در حال بارگذاری…" icon={null} />
            ) : supportTickets.length === 0 ? (
              <ListEmptyState
                icon={<MessageCircle size={20} strokeWidth={1.8} />}
                message="هنوز پیامی ثبت نکرده‌اید."
                actionLabel="ثبت درخواست پشتیبانی"
                onAction={() => router.push("/contact")}
              />
            ) : (
              supportTickets.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-[13px]"
                >
                  <span className="text-muted-foreground">{t.messageNumber ?? t.id}</span>
                  <span className="font-medium text-foreground">{t.title}</span>
                  <span className="text-muted-foreground">{t.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              آخرین سفارش‌ها
            </p>
            <button
              type="button"
              onClick={() => router.push("/dashboard/orders")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-[var(--primary-hover)] hover:text-[var(--primary-hover)]"
              title="مشاهده همه"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {loadingOrders ? (
              <ListEmptyState loading message="در حال بارگذاری…" icon={null} />
            ) : invoices.length === 0 ? (
              <ListEmptyState
                icon={<Package size={20} strokeWidth={1.8} />}
                message="هنوز سفارشی ثبت نکرده‌اید."
                actionLabel="مرور فروشگاه"
                onAction={() => router.push("/shop")}
              />
            ) : (
              ordersPageItems.map((item) => {
                const paid = item.isPaid === true || String(item.paymentStatus || "").trim() === "پرداخت شده";
                return (
                  <button
                    key={String(item.id ?? item.shopid ?? Math.random())}
                    type="button"
                    onClick={() => router.push("/dashboard/orders")}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-right text-[13px] transition-colors hover:bg-muted/50"
                  >
                    <span className="text-muted-foreground">{item.id ?? "—"}</span>
                    <span className="font-medium text-foreground">{shopTitle(item)}</span>
                    <span className={paid ? "text-emerald-600" : "text-amber-600"}>
                      {paid ? "پرداخت شده" : "پرداخت نشده"}
                    </span>
                  </button>
                );
              })
            )}
          </div>
          {invoices.length > ORDERS_PER_PAGE && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-2">
              <button
                type="button"
                onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                disabled={ordersPage <= 1}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
                aria-label="قبل"
              >
                <ChevronRight size={16} />
              </button>
              <span className="min-w-[4rem] text-center text-[12px] text-muted-foreground">
                {new Intl.NumberFormat("fa-IR").format(ordersPage)} از {new Intl.NumberFormat("fa-IR").format(ordersTotalPages)}
              </span>
              <button
                type="button"
                onClick={() => setOrdersPage((p) => Math.min(ordersTotalPages, p + 1))}
                disabled={ordersPage >= ordersTotalPages}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
                aria-label="بعد"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
