"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import OrdersTable from "./components/OrdersTable";

interface Order {
  id: string;
  customer: string;
  products: string;
  amount: string;
  /** مبلغ عددی برای جمع‌گیری */
  totalNumber: number;
  status: string;
  date: string;
}

function formatOrderDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
}

function formatAmount(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n) + " تومان";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/order");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "خطا در بارگذاری سفارشات");
        setOrders([]);
        return;
      }
      const list = Array.isArray(data.orders) ? data.orders : [];
      const mapped: Order[] = list.map((o: { id?: string; contact?: { name?: string; phone?: string }; items?: { productName?: string; quantity?: number }[]; total?: number; createdAt?: string; status?: string }) => {
        const totalNum = o.total != null ? Number(o.total) : 0;
        return {
          id: String(o.id ?? ""),
          customer: [o.contact?.name, o.contact?.phone].filter(Boolean).join(" — ") || "—",
          products: Array.isArray(o.items) ? o.items.map((i: { productName?: string; quantity?: number }) => `${i.productName ?? "—"}${(i.quantity ?? 0) > 1 ? ` (${i.quantity ?? 1})` : ""}`).join("، ") : "—",
          amount: o.total != null ? formatAmount(totalNum) : "—",
          totalNumber: totalNum,
          status: o.status && String(o.status).trim() ? String(o.status) : "در حال پردازش",
          date: o.createdAt ? formatOrderDate(String(o.createdAt)) : "—",
        };
      });
      setOrders(mapped);
    } catch {
      setError("خطا در ارتباط با سرور");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    try {
      const res = await fetch(`/api/order?id=${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) await loadOrders();
    } catch {
      await loadOrders();
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PAGE_SIZE = 20;
  const totalFiltered = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedOrders = filteredOrders.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این سفارش اطمینان دارید؟")) return;
    try {
      const res = await fetch(`/api/order?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        await loadOrders();
        setError(null);
      } else {
        setError(data?.error || "حذف انجام نشد.");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    }
  };

  const orderStats = useMemo(() => {
    const total = orders.length;
    const inProgress = orders.filter((o) => o.status === "در حال پردازش").length;
    const delivered = orders.filter((o) => o.status === "تحویل داده شده").length;
    return [
      { title: "کل سفارشات", value: total, icon: "📦", color: "bg-brand-muted text-brand" },
      { title: "در حال پردازش", value: inProgress, icon: "⏳", color: "bg-amber-50 text-amber-600" },
      { title: "تحویل داده شده", value: delivered, icon: "✅", color: "bg-emerald-50 text-emerald-600" },
    ];
  }, [orders]);

  /** پرداخت‌شده = تحویل داده شده یا ارسال شده؛ پرداخت‌نشده = بقیه */
  const amountStats = useMemo(() => {
    const paidStatuses = ["تحویل داده شده", "ارسال شده"];
    let paidSum = 0;
    let unpaidSum = 0;
    for (const o of orders) {
      const n = o.totalNumber || 0;
      if (paidStatuses.includes(o.status)) paidSum += n;
      else unpaidSum += n;
    }
    const totalSum = paidSum + unpaidSum;
    return {
      paid: paidSum,
      unpaid: unpaidSum,
      total: totalSum,
    };
  }, [orders]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            مدیریت سفارشات
          </h1>
          <p className="text-sm text-gray-600">
            مشاهده و مدیریت تمام سفارشات
          </p>
        </div>

        <AdminStatsCards items={orderStats} />

        <div className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">خلاصه مبالغ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">مجموع پرداخت‌شده</p>
              <p className="text-lg font-semibold text-emerald-600">
                {formatAmount(amountStats.paid)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">مجموع پرداخت‌نشده</p>
              <p className="text-lg font-semibold text-amber-600">
                {formatAmount(amountStats.unpaid)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">مجموع کل</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatAmount(amountStats.total)}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
            <button type="button" onClick={loadOrders} className="mr-2 underline">
              تلاش مجدد
            </button>
          </div>
        )}

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در سفارشات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        {loading ? (
          <div className="bg-white border-b border-gray-200 p-8 text-center text-gray-500">
            در حال بارگذاری سفارشات…
          </div>
        ) : (
          <>
            <OrdersTable
              orders={paginatedOrders}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onDetails={setDetailsOrder}
            />
            {detailsOrder && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setDetailsOrder(null)}
                role="dialog"
                aria-modal="true"
                aria-label="جزئیات سفارش"
              >
                <div
                  className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    جزئیات سفارش {detailsOrder.id}
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500">شماره سفارش</dt>
                      <dd className="text-gray-900 font-medium">{detailsOrder.id}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">مشتری</dt>
                      <dd className="text-gray-900">{detailsOrder.customer}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">محصولات</dt>
                      <dd className="text-gray-900">{detailsOrder.products}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">مبلغ</dt>
                      <dd className="text-gray-900">{detailsOrder.amount}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">وضعیت</dt>
                      <dd className="text-gray-900">{detailsOrder.status}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">تاریخ</dt>
                      <dd className="text-gray-900">{detailsOrder.date}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setDetailsOrder(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                    >
                      بستن
                    </button>
                  </div>
                </div>
              </div>
            )}
            {totalPages > 1 && (
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm text-gray-600">
                  صفحه {currentPage} از {totalPages} — {totalFiltered} سفارش
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    قبلی
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPage(p)}
                      className={`min-w-[2.25rem] py-1.5 rounded text-sm ${
                        p === currentPage
                          ? "bg-[#ff5538] text-white border border-[#ff5538]"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1.5 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
