"use client";

import React, { useState, useEffect } from "react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { MessageSquare, RefreshCw, ChevronDown, ChevronUp, Check, X } from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  message: string;
  status: string;
  adminResponse: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactPage() {
  const [list, setList] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [replyForm, setReplyForm] = useState<{ id: string; status: string; adminResponse: string } | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    adminFetch<{ inquiries?: Inquiry[] }>("/api/contact")
      .then(({ data, ok }) => {
        if (ok && data?.inquiries) setList(data.inquiries);
        else setError("خطا در بارگذاری تماس‌ها.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submitReply = async (id: string, status: string, adminResponse: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, adminResponse: adminResponse || undefined }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) {
      load();
      setReplyForm(null);
      setExpandedId(null);
    } else alert(json?.errors?.[0] || "خطا در ارسال پاسخ.");
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
            <h1 className="text-2xl font-bold text-slate-100">تماس‌ها</h1>
            <p className="text-slate-400 text-sm mt-1">پرسش‌های ارسالی و پاسخ به کاربران</p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-600 transition-colors disabled:opacity-50"
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
              <div key={i} className="h-24 rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((inq, i) => (
              <div
                key={inq.id}
                className="rounded-xl border border-slate-700 bg-slate-800/30 overflow-hidden transition-all duration-200"
                style={{
                  animation: "adminCardIn 0.35s ease-out backwards",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                <div
                  className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer hover:bg-slate-700/20"
                  onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">{inq.fullName}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{inq.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[inq.status] ?? "bg-slate-600/50 text-slate-400"}`}
                    >
                      {statusLabels[inq.status] ?? inq.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    {expandedId === inq.id ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>
                {expandedId === inq.id && (
                  <div className="border-t border-slate-700 bg-slate-800/50 p-4 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-1">پیام</p>
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">{inq.message}</p>
                    </div>
                    {inq.adminResponse && (
                      <p className="text-sm text-slate-400">
                        <span className="text-slate-500">پاسخ ادمین:</span> {inq.adminResponse}
                      </p>
                    )}
                    {replyForm?.id === inq.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={replyForm.adminResponse}
                          onChange={(e) => setReplyForm({ ...replyForm, adminResponse: e.target.value })}
                          className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-sm text-slate-200 min-h-[100px] focus:border-cyan-500 focus:outline-none"
                          placeholder="متن پاسخ به کاربر (اختیاری)"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => submitReply(inq.id, "approved", replyForm.adminResponse)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50"
                          >
                            <Check className="h-4 w-4" />
                            تایید و ارسال ایمیل
                          </button>
                          <button
                            type="button"
                            onClick={() => submitReply(inq.id, "rejected", replyForm.adminResponse)}
                            disabled={!!actionLoading}
                            className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                            رد و ارسال ایمیل
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyForm(null)}
                            className="rounded-lg bg-slate-600 px-4 py-2 text-sm text-slate-400 hover:bg-slate-500"
                          >
                            انصراف
                          </button>
                        </div>
                      </div>
                    ) : inq.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => setReplyForm({ id: inq.id, status: "approved", adminResponse: "" })}
                        className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/30"
                      >
                        پاسخ و تایید/رد
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {list.length === 0 && !loading && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-12 text-center text-slate-500">
                پیامی یافت نشد.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
