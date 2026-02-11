"use client";

import React, { useState, useEffect } from "react";
import { getArticleCategories } from "../lib/article-api";
import RichTextEditor from "./RichTextEditor";

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function legacyContentToHtml(text: string): string {
  if (!text.trim()) return "";
  return text
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const t = line.trim();
      if (/^(https?:\/\/|data:image\/)/i.test(t)) return `<p><img src="${escapeHtml(t)}" alt="" /></p>`;
      return "<p>" + escapeHtml(t) + "</p>";
    })
    .join("");
}

export interface RelatedServiceForm {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ArticleFormData {
  title: string;
  category: string;
  content?: string;
  status?: string;
  slug?: string;
  image?: string;
  date?: string;
  headings?: string;
  relatedService?: RelatedServiceForm;
}

interface ArticleFormProps {
  /** دسته‌بندی‌های داینامیک از مقالات API (همان صفحه سایت) */
  categories?: string[];
  article?: {
    id: string;
    title: string;
    category: string;
    content?: string;
    status: string;
    slug?: string;
    image?: string;
    date?: string;
    headings?: string;
    relatedService?: RelatedServiceForm;
  };
  onClose: () => void;
  onSave: (article: ArticleFormData) => void;
}

export default function ArticleForm({
  categories = [],
  article,
  onClose,
  onSave,
}: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || "",
    category: article?.category || "",
    content: article?.content || "",
    status: article?.status || "پیش‌نویس",
    slug: article?.slug ?? "",
    image: article?.image ?? "/Images/Shop/product-pic1.jpg",
    date: article?.date ?? "",
    headings: article?.headings ?? "",
    relatedService: article?.relatedService,
  });
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getArticleCategories()
      .then((list) => {
        if (!cancelled) setApiCategories(list);
      })
      .finally(() => {
        if (!cancelled) setCategoriesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isAddMode = !article;

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(isAddMode ? { slug: title.replace(/\s+/g, "-") } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryToSave = (formData.category ?? "").trim();
    if (!categoryToSave) {
      alert("لطفاً دسته‌بندی را پر کنید.");
      return;
    }
    if (!(formData.title ?? "").trim()) {
      alert("لطفاً عنوان مقاله را وارد کنید.");
      return;
    }
    const contentTrimmed = (formData.content ?? "").trim();
    if (!contentTrimmed || contentTrimmed === "<p></p>") {
      alert("لطفاً محتوا را وارد کنید.");
      return;
    }
    onSave({ ...formData, category: categoryToSave });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-medium text-gray-900">
            {article ? "ویرایش مقاله" : "افزودن مقاله جدید (POST)"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عنوان مقاله <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          {/* اسلاگ، تصویر، تاریخ — هم برای افزودن هم برای ویرایش (PATCH) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              اسلاگ (برای آدرس)
            </label>
            <input
              type="text"
              value={formData.slug ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="مثال: راهنمای-کامل-خرید-گیفت-کارت"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              مسیر تصویر
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.image ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="/Images/Shop/product-pic1.jpg یا URL"
                className="flex-1 w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/30 focus:border-[#ff5538] transition-all text-sm"
              />
              <label className="shrink-0 inline-flex items-center gap-1 px-3 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer text-sm font-medium text-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                آپلود
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await readFileAsDataUrl(file);
                        setFormData((prev) => ({ ...prev, image: dataUrl }));
                      } catch {
                        // ignore
                      }
                      e.target.value = "";
                    }
                  }}
                />
              </label>
            </div>
            {(formData.image ?? "").startsWith("data:") && (
              <div className="mt-2">
                <img
                  src={formData.image!}
                  alt="پیش‌نمایش"
                  className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              تاریخ (اختیاری)
            </label>
            <input
              type="text"
              value={formData.date ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              placeholder="مثال: 24 ژانویه 2026"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              دسته‌بندی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              list="article-categories-list"
              value={formData.category ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="نام دسته را وارد کنید (با افزودن مقاله در سایت هم ظاهر می‌شود)"
              className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/30 focus:border-[#ff5538] transition-all text-sm"
            />
            {!categoriesLoading && apiCategories.length > 0 && (
              <datalist id="article-categories-list">
                {apiCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              محتوا (مثل Word: جدول، لینک، تصویر، لیست) <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              key={article?.id ?? "new"}
              value={
                (formData.content ?? "").trim().startsWith("<")
                  ? (formData.content ?? "")
                  : (formData.content ?? "").trim()
                    ? legacyContentToHtml(formData.content ?? "")
                    : ""
              }
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
              placeholder="محتوا را اینجا بنویسید… از نوار بالا جدول، لینک و تصویر اضافه کنید."
              minHeight="320px"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عناوین (headings) — هر خط یک عنوان
            </label>
            <textarea
              rows={4}
              value={formData.headings ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, headings: e.target.value })
              }
              placeholder="گیفت کارت چیست؟&#10;انواع گیفت کارت&#10;..."
              className="w-full bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
            />
          </div>
          {isAddMode && (
            <>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">سرویس مرتبط (relatedService) — اختیاری</p>
                <input
                  type="text"
                  value={formData.relatedService?.title ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: e.target.value,
                        description: formData.relatedService?.description ?? "",
                        image: formData.relatedService?.image ?? "",
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="عنوان (مثلاً: فروشگاه گیفت کارت)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.description ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: e.target.value,
                        image: formData.relatedService?.image ?? "",
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="توضیح (مثلاً: خرید انواع گیفت کارت...)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.image ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: formData.relatedService?.description ?? "",
                        image: e.target.value,
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="مسیر تصویر (مثلاً: /Images/shop-banner.jpg)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.link ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: formData.relatedService?.description ?? "",
                        image: formData.relatedService?.image ?? "",
                        link: e.target.value,
                      },
                    })
                  }
                  placeholder="لینک (مثلاً: /shop)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
              </div>
            </>
          )}
          {!isAddMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                وضعیت
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
              >
                <option value="پیش‌نویس">پیش‌نویس</option>
                <option value="منتشر شده">منتشر شده</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

