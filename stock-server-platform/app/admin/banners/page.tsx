"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { RefreshCw, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";

const BANNER_RECOMMENDED = "۱۹۲۰ × ۴۸۰";
const BANNER_RECOMMENDED_EN = "1920 × 480";

interface Banner {
  id: string;
  imageUrl: string;
  alt: string | null;
  sortOrder: number;
  createdAt: string;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch<{ banners?: Banner[] }>("/api/admin/banners")
      .then(({ data, ok }) => {
        if (ok && data?.banners) setBanners(data.banners);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = imageUrl.trim();
    if (!url) {
      setErrors(["آدرس تصویر الزامی است."]);
      return;
    }
    setErrors([]);
    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/banners", {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify({ imageUrl: url, alt: alt.trim() || undefined }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.banner) {
        setBanners((prev) => [...prev, json.banner].sort((a, b) => a.sortOrder - b.sortOrder));
        setImageUrl("");
        setAlt("");
      } else {
        setErrors(Array.isArray(json.errors) ? json.errors : ["خطا در افزودن بنر."]);
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این بنر مطمئن هستید؟")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      } else {
        const json = await res.json().catch(() => ({}));
        alert(json?.errors?.[0] || "خطا در حذف.");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const moveBanner = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= banners.length) return;
    const reordered = [...banners];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    const order = reordered.map((b) => b.id);
    setActionLoading(banners[index].id);
    try {
      const res = await fetch("/api/admin/banners", {
        method: "PATCH",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify({ order }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.banners) {
        setBanners(json.banners);
      } else {
        alert(json?.errors?.[0] || "خطا در جابه‌جایی.");
      }
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
      <div className="max-w-4xl mx-auto w-full min-w-0" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">بنر اصلی صفحه</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مدیریت بنرهای اسلایدر بالای صفحه اصلی</p>
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

        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            عکس شما باید در اندازه <strong>{BANNER_RECOMMENDED}</strong> پیکسل (عرض × ارتفاع) باشد تا بنر به درستی نمایش داده شود.
          </p>
          <p className="text-amber-700 dark:text-amber-300/90 text-xs mt-1">
            Recommended size: {BANNER_RECOMMENDED_EN} px (width × height)
          </p>
          <p className="text-amber-700 dark:text-amber-300/90 text-xs mt-2">
            برای تصاویر لوکال: فایل را در <code className="bg-amber-600/20 px-1 rounded">public/Images/Baner/</code> قرار دهید و مسیر <code className="bg-amber-600/20 px-1 rounded">/Images/Baner/نام-فایل.png</code> را وارد کنید.
          </p>
        </div>

        <form onSubmit={handleAdd} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 p-4 sm:p-5 mb-6">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن بنر
          </h2>
          {errors.length > 0 && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm p-3 mb-3">
              {errors.map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">آدرس تصویر (URL یا مسیر لوکال) *</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/Images/Baner/banner.png یا https://..."
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">متن جایگزین (alt) — اختیاری</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="بنر تبلیغاتی"
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={addLoading}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2.5 disabled:opacity-50 transition-colors"
              >
                {addLoading ? "در حال افزودن..." : "افزودن بنر"}
              </button>
            </div>
          </div>
        </form>

        <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/30 dark:bg-slate-800/20 overflow-hidden">
          <div className="p-4 border-b border-slate-300 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">لیست بنرها (ترتیب نمایش)</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">با دکمه‌های بالا/پایین ترتیب را تغییر دهید</p>
          </div>
          {loading ? (
            <div className="p-8 flex justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : banners.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">هنوز بنری اضافه نشده است.</div>
          ) : (
            <div className="divide-y divide-slate-300 dark:divide-slate-700">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="flex items-center gap-3 sm:gap-4 p-4 hover:bg-slate-200/50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveBanner(index, "up")}
                      disabled={index === 0 || actionLoading !== null}
                      className="p-1 rounded text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="جابه‌جایی به بالا"
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBanner(index, "down")}
                      disabled={index === banners.length - 1 || actionLoading !== null}
                      className="p-1 rounded text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="جابه‌جایی به پایین"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative h-16 w-28 sm:h-20 sm:w-36 shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.alt ?? "بنر"}
                      fill
                      className="object-cover"
                      sizes="144px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate" title={banner.imageUrl}>
                      {banner.imageUrl}
                    </p>
                    {banner.alt && (
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{banner.alt}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(banner.id)}
                    disabled={actionLoading !== null}
                    className="shrink-0 p-2 rounded-lg text-red-600 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                    aria-label="حذف بنر"
                    title="حذف"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
