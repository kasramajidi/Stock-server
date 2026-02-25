"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ShopProduct } from "@/lib/shop-api";
import { getAuthCookie } from "@/lib/cookie";

type Comment = {
  id: string;
  content: string;
  status: string;
  adminReply: string | null;
  parentId: string | null;
  createdAt: string;
  user: { id: string; fullName: string };
  replies?: Comment[];
};

interface ReviewsSectionProps {
  product: ShopProduct | null;
  productIdOrSlug?: string;
}

export default function ReviewsSection({ product, productIdOrSlug }: ReviewsSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productName = product?.name ?? "این محصول";

  useEffect(() => {
    let mounted = true;
    const token = getAuthCookie();
    setIsLoggedIn(!!token);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!productIdOrSlug) {
      setLoading(false);
      return;
    }
    let mounted = true;
    fetch(`/api/products/${encodeURIComponent(productIdOrSlug)}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      })
      .catch(() => {
        if (mounted) setComments([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [productIdOrSlug]);

  const refetchComments = () => {
    if (!productIdOrSlug) return;
    fetch(`/api/products/${encodeURIComponent(productIdOrSlug)}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productIdOrSlug || !content.trim() || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(productIdOrSlug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: content.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      if (!res.ok) {
        setError(Array.isArray(data?.errors) ? data.errors.join(" ") : "خطا در ثبت نظر.");
        return;
      }
      setContent("");
      refetchComments();
    } catch {
      setError("خطا در ارتباط با سرور.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-3">نظرات کاربران</h3>
        {loading ? (
          <p className="text-slate-500 text-sm">در حال بارگذاری...</p>
        ) : comments.length === 0 ? (
          <p className="text-slate-500 text-sm">هنوز نظری ثبت نشده است.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="border-b border-slate-100 pb-4 last:border-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-medium text-slate-900">{c.user.fullName}</span>
                  <span className="text-slate-400 text-xs">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">{c.content}</p>
                {c.adminReply && (
                  <div className="mt-3 mr-4 pr-4 border-r-2 border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">پاسخ فروشگاه:</span>
                    <p className="text-slate-600 text-sm mt-1">{c.adminReply}</p>
                  </div>
                )}
                {c.replies && c.replies.length > 0 && (
                  <ul className="mt-3 space-y-2 mr-4">
                    {c.replies.map((r) => (
                      <li key={r.id} className="pr-4 border-r-2 border-slate-200">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-slate-700 text-sm">{r.user.fullName}</span>
                          <span className="text-slate-400 text-xs">{formatDate(r.createdAt)}</span>
                        </div>
                        <p className="text-slate-600 text-sm">{r.content}</p>
                        {r.adminReply && (
                          <p className="text-slate-500 text-xs mt-1">پاسخ: {r.adminReply}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">ثبت نظر</h3>
        <p className="text-slate-600 text-sm mb-4">&quot;{productName}&quot;</p>
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="نظر خود را بنویسید..."
              rows={4}
              maxLength={2000}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 resize-none"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={!content.trim() || submitting}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "در حال ثبت..." : "ثبت نظر"}
            </button>
          </form>
        ) : (
          <p className="text-slate-500 text-sm">
            برای ثبت نظر{" "}
            <Link href="/auth" className="text-slate-900 font-medium underline hover:no-underline">
              وارد حساب کاربری
            </Link>{" "}
            شوید.
          </p>
        )}
      </div>
    </div>
  );
}
