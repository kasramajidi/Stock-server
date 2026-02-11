"use client";

import React from "react";
import type { ShopProduct } from "@/lib/shop-api";

const formatPrice = (p: number) => new Intl.NumberFormat("fa-IR").format(p);

interface ProductInfoProps {
  product: ShopProduct;
  selectedWarranty: string;
  setSelectedWarranty: (w: string) => void;
  finalPrice: number;
  onContactRequest: () => void;
}

export default function ProductInfo({
  product,
  finalPrice,
  onContactRequest,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
        {product.category}
      </span>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-4">
        {product.name}
      </h1>

      <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
        <span className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={i <= Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}
            >
              ★
            </span>
          ))}
          <span className="text-slate-500 mr-1">{product.rating}</span>
        </span>
        {product.reviews > 0 && (
          <span>{new Intl.NumberFormat("fa-IR").format(product.reviews)} دیدگاه</span>
        )}
      </div>

      <div className="mb-6 pb-6 border-b border-slate-100">
        {finalPrice > 0 ? (
          <p className="text-2xl font-bold text-slate-900">
            {formatPrice(finalPrice)}
            <span className="text-slate-500 text-base font-normal mr-1">تومان</span>
          </p>
        ) : (
          <p className="text-slate-600 font-medium">برای استعلام قیمت و موجودی تماس بگیرید.</p>
        )}
      </div>

      <button
        type="button"
        onClick={onContactRequest}
        className="w-full py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
      >
        تماس برای استعلام
      </button>

      <p className="mt-4 text-slate-500 text-sm flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        تحویل حضوری و ارسال به سراسر کشور
      </p>
    </div>
  );
}
