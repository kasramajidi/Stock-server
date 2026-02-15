"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Newspaper, Plus } from "lucide-react";
import { getAuthHeaders } from "@/lib/admin-api";
import { RichTextEditor } from "@/components/Admin/RichTextEditor";

export default function AdminNewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    excerpt: "",
    content: "",
    tagsInput: "", // comma-separated در ارسال به آرایه تبدیل می‌شود
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.content.trim()) {
      setError("محتوا الزامی است.");
      return;
    }
    if (!form.excerpt.trim()) {
      setError("متن معرفی (خلاصه) الزامی است.");
      return;
    }
    setLoading(true);
    try {
      const tags = form.tagsInput
        .split(/[,،]/)
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 20);
      const body = {
        title: form.title.trim(),
        category: form.category.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        image: form.image.trim() || undefined,
        tags,
      };
      const res = await fetch("/api/articles", {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(Array.isArray(data.errors) && data.errors[0] ? data.errors[0] : "خطا در ثبت مقاله.");
        return;
      }
      router.push("/admin/articles");
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
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">افزودن مقاله</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">مقاله جدید برای بلاگ</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 p-6 sm:p-8 space-y-4">
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">عنوان مقاله *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={300}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="عنوان مقاله"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">دسته‌بندی *</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="مثلاً اخبار، آموزش"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">متن معرفی (خلاصه) *</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              maxLength={1000}
              rows={3}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="یک یا دو پاراگراف برای معرفی مقاله"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">محتوا *</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
              placeholder="متن کامل مقاله (می‌تواند شامل فرمت، لینک، تصویر و جدول باشد)..."
              minHeight="280px"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">برچسب‌ها (اختیاری)</label>
            <input
              type="text"
              name="tagsInput"
              value={form.tagsInput}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              placeholder="با کاما جدا کنید، مثلاً: سرور, هاست, امنیت"
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

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              {loading ? "در حال ثبت..." : "ثبت مقاله"}
            </button>
            <Link
              href="/admin/articles"
              className="rounded-lg bg-slate-400 dark:bg-slate-600 px-5 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-500 transition-colors"
            >
              انصراف
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
