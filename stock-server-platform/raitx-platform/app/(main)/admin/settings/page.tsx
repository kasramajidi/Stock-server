"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 text-right focus:bg-white focus:border-[#ff5538] focus:outline-none focus:ring-2 focus:ring-[#ff5538]/10";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {hint && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}

const quickLinks = [
  { label: "داشبورد", href: "/admin" },
  { label: "مقالات", href: "/admin/articles" },
  { label: "محصولات", href: "/admin/products" },
  { label: "سفارشات", href: "/admin/orders" },
];

const settingsStats = [
  { title: "تنظیمات سایت", value: "فعال", icon: "⚙️", color: "bg-gray-100 text-gray-700" },
  { title: "لینک‌های سریع", value: quickLinks.length, icon: "🔗", color: "bg-blue-50 text-blue-600" },
  { title: "بخش‌های پنل", value: "۱۰", icon: "📋", color: "bg-violet-50 text-violet-600" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "ريتكس",
    siteDescription: "خدمات ارزی و پرداخت ارزی",
    email: "support@mrpremiumhub.org",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">
        {/* محتوای اصلی */}
        <div className="min-w-0">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
            تنظیمات
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            تنظیمات عمومی و ارتباطی سایت را مدیریت کنید.
          </p>
          <div className="mt-4">
            <AdminStatsCards items={settingsStats} />
          </div>
        </div>

        <div className="space-y-6">
          {/* تنظیمات عمومی */}
          <section className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538]/10 text-[#ff5538] text-sm font-medium">
                  ⚙
                </span>
                <h2 className="text-sm font-semibold text-gray-900">
                  تنظیمات عمومی
                </h2>
              </div>
            </div>
            <div className="p-5 sm:p-6 space-y-5">
              <Field label="نام سایت" hint="در هدر و عنوان صفحات نمایش داده می‌شود.">
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  placeholder="مثال: ريتكس"
                  className={inputBase}
                />
              </Field>
              <Field label="توضیحات سایت" hint="برای سئو و شبکه‌های اجتماعی استفاده می‌شود.">
                <textarea
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      siteDescription: e.target.value,
                    })
                  }
                  placeholder="یک خط درباره فعالیت سایت..."
                  className={`${inputBase} resize-none`}
                />
              </Field>
            </div>
          </section>

          {/* تماس و پشتیبانی */}
          <section className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/30">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538]/10 text-[#ff5538] text-sm font-medium">
                  ✉
                </span>
                <h2 className="text-sm font-semibold text-gray-900">
                  تماس و پشتیبانی
                </h2>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <Field label="آدرس ایمیل" hint="برای فرم تماس و نمایش در فوتر.">
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  placeholder="support@example.com"
                  className={inputBase}
                />
              </Field>
            </div>
          </section>

          {/* دکمه ذخیره */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <p className="text-xs text-gray-400">
              پس از اعمال تغییرات، دکمه ذخیره را بزنید.
            </p>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-sm text-emerald-600 font-medium">
                  ذخیره شد.
                </span>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-[#ff5538] px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-[#ff5538]/20 hover:bg-[#ff5538]/95 hover:shadow transition-all duration-200"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* ستون کناری */}
        <aside className="hidden lg:block space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* پیش‌نمایش */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/30">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  پیش‌نمایش
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">عنوان صفحه</p>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {settings.siteName || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">توضیح کوتاه</p>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {settings.siteDescription || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">ایمیل تماس</p>
                  <p className="text-xs text-gray-700 truncate">
                    {settings.email || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* دسترسی سریع */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/30">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  دسترسی سریع
                </h3>
              </div>
              <nav className="p-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}
