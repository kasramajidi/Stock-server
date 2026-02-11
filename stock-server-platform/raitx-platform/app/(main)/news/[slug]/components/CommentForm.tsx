"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import {
  submitArticleComment,
  updateArticleComment,
  deleteArticleComment,
  getArticleComments,
  type ArticleCommentDisplayItem,
} from "../../lib/article-comments-api";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import type { ArticleCommentItem } from "../../lib/articles-api";

const STORAGE_KEY = "article_my_comment_emails";

function getMyEmailsForArticle(articleId: number | string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: { articleId: string; email: string }[] = raw ? JSON.parse(raw) : [];
    return list
      .filter((e) => String(e.articleId) === String(articleId))
      .map((e) => e.email.trim().toLowerCase());
  } catch {
    return [];
  }
}

function addMyEmailForArticle(articleId: number | string, email: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: { articleId: string; email: string }[] = raw ? JSON.parse(raw) : [];
    const key = String(articleId);
    const lower = email.trim().toLowerCase();
    if (!list.some((e) => e.articleId === key && e.email.toLowerCase() === lower)) {
      list.push({ articleId: key, email: email.trim() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch {
    // ignore
  }
}

function formatCommentDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const num = Number(dateStr);
  if (!Number.isNaN(num)) {
    const ms = num < 1e10 ? num * 1000 : num;
    return new Date(ms).toLocaleDateString("fa-IR");
  }
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("fa-IR");
}

interface CommentFormProps {
  articleId: number;
  /** نظراتی که با خود مقاله از API آمده (UserComments) — اگر action=articlecomments خالی بود، این‌ها نمایش داده می‌شوند */
  initialComments?: ArticleCommentItem[] | ArticleCommentDisplayItem[];
}

function toDisplayItem(c: ArticleCommentItem | ArticleCommentDisplayItem): ArticleCommentDisplayItem {
  return {
    id: c.id,
    author: c.author ?? "",
    content: c.content ?? "",
    rating: c.rating ?? 1,
    status: c.status ?? "pending",
    date: c.date,
    userEmail: c.userEmail ?? "",
  };
}

export default function CommentForm({ articleId, initialComments }: CommentFormProps) {
  const pathname = usePathname();
  const initialCommentsRef = useRef(initialComments);
  initialCommentsRef.current = initialComments ?? [];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cookie = (getAuthCookie() ?? "").trim();
    let hasStoredUser = false;
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const o = JSON.parse(raw);
        hasStoredUser = !!o && typeof o === "object" && (o.phone ?? o.token ?? o.username ?? o.name);
      }
    } catch {
      // ignore
    }
    setIsLoggedIn(cookie !== "" || hasStoredUser);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [comments, setComments] = useState<ArticleCommentDisplayItem[]>(() =>
    (initialComments ?? []).map(toDisplayItem)
  );
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [justSubmitted, setJustSubmitted] = useState<ArticleCommentDisplayItem[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [localEdits, setLocalEdits] = useState<Record<string, string>>({});

  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const list = await getArticleComments(articleId);
      const fallback = (initialCommentsRef.current ?? []).map(toDisplayItem);
      setComments(list.length > 0 ? list : fallback);
    } catch {
      setComments((initialCommentsRef.current ?? []).map(toDisplayItem));
    } finally {
      setCommentsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const myEmails = getMyEmailsForArticle(articleId);
  const allComments = [...comments, ...justSubmitted];
  const visibleComments = allComments.filter((c) => {
    if (deletedIds.has(String(c.id))) return false;
    const s = (c.status ?? "").toString().toLowerCase();
    return !s || s === "published" || s === "1" || s === "approved" || s === "pending";
  });

  const isMyComment = (c: ArticleCommentDisplayItem) => {
    const email = (c.userEmail ?? "").trim().toLowerCase();
    if (!email) return false;
    return myEmails.some((e) => e === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    const result = await submitArticleComment(articleId, {
      author: formData.name,
      email: formData.email,
      content: formData.comment,
      rating: 1,
    });
    setSubmitting(false);
    if (result.ok) {
      addMyEmailForArticle(articleId, formData.email);
      setJustSubmitted((prev) => [
        ...prev,
        {
          id: `new-${Date.now()}`,
          author: formData.name,
          content: formData.comment,
          rating: 1,
          status: "pending",
          date: new Date().toISOString(),
          userEmail: formData.email,
        },
      ]);
      setFormData({ name: "", email: "", comment: "" });
      setMessage({ type: "success", text: "دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود." });
    } else {
      setMessage({ type: "error", text: result.message ?? "خطا در ارسال دیدگاه." });
    }
  };

  const handleStartEdit = (c: ArticleCommentDisplayItem) => {
    setEditingId(c.id ?? null);
    setEditContent(localEdits[String(c.id)] ?? c.content ?? "");
    setActionMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
    setActionMessage(null);
  };

  const handleSaveEdit = async (c: ArticleCommentDisplayItem) => {
    const id = c.id;
    if (id == null) return;
    const isJustSubmitted = String(id).startsWith("new-");
    setActionMessage(null);
    if (isJustSubmitted) {
      setJustSubmitted((prev) =>
        prev.map((x) => (x.id === id ? { ...x, content: editContent.trim() } : x))
      );
      handleCancelEdit();
      return;
    }
    const emailForApi = ((c.userEmail ?? "").trim() || myEmails[0]) ?? "";
    if (!emailForApi) {
      setActionMessage({ type: "error", text: "امکان ویرایش این نظر از این دستگاه وجود ندارد." });
      return;
    }
    const result = await updateArticleComment(articleId, id, {
      content: editContent.trim(),
      rating: 1,
      userEmail: emailForApi,
    });
    if (result.ok) {
      setLocalEdits((prev) => ({ ...prev, [String(id)]: editContent.trim() }));
      setActionMessage({ type: "success", text: "نظر ویرایش شد." });
      setTimeout(() => setActionMessage(null), 3000);
      handleCancelEdit();
    } else {
      setActionMessage({ type: "error", text: result.message ?? "خطا در ویرایش نظر." });
    }
  };

  const handleDelete = async (c: ArticleCommentDisplayItem) => {
    const id = c.id;
    if (id == null) return;
    const isJustSubmitted = String(id).startsWith("new-");
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return;
    setActionMessage(null);
    if (isJustSubmitted) {
      setJustSubmitted((prev) => prev.filter((x) => x.id !== id));
      setActionMessage({ type: "success", text: "نظر حذف شد." });
      setTimeout(() => setActionMessage(null), 3000);
      return;
    }
    setDeleteId(id);
    const result = await deleteArticleComment(articleId, id);
    setDeleteId(null);
    if (result.ok) {
      setDeletedIds((prev) => new Set(prev).add(String(id)));
      setActionMessage({ type: "success", text: "نظر حذف شد." });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({ type: "error", text: result.message ?? "خطا در حذف نظر." });
    }
  };

  const authNext = pathname ? `/auth?next=${encodeURIComponent(pathname)}` : "/auth";

  return (
    <div className="mt-10 space-y-8">
      {/* فرم ارسال دیدگاه */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold mb-6" style={{ color: "#1a3760" }}>
          دیدگاه خود را بنویسید
        </h3>

        {!isLoggedIn ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5 text-right">
            <p className="text-sm text-amber-800 mb-3">
              برای ثبت دیدگاه باید وارد حساب کاربری شوید یا ثبت‌نام کنید.
            </p>
            <Link
              href={authNext}
              className="inline-flex items-center justify-center rounded-lg bg-[#ff5538] text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ورود / ثبت‌نام
            </Link>
          </div>
        ) : (
          <>
        {message && (
          <div
            className={`rounded-lg border p-4 text-sm mb-4 ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                نام شما
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all text-sm"
                placeholder="نام خود را وارد کنید"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل شما
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all text-sm"
                placeholder="ایمیل خود را وارد کنید"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              دیدگاه شما
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all resize-none text-sm"
              placeholder="دیدگاه خود را بنویسید..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff5538] to-[#ff7744] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-300 hover:scale-[1.02] text-sm disabled:opacity-70 disabled:pointer-events-none disabled:hover:scale-100"
          >
            {submitting ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>ارسال دیدگاه</span>
                <HiArrowLeft className="rotate-180 text-sm" />
              </>
            )}
          </button>
        </form>
        </>
        )}
      </div>

      {/* لیست دیدگاه‌ها */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: "#1a3760" }}>
          دیدگاه‌ها
        </h3>

        {actionMessage && (
          <p
            className={`text-sm mb-4 ${actionMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {actionMessage.text}
          </p>
        )}

        {commentsLoading ? (
          <div className="flex justify-center py-8">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#ff5538]/30 border-t-[#ff5538]" />
          </div>
        ) : visibleComments.length === 0 ? (
          <p className="text-gray-500 text-sm">هنوز دیدگاهی ثبت نشده است.</p>
        ) : (
          <ul className="space-y-4">
            {visibleComments.map((c, i) => {
              const isEditing = editingId === (c.id ?? null);
              const isDeleting = deleteId === c.id;
              const canEditDelete = isMyComment(c);
              return (
                <li
                  key={String(c.id ?? i)}
                  className="border border-gray-100 rounded-xl p-4 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-medium text-gray-900">{c.author || "کاربر"}</span>
                    <span className="text-xs text-gray-500">{formatCommentDate(c.date)}</span>
                  </div>
                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm text-right resize-none"
                        placeholder="متن نظر..."
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(c)}
                          className="text-sm bg-[#ff5538] text-white px-3 py-1.5 rounded-lg hover:opacity-90"
                        >
                          ذخیره
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300"
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {localEdits[String(c.id)] ?? c.content ?? ""}
                      </p>
                      {canEditDelete && (
                        <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(c)}
                            className="text-xs text-[#ff5538] hover:underline"
                          >
                            ویرایش
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(c)}
                            disabled={isDeleting}
                            className="text-xs text-red-600 hover:underline disabled:opacity-50"
                          >
                            {isDeleting ? "در حال حذف..." : "حذف"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
