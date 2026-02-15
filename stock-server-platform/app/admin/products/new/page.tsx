"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PackagePlus } from "lucide-react";
import { getAuthHeaders } from "@/lib/admin-api";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    shortDescription: "",
    content: "",
    category: "",
    brand: "",
    priceLabel: "برای استعلام موجودی تماس بگیرید",
    statusLabel: "آماده ارسال",
    inStock: true,
    image: "",
  });

  const slugFromTitle = (title: string) => title.trim().replace(/\s+/g, "-");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title") {
        next.slug = slugFromTitle(value);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.content.trim()) {
      setError("محتوا / توضیحات الزامی است.");
      return;
    }
    setLoading(true);
    try {
      const body = {
        slug: form.slug.trim() || form.title.trim().replace(/\s+/g, "-"),
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        content: form.content.trim(),
        category: form.category.trim(),
        brand: form.brand.trim(),
        priceLabel: form.priceLabel.trim(),
        statusLabel: form.statusLabel.trim(),
        inStock: form.inStock,
        image: form.image.trim() || undefined,
      };
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(Array.isArray(data.errors) && data.errors[0] ? data.errors[0] : "خطا در ثبت محصول.");
        return;
      }
      router.push("/admin/products");
    } catch {
      setError("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-6xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <PackagePlus className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">محصول درست کردن</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">افزودن محصول جدید به فروشگاه</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 p-6 sm:p-8 space-y-4">
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">عنوان محصول *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="عنوان محصول"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">slug (اختیاری — در صورت خالی بودن از عنوان ساخته می‌شود)</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="نامک-url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">معرفی کوتاه *</label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
              rows={2}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="یک خط معرفی"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">محتوا / توضیحات *</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
              placeholder="توضیحات کامل (می‌تواند شامل متن، لینک، تصویر و جدول باشد)..."
              minHeight="280px"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">دسته‌بندی *</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
                placeholder="مثلاً سرور"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">برند *</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
                placeholder="نام برند"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">متن قیمت *</label>
            <input
              type="text"
              name="priceLabel"
              value={form.priceLabel}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="مثلاً برای استعلام موجودی تماس بگیرید"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">وضعیت ارسال *</label>
            <input
              type="text"
              name="statusLabel"
              value={form.statusLabel}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="مثلاً آماده ارسال"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">آدرس تصویر (اختیاری)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="rounded border-slate-400 dark:border-slate-600 bg-slate-300 dark:bg-slate-700 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">موجود در انبار</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "ثبت محصول"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="rounded-lg bg-slate-400 dark:bg-slate-600 px-5 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-500"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
