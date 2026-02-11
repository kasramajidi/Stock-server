"use client";

import { useRef } from "react";
import BlogCard from "./BlogCard";

const blogs = [
  "بررسی مفهوم Hot‑Swap و Hot‑Plug در سرور و استوریج",
  "NVMe در سرورها چیست و چه تفاوتی با SSD معمولی دارد؟",
  "دلایل کند شدن سرور اچ پی",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
  "برای شرکت‌ها نفره چه سرور HP مناسب است",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
  "معرفی انواع سرور HP ProLiant و کاربرد آن‌ها",
  "رید کنترلر سرور چیست و چه نقشی دارد؟",
  "مقایسه هارد SAS و SATA برای سرور",
  "نحوه ارتقای رم سرور HP",
  "پاور سرور و نکات مهم در انتخاب آن",
  "خنک‌کاری سرور و اهمیت آن در دیتاسنتر",
];

const CARD_WIDTH = 220;
const GAP = 16;

export default function BlogSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative flex items-center">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 px-2 scrollbar-hide sm:px-12"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      >
        {blogs.map((title, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <BlogCard title={title} />
          </div>
        ))}
      </div>
    </div>
  );
}
