"use client";

import React, { useState, useEffect } from "react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { ShoppingCart, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface CartRequestItem {
  id: string;
  productId: string;
  quantity: number;
  product?: { id: string; title: string; slug?: string; category?: string; priceLabel?: string };
}

interface CartRequest {
  id: string;
  userId: string;
  status: string;
  note: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; fullName: string; mobile: string; email: string };
  items?: CartRequestItem[];
}

export default function AdminCartRequestsPage() {
  const [list, setList] = useState<CartRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editNote, setEditNote] = useState<{ id: string; adminNote: string } | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    adminFetch<{ cartRequests?: CartRequest[] }>("/api/cart-requests")
      .then(({ data, ok }) => {
        if (ok && data?.cartRequests) setList(data.cartRequests);
        else setError("خطا در بارگذاری درخواست‌ها.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/cart-requests/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) {
      load();
      setEditNote(null);
    } else alert(json?.errors?.[0] || "خطا در بروزرسانی.");
  };

  const saveAdminNote = async (id: string, adminNote: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/cart-requests/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ adminNote: adminNote || null }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) {
      load();
      setEditNote(null);
    } else alert(json?.errors?.[0] || "خطا در ذخیره یادداشت.");
  };

  const statusLabels: Record<string, string> = {
    pending: "در انتظار",
    in_progress: "در حال انجام",
    completed: "تکمیل شده",
    cancelled: "لغو شده",
  };
  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    in_progress: "bg-cyan-500/20 text-cyan-400",
    completed: "bg-emerald-500/20 text-emerald-400",
    cancelled: "bg-slate-400/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-400",
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">درخواست‌های سبد خرید</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مدیریت وضعیت و یادداشت ادمین</p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-slate-300 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            بروزرسانی
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading && list.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((req, i) => (
              <div
                key={req.id}
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 overflow-hidden transition-all duration-200"
                style={{
                  animation: "adminCardIn 0.35s ease-out backwards",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-700/40 transition-colors duration-150"
                  onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {req.user?.fullName ?? "—"} · {req.user?.mobile ?? "—"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(req.createdAt).toLocaleDateString("fa-IR")} · {req.items?.length ?? 0} آیتم
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[req.status] ?? "bg-slate-400/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-400"}`}
                    >
                      {statusLabels[req.status] ?? req.status}
                    </span>
                    <select
                      value={req.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      disabled={!!actionLoading}
                      className="rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      {Object.entries(statusLabels).map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {expandedId === req.id ? (
<ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    )}
                  </div>
                </div>
                {expandedId === req.id && (
                  <div className="border-t border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 p-4 space-y-4">
                    {req.note && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-500">یادداشت کاربر:</span> {req.note}
                      </p>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">یادداشت ادمین</label>
                      {editNote?.id === req.id ? (
                        <div className="flex gap-2">
                          <textarea
                            value={editNote.adminNote}
                            onChange={(e) => setEditNote({ ...editNote, adminNote: e.target.value })}
                            className="flex-1 rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 min-h-[80px] focus:border-cyan-500 focus:outline-none"
                            placeholder="یادداشت داخلی..."
                          />
                          <button
                            type="button"
                            onClick={() => saveAdminNote(req.id, editNote.adminNote)}
                            disabled={!!actionLoading}
                            className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-50"
                          >
                            ذخیره
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditNote(null)}
                            className="rounded-lg bg-slate-400 dark:bg-slate-600 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-500"
                          >
                            انصراف
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {req.adminNote || "—"}
                          <button
                            type="button"
                            onClick={() => setEditNote({ id: req.id, adminNote: req.adminNote || "" })}
                            className="mr-2 text-cyan-400 hover:underline"
                          >
                            ویرایش
                          </button>
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">آیتم‌ها</p>
                      <ul className="space-y-1">
                        {req.items?.map((item) => (
                          <li key={item.id} className="text-sm text-slate-300">
                            {item.product?.title ?? item.productId} × {item.quantity}
                            {item.product?.priceLabel && ` · ${item.product.priceLabel}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {list.length === 0 && !loading && (
              <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 p-12 text-center text-slate-500 dark:text-slate-400">
                درخواستی یافت نشد.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
