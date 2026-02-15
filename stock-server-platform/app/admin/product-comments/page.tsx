"use client";

import React, { useState, useEffect } from "react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { Package, RefreshCw, ChevronDown, ChevronUp, Check, X, Trash2 } from "lucide-react";

interface ProductComment {
  id: string;
  content: string;
  status: string;
  adminReply: string | null;
  createdAt: string;
  productId: string;
  user?: { id: string; fullName: string; mobile: string; email: string };
  product?: { id: string; title: string; category: string };
  parent?: { id: string; content: string } | null;
}

export default function AdminProductCommentsPage() {
  const [list, setList] = useState<ProductComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [replyForm, setReplyForm] = useState<{ id: string; status: string; adminReply: string } | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    adminFetch<{ comments?: ProductComment[] }>("/api/product-comments")
      .then(({ data, ok }) => {
        if (ok && data?.comments) setList(data.comments);
        else setError("خطا در بارگذاری کامنت‌های محصول.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteComment = async (id: string) => {
    if (!confirm("آیا از حذف این کامنت مطمئن هستید؟")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/product-comments/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        load();
        setReplyForm(null);
        setExpandedId(null);
      } else alert(json?.errors?.[0] || "خطا در حذف.");
    } finally {
      setActionLoading(null);
    }
  };

  const setReview = async (id: string, status: string, adminReply: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/product-comments/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, adminReply: adminReply || undefined }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) {
      load();
      setReplyForm(null);
      setExpandedId(null);
    } else alert(json?.errors?.[0] || "خطا در بروزرسانی.");
  };

  const statusLabels: Record<string, string> = {
    pending: "در انتظار",
    approved: "تایید شده",
    rejected: "رد شده",
  };
  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    approved: "bg-emerald-500/20 text-emerald-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">کامنت محصولات</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">تایید، رد و پاسخ به کامنت‌های محصولات</p>
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
              <div key={i} className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((c, i) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 overflow-hidden transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600"
                style={{
                  animation: "adminCardIn 0.35s ease-out backwards",
                  animationDelay: `${i * 35}ms`,
                }}
              >
                <div
                  className="flex flex-wrap items-start justify-between gap-3 p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/20"
                  onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">{c.content}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {c.user?.fullName} · {c.product?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[c.status] ?? "bg-slate-400/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-400"}`}
                    >
                      {statusLabels[c.status] ?? c.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteComment(c.id);
                      }}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف
                    </button>
                    {expandedId === c.id ? (
<ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    )}
                  </div>
                </div>
                {expandedId === c.id && (
                  <div className="border-t border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 p-4 space-y-4">
                    <p className="text-sm text-slate-300">{c.content}</p>
                    {c.adminReply && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 border-r-2 border-cyan-500/50 pr-3">
                        <span className="text-slate-500">پاسخ ادمین:</span> {c.adminReply}
                      </p>
                    )}
                    {replyForm?.id === c.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={replyForm.adminReply}
                          onChange={(e) => setReplyForm({ ...replyForm, adminReply: e.target.value })}
                          className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 min-h-[80px] focus:border-cyan-500 focus:outline-none"
                          placeholder="پاسخ ادمین (اختیاری)"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setReview(c.id, "approved", replyForm.adminReply)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50"
                          >
                            <Check className="h-4 w-4" />
                            تایید
                          </button>
                          <button
                            type="button"
                            onClick={() => setReview(c.id, "rejected", replyForm.adminReply)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                            رد
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyForm(null)}
                            className="rounded-lg bg-slate-400 dark:bg-slate-600 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-500"
                          >
                            انصراف
                          </button>
                        </div>
                      </div>
                    ) : c.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => setReplyForm({ id: c.id, status: "approved", adminReply: "" })}
                        className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/30"
                      >
                        تایید / رد و پاسخ
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {list.length === 0 && !loading && (
              <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 p-12 text-center text-slate-500 dark:text-slate-400">
                کامنتی یافت نشد.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
