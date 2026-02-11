"use client";

import { HiCheckCircle } from "react-icons/hi";

const featuresRight = [
  "قابل ارائه با ۴ گیگ رم و بالاتر",
  "تغییر اتوماتیک رمز عبور بدون نیاز به تماس با پشتیبانی",
  "نصب اتوماتیک سیستم‌عامل مورد نظر",
  "قابلیت نصب سیستم‌عامل‌های CentOS، Ubuntu، Debian، ویندوز سرور",
];

const featuresLeft = [
  "ثبت درخواست مدیریت و گزارش‌گیری از منابع از طریق تیکت",
  "ثبت درخواست خاموش/روشن و Restart سرویس از طریق تیکت",
  "ثبت درخواست Rebuild کردن سیستم‌عامل VPS از طریق تیکت",
  "قابلیت نصب نرم‌افزارهای دلخواه و آنتی‌ویروس",
];

export default function VPSFranceFeatures() {
  return (
    <section
      aria-labelledby="vps-france-features-heading"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-france-features-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center"
      >
        قابلیت‌های سرور مجازی فرانسه
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ul className="space-y-3 text-sm text-gray-700">
          {featuresRight.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <HiCheckCircle className="text-[#ff5538] shrink-0 mt-0.5 text-lg" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-3 text-sm text-gray-700">
          {featuresLeft.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <HiCheckCircle className="text-[#ff5538] shrink-0 mt-0.5 text-lg" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100">
        <p className="text-sm text-red-800 leading-relaxed">
          <strong>نکته:</strong> در نظر داشته باشید که نصب یا ست کردن هرگونه VPN بر روی سرورهای مجازی ممکن است تبعات جبران‌ناپذیری همچون ساسپند و لغو کامل سرور را به دنبال داشته باشد.
        </p>
      </div>
    </section>
  );
}
