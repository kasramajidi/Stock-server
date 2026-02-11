"use client";

import React from "react";
import type { ShopProduct } from "@/lib/shop-api";

function normalize(t: string): string {
  return t
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

interface ProductIntroductionProps {
  product?: ShopProduct | null;
}

export default function ProductIntroduction({ product }: ProductIntroductionProps) {
  const text = normalize(product?.description ?? "");
  const blocks = text ? text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];

  if (blocks.length === 0) {
    return (
      <p className="text-slate-500 leading-relaxed">
        این محصول توسط استوک سرور ارائه می‌شود. برای استعلام قیمت و موجودی با ما تماس بگیرید.
      </p>
    );
  }

  return (
    <div className="prose prose-slate max-w-none text-right">
      {blocks.map((paragraph, i) => (
        <p key={i} className="text-slate-700 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
