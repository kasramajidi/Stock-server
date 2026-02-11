"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { ShopProduct } from "@/lib/shop-api";

interface ProductImageGalleryProps {
  product: ShopProduct;
  images: string[];
}

export default function ProductImageGallery({ product, images }: ProductImageGalleryProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const src = images[0] ?? "";

  useEffect(() => {
    const raw = localStorage.getItem("favorites") || "[]";
    const list = JSON.parse(raw);
    setIsFavorite(Array.isArray(list) && list.includes(product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const raw = localStorage.getItem("favorites") || "[]";
    const list = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    const next = isFavorite ? list.filter((id: number) => id !== product.id) : [...list, product.id];
    localStorage.setItem("favorites", JSON.stringify(next));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 border border-slate-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer"
          aria-label="علاقه‌مندی"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-slate-400"}`}
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
