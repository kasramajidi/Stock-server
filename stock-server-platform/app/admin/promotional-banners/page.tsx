"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { RefreshCw, Trash2 } from "lucide-react";

const RECOMMENDED = "۱۲۰۰ × ۳۰۰";
const RECOMMENDED_EN = "1200 × 300";

interface PromoBanner {
  id: string;
  position: "left" | "right";
  imageUrl: string;
  alt: string | null;
  link: string | null;
  createdAt: string;
}

const POSITION_LABEL: Record<string, string> = { left: "سمت چپ", right: "سمت راست" };

export default function AdminPromotionalBannersPage() {
  const [banners, setBanners] = useState<PromoBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [formLeft, setFormLeft] = useState({ imageUrl: "", alt: "", link: "" });
  const [formRight, setFormRight] = useState({ imageUrl: "", alt: "", link: "" });

  const load = useCallback(() => {
    setLoading(true);
    adminFetch<{ banners?: PromoBanner[] }>("/api/admin/promotional-banners")
      .then(({ data, ok }) => {
        if (ok && data?.banners) {
          setBanners(data.banners);
          data.banners.forEach((b) => {
            const f = { imageUrl: b.imageUrl, alt: b.alt ?? "", link: b.link ?? "" };
            if (b.position === "left") setFormLeft(f);
            else if (b.position === "right") setFormRight(f);
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (position: "left" | "right") => {
    const form = position === "left" ? formLeft : formRight;
    const url = form.imageUrl.trim();
    if (!url) {
      setErrors(["آدرس تصویر الزامی است."]);
      return;
    }
    setErrors([]);
    setSaving(position);
    try {
      const res = await fetch("/api/admin/promotional-banners", {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          position,
          imageUrl: url,
          alt: form.alt.trim() || undefined,
          link: form.link.trim() || undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success && json.banner) {
        setBanners((prev) => {
          const others = prev.filter((b) => b.position !== position);
          const sorted = [...others, json.banner].sort((a, b) =>
            (a.position === "left" ? 0 : 1) - (b.position === "left" ? 0 : 1)
          );
          return sorted;
        });
      } else {
        setErrors(Array.isArray(json.errors) ? json.errors : ["خطا در ذخیره."]);
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (position: "left" | "right") => {
    const current = position === "left" ? currentLeft : currentRight;
    if (!current) return;
    if (!confirm(`آیا از حذف بنر ${POSITION_LABEL[position]} مطمئن هستید؟`)) return;
    setDeleting(position);
    try {
      const res = await fetch(`/api/admin/promotional-banners/${current.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== current.id));
        if (position === "left") setFormLeft({ imageUrl: "", alt: "", link: "" });
        else setFormRight({ imageUrl: "", alt: "", link: "" });
      } else {
        const json = await res.json().catch(() => ({}));
        setErrors(Array.isArray(json?.errors) ? json.errors : ["خطا در حذف."]);
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setDeleting(null);
    }
  };

  const currentLeft = banners.find((b) => b.position === "left");
  const currentRight = banners.find((b) => b.position === "right");

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
      <div className="max-w-4xl mx-auto w-full min-w-0" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">بنرهای چپ و راست</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مدیریت بنرهای تبلیغاتی کنار هم (سمت چپ و سمت راست)</p>
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
            عکس شما باید در اندازه <strong>{RECOMMENDED}</strong> پیکسل باشد. مسیر لوکال: <code className="bg-amber-600/20 px-1 rounded">/Images/PromotionalBanners/</code>
          </p>
          <p className="text-amber-700 dark:text-amber-300/90 text-xs mt-1">Recommended: {RECOMMENDED_EN} px</p>
        </div>

        {errors.length > 0 && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm p-3 mb-4">
            {errors.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {(["left", "right"] as const).map((pos) => {
              const form = pos === "left" ? formLeft : formRight;
              const setForm = pos === "left" ? setFormLeft : setFormRight;
              const current = pos === "left" ? currentLeft : currentRight;
              const label = POSITION_LABEL[pos];
              return (
                <div
                  key={pos}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 p-4 sm:p-5"
                >
                  <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                      {pos === "left" ? "چپ" : "راست"}
                    </span>
                    بنر {label}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">آدرس تصویر *</label>
                      <input
                        type="text"
                        value={form.imageUrl}
                        onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                        placeholder="/Images/PromotionalBanners/banner.png"
                        className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">متن جایگزین (alt)</label>
                      <input
                        type="text"
                        value={form.alt}
                        onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
                        placeholder="بنر تبلیغاتی"
                        className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">لینک کلیک (اختیاری)</label>
                      <input
                        type="url"
                        value={form.link}
                        onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    {current && (
                      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
                        <Image src={current.imageUrl} alt={current.alt ?? ""} fill className="object-cover" sizes="400px" unoptimized />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSave(pos)}
                        disabled={saving !== null}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2.5 disabled:opacity-50 transition-colors"
                      >
                        {saving === pos ? "در حال ذخیره..." : `ذخیره بنر ${label}`}
                      </button>
                      {current && (
                        <button
                          type="button"
                          onClick={() => handleDelete(pos)}
                          disabled={deleting !== null}
                          className="shrink-0 flex items-center justify-center gap-2 rounded-lg border border-red-400 text-red-600 dark:text-red-400 hover:bg-red-500/10 px-4 py-2.5 disabled:opacity-50 transition-colors"
                          title={`حذف بنر ${label}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
