"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Pencil, ArrowRight } from "lucide-react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";

interface ProductForm {
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  brand: string;
  priceLabel: string;
  price: string | number;
  originalPrice: string | number;
  statusLabel: string;
  inStock: boolean;
  image: string;
  offerDiscountPercent: string | number;
}

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>({
    slug: "",
    title: "",
    shortDescription: "",
    content: "",
    category: "",
    brand: "",
    priceLabel: "برای استعلام موجودی تماس بگیرید",
    price: "",
    originalPrice: "",
    statusLabel: "آماده ارسال",
    inStock: true,
    image: "",
    offerDiscountPercent: "",
  });

  useEffect(() => {
    if (!fetching && typeof window !== "undefined" && window.location.hash === "#offer") {
      setTimeout(() => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [fetching]);

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    adminFetch<{ product?: ProductForm & { inStock: boolean } }>(`/api/products/${id}`)
      .then(({ data, ok }) => {
        if (ok && data?.product) {
          const p = data.product;
          setForm({
            slug: p.slug ?? "",
            title: p.title ?? "",
            shortDescription: p.shortDescription ?? "",
            content: p.content ?? "",
            category: p.category ?? "",
            brand: p.brand ?? "",
            priceLabel: p.priceLabel ?? "",
            price: (p as { price?: number | null }).price ?? "",
            originalPrice: (p as { originalPrice?: number | null }).originalPrice ?? "",
            statusLabel: p.statusLabel ?? "",
            inStock: p.inStock ?? true,
            image: p.image ?? "",
            offerDiscountPercent: (p as { offerDiscountPercent?: number | null }).offerDiscountPercent ?? "",
          });
        } else setError("محصول یافت نشد.");
      })
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
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
        price: form.price !== "" ? Number(form.price) : null,
        originalPrice: form.originalPrice !== "" ? Number(form.originalPrice) : null,
        statusLabel: form.statusLabel.trim(),
        inStock: form.inStock,
        image: form.image.trim() || undefined,
        offerDiscountPercent:
          form.offerDiscountPercent !== "" && form.offerDiscountPercent != null
            ? Math.min(100, Math.max(0, Number(form.offerDiscountPercent)))
            : null,
      };
      const headers = getAuthHeaders();
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        let errMsg = "خطا در بروزرسانی محصول.";
        if (res.status === 401) {
          errMsg = "لطفاً دوباره وارد شوید. (توکن منقضی یا نامعتبر)";
        } else if (res.status === 403) {
          errMsg = "دسترسی غیرمجاز. فقط ادمین می‌تواند ویرایش کند.";
        } else if (res.status === 500) {
          errMsg = "خطای سرور. اگر migration جدیدی اضافه شده، npx prisma migrate dev را اجرا کنید.";
        } else if (Array.isArray(data.errors) && data.errors.length > 0) {
          errMsg = data.errors.join(" — ");
        }
        setError(errMsg);
        document.getElementById("form-error")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push("/admin/products");
    } catch (err) {
      console.error("Product save error:", err);
      setError("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/admin/products" className="text-cyan-400 hover:underline">
          بازگشت به لیست محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
      <div className="max-w-2xl mx-auto" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">ویرایش محصول</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{form.title || "در حال بارگذاری..."}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 p-6 space-y-4">
          {error && (
            <div id="form-error" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
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
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">slug</label>
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
              placeholder="توضیحات کامل (متن، لینک، تصویر، جدول)..."
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
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
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
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
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
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">قیمت فعلی (تومان) — برای آفر</label>
              <input
                type="number"
                name="price"
                min={0}
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
                placeholder="مثلاً 1499000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">قیمت قبل تخفیف (تومان) — اختیاری</label>
              <input
                type="number"
                name="originalPrice"
                min={0}
                value={form.originalPrice}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
                placeholder="برای نمایش خط خورده"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">وضعیت ارسال *</label>
            <input
              type="text"
              name="statusLabel"
              value={form.statusLabel}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">آدرس تصویر (اختیاری)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100"
              placeholder="https://..."
            />
          </div>

          <div id="offer">
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">درصد تخفیف آفر (اختیاری)</label>
            <input
              type="number"
              name="offerDiscountPercent"
              min={0}
              max={100}
              value={form.offerDiscountPercent}
              onChange={handleChange}
              className="w-full max-w-[120px] rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="مثلاً ۲۰"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">اگر مقدار بدهید، در بخش آفرهای ویژه نمایش داده می‌شود. خالی = بدون آفر.</p>
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
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
            <Link
              href="/admin/products"
              className="rounded-lg bg-slate-400 dark:bg-slate-600 px-5 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-500 inline-flex items-center gap-2"
            >
              انصراف
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
