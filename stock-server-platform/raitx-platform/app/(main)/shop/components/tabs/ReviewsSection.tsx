"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StarRating from "../ui/StarRating";
import type { ShopProduct, UserCommentItem } from "../../lib/shop-api";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import {
  submitProductComment,
  updateProductComment,
  deleteProductComment,
} from "../../lib/shop-api";
import type { Product } from "../productsData";

type ProductLike = Product | ShopProduct;

const STORAGE_KEY = "shop_my_comment_emails";

function hasUserComments(p: ProductLike | null): p is ShopProduct {
  return p != null && "userComments" in p && Array.isArray((p as ShopProduct).userComments);
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

function getMyEmailsForProduct(productId: number | string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: { productId: string; email: string }[] = raw ? JSON.parse(raw) : [];
    return list.filter((e) => String(e.productId) === String(productId)).map((e) => e.email.trim().toLowerCase());
  } catch {
    return [];
  }
}

function addMyEmailForProduct(productId: number | string, email: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: { productId: string; email: string }[] = raw ? JSON.parse(raw) : [];
    const key = String(productId);
    const lower = email.trim().toLowerCase();
    if (!list.some((e) => e.productId === key && e.email.toLowerCase() === lower)) {
      list.push({ productId: key, email: email.trim() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch {
    // ignore
  }
}

interface ReviewsSectionProps {
  product: ProductLike | null;
}

const ReviewsSection = React.memo<ReviewsSectionProps>(({ product }) => {
  const pathname = usePathname();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  /** نظراتی که همین الان در این صفحه ثبت شده‌اند — بلافاصله نمایش داده می‌شوند */
  const [justSubmitted, setJustSubmitted] = useState<UserCommentItem[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [localEdits, setLocalEdits] = useState<Record<string, { content: string; rating: number }>>({});
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

  const fromProduct: UserCommentItem[] = hasUserComments(product) ? product.userComments! : [];
  const allComments = [...fromProduct, ...justSubmitted];
  const comments = allComments.filter((c) => {
    if (deletedIds.has(String(c.id))) return false;
    const s = (c.status ?? "").toString().toLowerCase();
    if (!s) return true;
    return s === "published" || s === "1" || s === "approved" || s === "تایید شده" || s === "pending";
  });
  const productName = product?.name ?? "این محصول";
  const myEmails = product?.id != null ? getMyEmailsForProduct(product.id) : [];

  const isMyComment = (c: UserCommentItem) => {
    const email = (c.userEmail ?? "").trim().toLowerCase();
    if (!email) return false;
    return myEmails.some((e) => e === email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;
    setSubmitMessage(null);
    setSubmitting(true);
    const authorVal = name.trim();
    const contentVal = comment.trim();
    const emailVal = email.trim();
    const ratingVal = rating;
    try {
      const result = await submitProductComment(product.id, {
        author: authorVal,
        email: emailVal,
        content: contentVal,
        rating: ratingVal,
      });
      if (result.ok) {
        addMyEmailForProduct(product.id, emailVal);
        setJustSubmitted((prev) => [
          ...prev,
          {
            id: `new-${Date.now()}`,
            author: authorVal,
            content: contentVal,
            rating: ratingVal,
            status: "pending",
            date: new Date().toISOString(),
            userEmail: emailVal,
          },
        ]);
        setSubmitMessage({ type: "success", text: "نظر شما ثبت شد و پس از تایید نمایش داده می‌شود." });
        setRating(0);
        setComment("");
        if (!saveInfo) {
          setName("");
          setEmail("");
        }
      } else {
        setSubmitMessage({ type: "error", text: result.message ?? "خطا در ثبت نظر." });
      }
    } catch {
      setSubmitMessage({ type: "error", text: "خطا در ارسال نظر. لطفاً دوباره تلاش کنید." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (c: UserCommentItem) => {
    setEditingId(c.id ?? null);
    setEditContent(c.content ?? "");
    setEditRating(typeof c.rating === "number" ? c.rating : 0);
    setActionMessage(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
    setEditRating(0);
    setActionMessage(null);
  };

  const handleSaveEdit = async (c: UserCommentItem) => {
    const id = c.id;
    if (id == null || !product?.id) return;
    const isJustSubmitted = String(id).startsWith("new-");
    setActionMessage(null);
    if (isJustSubmitted) {
      setJustSubmitted((prev) =>
        prev.map((x) =>
          x.id === id ? { ...x, content: editContent.trim(), rating: editRating } : x
        )
      );
      handleCancelEdit();
      return;
    }
    const emailForApi = ((c.userEmail ?? "").trim() || myEmails[0]) ?? "";
    if (!emailForApi) {
      setActionMessage({ type: "error", text: "امکان ویرایش این نظر از این دستگاه وجود ندارد." });
      return;
    }
    const result = await updateProductComment(product.id, id, {
      content: editContent.trim(),
      rating: editRating,
      userEmail: emailForApi,
    });
    if (result.ok) {
      setLocalEdits((prev) => ({ ...prev, [String(id)]: { content: editContent.trim(), rating: editRating } }));
      setActionMessage({ type: "success", text: "نظر ویرایش شد." });
      setTimeout(() => setActionMessage(null), 3000);
      handleCancelEdit();
    } else {
      setActionMessage({ type: "error", text: result.message ?? "خطا در ویرایش نظر." });
    }
  };

  const handleDelete = async (c: UserCommentItem) => {
    const id = c.id;
    if (id == null || !product?.id) return;
    const isJustSubmitted = String(id).startsWith("new-");
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return;
    setActionMessage(null);
    if (isJustSubmitted) {
      setJustSubmitted((prev) => prev.filter((x) => x.id !== id));
      return;
    }
    setDeleteId(id);
    const emailForApi = ((c.userEmail ?? "").trim() || myEmails[0]) ?? "";
    const result = await deleteProductComment(product.id, id, emailForApi);
    setDeleteId(null);
    if (result.ok) {
      setDeletedIds((prev) => new Set(prev).add(String(id)));
      setActionMessage({ type: "success", text: "نظر حذف شد." });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({ type: "error", text: result.message ?? "خطا در حذف نظر." });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <section
        className="bg-white rounded-2xl p-4 sm:p-6"
        aria-label="نظرات"
        itemScope
        itemType="https://schema.org/Review"
      >
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 text-center">
          نقد و بررسی ها
        </h3>
        {comments.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base" itemProp="reviewBody">
              هنوز نظری ثبت نشده است.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {actionMessage && (
              <li className="list-none">
                <p
                  className={`text-sm text-right ${actionMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
                >
                  {actionMessage.text}
                </p>
              </li>
            )}
            {comments.map((c, i) => {
              const isEditing = editingId === (c.id ?? null);
              const isDeleting = deleteId === c.id;
              const canEditDelete = isMyComment(c);
              return (
                <li
                  key={String(c.id ?? i)}
                  className="border border-gray-100 rounded-xl p-4 bg-gray-50/50"
                  itemProp="review"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-medium text-gray-900" itemProp="author">
                      {c.author ?? "کاربر"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatCommentDate(c.date)}
                    </span>
                  </div>
                  {!isEditing && (() => {
                    const r = localEdits[String(c.id)]?.rating ?? c.rating;
                    const ratingNum = typeof r === "number" ? r : 0;
                    return ratingNum > 0 ? (
                      <div className="flex gap-0.5 mb-2" aria-label={`امتیاز: ${ratingNum}`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= ratingNum ? "text-yellow-400" : "text-gray-200"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    ) : null;
                  })()}
                  {isEditing ? (
                    <div className="space-y-2 mt-2">
                      <StarRating rating={editRating} onRatingChange={setEditRating} />
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
                      <p className="text-sm text-gray-700 whitespace-pre-wrap" itemProp="reviewBody">
                        {localEdits[String(c.id)]?.content ?? c.content ?? ""}
                      </p>
                      {(c.reply ?? "").trim() && (
                        <div className="mt-3 pr-3 border-r-2 border-[#ff5538]/40 bg-[#f6f5ff]/60 rounded-lg p-2 text-sm text-gray-700 whitespace-pre-wrap">
                          <span className="font-medium text-[#ff5538] text-xs block mb-1">پاسخ فروشگاه:</span>
                          {c.reply}
                        </div>
                      )}
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
      </section>

      <section className="bg-white rounded-2xl p-4 sm:p-6" aria-label="فرم ثبت نظر">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 text-right">
          اولین نفری باشید که نظر می‌دهید
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-right">
          &quot;{productName}&quot;
        </p>
        {!isLoggedIn ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5 text-right">
            <p className="text-sm text-amber-800 mb-3">
              برای ثبت نظر در فروشگاه باید وارد حساب کاربری شوید یا ثبت‌نام کنید.
            </p>
            <Link
              href={pathname ? `/auth?next=${encodeURIComponent(pathname)}` : "/auth"}
              className="inline-flex items-center justify-center rounded-lg bg-[#ff5538] text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ورود / ثبت‌نام
            </Link>
          </div>
        ) : (
          <>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 text-right">
          آدرس ایمیل شما منتشر نخواهد شد. فیلدهای الزامی با علامت * مشخص شده‌اند.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} aria-label="فرم ثبت نظر">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-2 text-right"
            >
              امتیاز شما *
            </label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              دیدگاه شما *
            </label>
            <textarea
              id="comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="نظر خود را بنویسید..."
              className="w-full h-32 p-3 bg-[#f6f5ff] rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              نام *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خود را وارد کنید"
              className="w-full p-3 bg-[#f6f5ff] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              ایمیل *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              className="w-full p-3 bg-[#f6f5ff] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <input
              type="checkbox"
              id="saveInfo"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="w-4 h-4 text-[#ff5538] bg-gray-100 border-gray-300 rounded focus:ring-[#ff5538]"
            />
            <label htmlFor="saveInfo" className="text-sm text-gray-600">
              نام، ایمیل و وب‌سایت من را در این مرورگر برای دفعه بعدی که نظر می‌دهم ذخیره کن.
            </label>
          </div>

          {submitMessage && (
            <p
              className={`text-sm text-right ${
                submitMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ff5538] text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? "در حال ثبت..." : "ثبت"}
          </button>
        </form>
        </>
        )}
      </section>
    </div>
  );
});

ReviewsSection.displayName = "ReviewsSection";

export default ReviewsSection;
