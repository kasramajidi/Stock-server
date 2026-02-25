"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { RefreshCw, Trash2, Plus } from "lucide-react";

const RECOMMENDED = "حدود ۴۰۰ × ۲۰۰";
const RECOMMENDED_EN = "~400 × 200 px";

interface PromoGridBanner {
  id: string;
  position: number;
  imageUrl: string;
  alt: string | null;
  link: string | null;
  createdAt: string;
}

export default function AdminPromoGridBannersPage() {
  const [banners, setBanners] = useState<PromoGridBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [forms, setForms] = useState<Record<number, { imageUrl: string; alt: string; link: string }>>({});
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [openAddSlot, setOpenAddSlot] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ imageUrl: "", alt: "", link: "" });

  const load = useCallback(() => {
    setLoading(true);
    adminFetch<{ banners?: PromoGridBanner[] }>("/api/admin/promo-grid-banners")
      .then(({ data, ok }) => {
        if (ok && data?.banners) {
          setBanners(data.banners);
          const next: Record<number, { imageUrl: string; alt: string; link: string }> = {};
          data.banners.forEach((b) => {
            next[b.position] = {
              imageUrl: b.imageUrl,
              alt: b.alt ?? "",
              link: b.link ?? "",
            };
          });
          setForms(next);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getBannerByPosition = (pos: number) => banners.find((b) => b.position === pos);
  const getAllPositions = () => {
    const fromBanners = banners.map((b) => b.position);
    const base = [1, 2, 3];
    const withOpen = openAddSlot ? [...base, ...fromBanners, openAddSlot] : [...base, ...fromBanners];
    return [...new Set(withOpen)].sort((a, b) => a - b);
  };
  const getNextPosition = () =>
    banners.length > 0 ? Math.max(...banners.map((b) => b.position)) + 1 : 1;

  const handleSave = async (position: number) => {
    const form = forms[position] ?? { imageUrl: "", alt: "", link: "" };
    const url = form.imageUrl.trim();
    if (!url) {
      setErrors(["آدرس تصویر الزامی است."]);
      return;
    }
    setErrors([]);
    setSaving(position);
    try {
      const res = await fetch("/api/admin/promo-grid-banners", {
        method: "POST",
        credentials: "include",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          position,
          imageUrl: url,
          alt: form.alt.trim() || undefined,
          link: form.link.trim() || undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success) {
        load();
        setOpenAddSlot(null);
      } else {
        setErrors(Array.isArray(json.errors) ? json.errors : ["خطا در ذخیره."]);
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setSaving(null);
    }
  };

  const handleUpdate = async (position: number) => {
    const banner = getBannerByPosition(position);
    if (!banner) return;
    const url = editForm.imageUrl.trim();
    if (!url) {
      setErrors(["آدرس تصویر الزامی است."]);
      return;
    }
    setErrors([]);
    setSaving(position);
    try {
      const res = await fetch(`/api/admin/promo-grid-banners/${banner.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: url,
          alt: editForm.alt.trim() || null,
          link: editForm.link.trim() || null,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (json.success) {
        load();
        setEditingSlot(null);
      } else {
        setErrors(Array.isArray(json.errors) ? json.errors : ["خطا در ویرایش."]);
      }
    } catch {
      setErrors(["خطا در ارتباط با سرور."]);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (position: number) => {
    const banner = getBannerByPosition(position);
    if (!banner) return;
    if (!confirm(`آیا از حذف بنر اسلات ${position} مطمئن هستید؟`)) return;
    setDeleting(banner.id);
    try {
      const res = await fetch(`/api/admin/promo-grid-banners/${banner.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        load();
        setForms((p) => ({ ...p, [position]: { imageUrl: "", alt: "", link: "" } }));
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

  const startEdit = (pos: number) => {
    const b = getBannerByPosition(pos);
    if (!b) return;
    setEditingSlot(pos);
    setOpenAddSlot(null);
    setEditForm({
      imageUrl: b.imageUrl,
      alt: b.alt ?? "",
      link: b.link ?? "",
    });
  };

  const openAddForm = (pos: number) => {
    setOpenAddSlot(pos);
    setEditingSlot(null);
    setForms((p) => ({ ...p, [pos]: { imageUrl: "", alt: "", link: "" } }));
  };

  const openAddNewSlide = () => {
    const next = getNextPosition();
    openAddForm(next);
  };

  const closeAddForm = () => {
    setOpenAddSlot(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
      <div className="max-w-4xl mx-auto w-full min-w-0" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">بنرهای گرید وسط</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">افزودن اسلایدهای بیشتر با دکمه +</p>
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
            اندازه پیشنهادی: <strong>{RECOMMENDED}</strong>. مسیر لوکال: <code className="bg-amber-600/20 px-1 rounded">/Images/Baner/</code>
          </p>
          <p className="text-amber-700 dark:text-amber-300/90 text-xs mt-1">Recommended: {RECOMMENDED_EN}</p>
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
          <div className="grid gap-6 sm:grid-cols-3">
            {getAllPositions().map((pos) => {
              const banner = getBannerByPosition(pos);
              const form = forms[pos] ?? { imageUrl: "", alt: "", link: "" };
              const setForm = (fn: (p: typeof form) => typeof form) =>
                setForms((prev) => ({ ...prev, [pos]: fn(prev[pos]) }));

              return (
                <div
                  key={pos}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/30 p-4 sm:p-5"
                >
                  <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <span className="inline-flex justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-bold">
                      {pos}
                    </span>
                    اسلات {pos}
                  </h2>

                  {editingSlot === pos && banner ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">آدرس تصویر *</label>
                          <input
                            type="text"
                            value={editForm.imageUrl}
                            onChange={(e) => setEditForm((p) => ({ ...p, imageUrl: e.target.value }))}
                            placeholder="/Images/Baner/Layer 5.png"
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">alt</label>
                          <input
                            type="text"
                            value={editForm.alt}
                            onChange={(e) => setEditForm((p) => ({ ...p, alt: e.target.value }))}
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">لینک</label>
                          <input
                            type="text"
                            value={editForm.link}
                            onChange={(e) => setEditForm((p) => ({ ...p, link: e.target.value }))}
                            placeholder="/shop یا https://..."
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => handleUpdate(pos)}
                          disabled={saving !== null}
                          className="flex-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-3 py-2 text-sm disabled:opacity-50"
                        >
                          {saving === pos ? "..." : "ذخیره"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSlot(null)}
                          className="rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          انصراف
                        </button>
                      </div>
                    </>
                  ) : banner ? (
                    <>
                      <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 mb-3">
                        <Image src={banner.imageUrl} alt={banner.alt ?? ""} fill className="object-cover" sizes="300px" unoptimized />
                      </div>
                      {banner.link && (
                        <p className="text-xs text-slate-500 truncate mb-3">لینک: {banner.link}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(pos)}
                          className="flex-1 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/30"
                        >
                          ویرایش
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(pos)}
                          disabled={deleting === banner.id}
                          className="flex items-center justify-center gap-1 rounded-lg border border-red-500/40 bg-red-500/20 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                          title="حذف بنر"
                        >
                          <Trash2 className="h-4 w-4" />
                          حذف
                        </button>
                      </div>
                    </>
                  ) : openAddSlot === pos ? (
                    <>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">آدرس تصویر *</label>
                          <input
                            type="text"
                            value={form.imageUrl}
                            onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                            placeholder="/Images/Baner/Layer 5.png"
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">alt</label>
                          <input
                            type="text"
                            value={form.alt}
                            onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
                            placeholder="بنر تبلیغاتی"
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">لینک</label>
                          <input
                            type="text"
                            value={form.link}
                            onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
                            placeholder="/shop"
                            className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => handleSave(pos)}
                          disabled={saving !== null}
                          className="flex-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2.5 text-sm disabled:opacity-50"
                        >
                          {saving === pos ? "در حال ذخیره..." : "ذخیره بنر"}
                        </button>
                        <button
                          type="button"
                          onClick={closeAddForm}
                          className="rounded-lg border border-slate-400 px-3 py-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          انصراف
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAddForm(pos)}
                      className="w-full rounded-lg border-2 border-dashed border-slate-400 dark:border-slate-600 py-8 text-slate-500 dark:text-slate-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
                    >
                      افزودن بنر
                    </button>
                  )}
                </div>
              );
            })}
            {/* باکس + برای افزودن اسلاید جدید */}
            <div
              className="rounded-xl border-2 border-dashed border-slate-400 dark:border-slate-600 bg-slate-100/30 dark:bg-slate-800/20 p-4 sm:p-5 flex flex-col items-center justify-center min-h-[200px]"
              role="button"
              tabIndex={0}
              onClick={openAddNewSlide}
              onKeyDown={(e) => e.key === "Enter" && openAddNewSlide()}
            >
              <Plus className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-2" />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                افزودن اسلاید
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
