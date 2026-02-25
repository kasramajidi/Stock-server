"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/lib/shop-api";

interface ProductCardProps {
  product: ShopProduct;
  priority?: boolean;
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("fa-IR").format(price);

const DEFAULT_PRODUCT_IMAGE = "/Images/Menu/cpu.svg";

export default function ProductCard({ product, priority }: ProductCardProps) {
  const { name, price, image, category } = product;
  const imageSrc = image?.trim() || DEFAULT_PRODUCT_IMAGE;

  return (
    <Link
      href={`/shop/product/${product.slug ?? product.id}`}
      className="group block h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300/80 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          unoptimized={imageSrc.startsWith("http")}
        />
        {category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 text-slate-600 text-xs font-medium shadow-sm border border-slate-100">
            {category}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-slate-900 font-semibold text-[15px] leading-snug line-clamp-2 mb-4 group-hover:text-[#0e7490] transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <div>
            {price > 0 ? (
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(price)}
                <span className="text-slate-500 text-sm font-normal mr-1">تومان</span>
              </span>
            ) : (
              <span className="text-slate-500 text-sm font-medium">تماس بگیرید</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[#0e7490] text-sm font-semibold">
            جزئیات
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
