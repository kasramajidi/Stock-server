"use client";

import React from "react";
import type { ShopProduct } from "@/lib/shop-api";

const FEATURES = [
  { label: "گارانتی اصالت کالا", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { label: "پشتیبانی فنی", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  { label: "ارسال سریع", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" },
];

interface ProductFeaturesProps {
  product: ShopProduct;
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 h-fit">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
        مزایا
      </h3>
      <ul className="space-y-3">
        {FEATURES.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[#0e7490]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </span>
            <span className="text-slate-700 text-sm font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 pt-4 border-t border-slate-200/80 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">برند</dt>
          <dd className="font-medium text-slate-800">{product.brand}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">دسته</dt>
          <dd className="font-medium text-slate-800">{product.category}</dd>
        </div>
      </dl>
    </div>
  );
}
