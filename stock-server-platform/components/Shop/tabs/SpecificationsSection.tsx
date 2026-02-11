"use client";

import React from "react";
import type { ShopProduct } from "@/lib/shop-api";

interface SpecificationsSectionProps {
  product?: ShopProduct | null;
}

const SPECS = [
  { key: "نوع", value: (p: ShopProduct) => (p.productType === "server" ? "سرور" : "قطعه") },
  { key: "برند", value: (p: ShopProduct) => p.brand },
  { key: "دسته‌بندی", value: (p: ShopProduct) => p.category },
  { key: "امتیاز", value: (p: ShopProduct) => `${p.rating}/5` },
  { key: "تعداد نظرات", value: (p: ShopProduct) => String(p.reviews) },
];

export default function SpecificationsSection({ product }: SpecificationsSectionProps) {
  if (!product) return null;

  return (
    <dl className="space-y-3">
      {SPECS.map(({ key, value }) => (
        <div
          key={key}
          className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50/80 border border-slate-100"
        >
          <dt className="text-slate-500 text-sm font-medium">{key}</dt>
          <dd className="text-slate-900 font-semibold text-sm">{value(product)}</dd>
        </div>
      ))}
    </dl>
  );
}
