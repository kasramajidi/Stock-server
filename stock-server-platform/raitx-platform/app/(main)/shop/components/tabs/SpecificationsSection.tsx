"use client";

import React, { useMemo } from "react";
import type { Product } from "../productsData";

interface SpecificationsSectionProps {
  product?: Product | null;
}

const PHYSICAL_SPECS = [
  { title: "رنگ:", content: "بنفش، سفید، قرمز، مشکی" },
  { title: "سازگاری:", content: "اندروید ۶.۰ و بالاتر" },
  { title: "توضیحات میکروفون:", content: "نیاز به منبع تغذیه" },
  { title: "ابعاد / وزن :", content: "۴۵ در ۶۸" },
  { title: "نشانگر LED", content: "ندارد" },
  { title: "گارانتی", content: "گارانتی ۱۲ ماهه رایانه همراه گارانتی ۱۸ ماهه رایانه همراه گارانتی ۳۶ ماهه رایانه همراه" },
  { title: "مقاومت در برابر آب و گرد و غبار / درجه گواهی نامه", content: "مقاوم در برابر گرد و غبار با گواهی IPXA" },
];

const SpecificationsSection = React.memo<SpecificationsSectionProps>(({ product }) => {
  const specifications = useMemo(() => {
    if (product && (product.productType === "service" || product.productType === "gift_card")) {
      const typeLabel = product.productType === "service" ? "سرویس آنلاین" : "دیجیتال";
      return [
        { title: "نوع:", content: typeLabel },
        { title: "برند:", content: product.brand },
        { title: "دسته‌بندی:", content: product.category },
        { title: "امتیاز:", content: `${product.rating}/5` },
        { title: "تعداد نظرات:", content: product.reviews.toString() },
      ];
    }
    return PHYSICAL_SPECS;
  }, [product]);

  return (
    <section
      className="space-y-3"
      aria-label="مشخصات محصول"
    >
      <dl className="space-y-3">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 text-right"
          >
            <dt className="text-sm font-medium text-gray-700 shrink-0">
              {spec.title}
            </dt>
            <dd className="text-sm text-gray-900 font-medium">
              {spec.content}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
});

SpecificationsSection.displayName = "SpecificationsSection";

export default SpecificationsSection;
