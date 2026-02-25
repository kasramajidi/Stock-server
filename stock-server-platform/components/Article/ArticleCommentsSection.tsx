"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

interface ArticleCommentsSectionProps {
  articleId: string;
  articleTitle?: string;
}

export default function ArticleCommentsSection({
  articleId,
  articleTitle = "این مقاله",
}: ArticleCommentsSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const token = getAuthCookie();
    setIsLoggedIn(!!token);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }
    let mounted = true;
    fetch(`/api/articles/${encodeURIComponent(articleId)}/comments`)
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
  }, [articleId]);

  const refetchComments = () => {
    if (!articleId) return;
    fetch(`/api/articles/${encodeURIComponent(articleId)}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleId || !content.trim() || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${encodeURIComponent(articleId)}/comments`, {
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
    <div className="mt-14 border-t border-gray-200 pt-12">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17e2fe]/10 text-[#0891b2]">
          💬
        </span>
        نظرات
      </h2>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-5 text-sm font-medium text-gray-600">نظرات کاربران</h3>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#17e2fe]/30 border-t-[#17e2fe]" />
              <span className="text-sm">در حال بارگذاری...</span>
            </div>
          ) : comments.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center text-sm text-gray-500">
              هنوز نظری ثبت نشده است. اولین نفر باشید!
            </p>
          ) : (
            <ul className="space-y-6">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="rounded-xl border border-gray-100 bg-gray-50/80 p-5 transition-colors hover:border-gray-200"
                >
                  <div className="mb-3 flex justify-between items-start gap-2">
                    <span className="font-medium text-gray-900">{c.user.fullName}</span>
                    <span className="text-xs text-gray-500">{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">{c.content}</p>
                  {c.adminReply && (
                    <div className="mt-4 mr-4 border-r-2 border-[#17e2fe]/40 pr-4">
                      <span className="text-xs font-medium text-[#0891b2]">پاسخ تیم پشتیبانی</span>
                      <p className="mt-1 text-sm text-gray-600">{c.adminReply}</p>
                    </div>
                  )}
                  {c.replies && c.replies.length > 0 && (
                    <ul className="mt-4 space-y-3 mr-4">
                      {c.replies.map((r) => (
                        <li key={r.id} className="border-r-2 border-gray-200 pr-4">
                          <div className="mb-1 flex justify-between items-start gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              {r.user.fullName}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(r.createdAt)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{r.content}</p>
                          {r.adminReply && (
                            <p className="mt-1 text-xs text-[#0891b2]">پاسخ: {r.adminReply}</p>
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
          <h3 className="mb-2 text-sm font-medium text-gray-600">ثبت نظر</h3>
          <p className="mb-6 truncate text-xs text-gray-500">مقاله: &quot;{articleTitle}&quot;</p>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="نظر خود را بنویسید..."
                rows={4}
                maxLength={2000}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#17e2fe] focus:outline-none focus:ring-1 focus:ring-[#17e2fe]/30"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={!content.trim() || submitting}
                className="rounded-xl bg-[#17e2fe] px-6 py-3 text-sm font-medium text-[#0b1e28] transition-all duration-300 hover:bg-[#14c8e0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "در حال ثبت..." : "ثبت نظر"}
              </button>
            </form>
          ) : (
            <p className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-6 text-sm text-gray-600">
              برای ثبت نظر{" "}
              <Link
                href="/auth"
                className="font-medium text-[#0891b2] underline underline-offset-2 transition-colors hover:text-[#0e7490]"
              >
                وارد حساب کاربری
              </Link>{" "}
              شوید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
