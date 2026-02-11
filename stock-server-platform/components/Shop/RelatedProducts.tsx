"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./CardProduct";
import { fetchShopProducts, type ShopProduct } from "@/lib/shop-api";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [items, setItems] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchShopProducts()
      .then((list) => {
        if (cancelled) return;
        setItems(
          list.filter((p) => p.id !== currentProductId && p.category === category).slice(0, 4)
        );
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentProductId, category]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-[#0e7490]" aria-hidden />
          محصولات مرتبط
        </h2>
        <Link
          href="/shop"
          className="text-sm font-semibold text-[#0e7490] hover:underline flex items-center gap-1"
        >
          همه محصولات
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-slate-500 text-center py-8">محصول مرتبطی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
