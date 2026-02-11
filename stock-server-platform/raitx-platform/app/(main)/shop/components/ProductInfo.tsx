"use client";

import React from "react";
import type { Product } from "./productsData";

interface Color {
  value: string;
  hex: string;
}

interface Warranty {
  id: string;
  text: string;
}

const COLORS: Color[] = [
  { value: "black", hex: "#000000" },
  { value: "white", hex: "#FFFFFF" },
  { value: "blue", hex: "#3B82F6" },
  { value: "red", hex: "#EF4444" },
];

const WARRANTIES: Warranty[] = [
  { id: "12", text: "گارانتی ۱۲ ماهه" },
  { id: "18", text: "گارانتی ۱۸ ماهه" },
  { id: "36", text: "گارانتی ۳۶ ماهه" },
];

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedWarranty: string;
  setSelectedWarranty: (warranty: string) => void;
  finalPrice: number;
  handleAddToCart: () => void;
  isSubmitting?: boolean;
}

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedWarranty,
  setSelectedWarranty,
  handleAddToCart,
  isSubmitting = false,
}: ProductInfoProps) {
  const isGiftCard = product.productType === "gift_card";
  const isService = product.productType === "service";
  const hasDenominations = isGiftCard && product.denominations && product.denominations.length > 0;
  const canAddToCart = isService
    ? true
    : isGiftCard
      ? !hasDenominations || !!selectedWarranty
      : !!selectedColor && !!selectedWarranty;

  return (
    <div className="h-full flex flex-col gap-4 sm:gap-6">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 text-right leading-tight mb-2 sm:mb-3">
          {product.name}
        </h1>
        <div className="h-px bg-gray-100 mb-2 sm:mb-3"></div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 sm:mb-4 text-right">
          {/* امتیاز */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-[#ff5538]"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 tabular-nums">{product.rating}/5</span>
          </div>

          {/* تعداد دیدگاه */}
          <div className="flex items-center gap-1.5 shrink-0 min-w-0">
            <svg
              className="w-5 h-5 shrink-0 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {product.reviews != null && product.reviews > 0
                ? `${new Intl.NumberFormat("fa-IR").format(product.reviews)} دیدگاه`
                : "بدون دیدگاه"}
            </span>
          </div>

          {/* تحویل */}
          <div className="flex items-center gap-1.5 shrink-0 min-w-0">
            <svg
              className="w-5 h-5 shrink-0 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              {isGiftCard ? "تحویل فوری آنلاین" : isService ? "ثبت درخواست و پشتیبانی آنلاین" : "امکان تحویل حضوری"}
            </span>
          </div>
        </div>
      </div>

      {!isGiftCard && !isService && (
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 text-right">
            رنگ
          </h3>
          <div className="flex gap-2 sm:gap-3">
            {COLORS.map((color: Color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full border-2 transition-all shadow-sm ${
                  selectedColor === color.value
                    ? "border-[#ff5538] scale-110 shadow-md ring-2 ring-[#ff5538] ring-offset-1"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {(hasDenominations || (!isGiftCard && !isService)) && (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-0">
            {hasDenominations ? "مبلغ گیفت کارت:" : "گارانتی:"}
          </h3>
          {hasDenominations && (
            <span className="text-xs sm:text-sm text-gray-600">
              {product.denominations?.find((d) => d.id === selectedWarranty)?.label}
            </span>
          )}
          {!isGiftCard && !isService && (
            <span className="text-xs sm:text-sm text-gray-600">
              {WARRANTIES.find((w: Warranty) => w.id === selectedWarranty)?.text}
            </span>
          )}
        </div>
        {hasDenominations && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.denominations!.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedWarranty(d.id)}
                className={`h-[35px] sm:h-[40px] p-1 rounded-lg border-2 text-right transition-all shadow-sm ${
                  selectedWarranty === d.id
                    ? "bg-[#ff5538] text-white border-[#ff5538] shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:border-[#ff5538] hover:bg-gray-50"
                }`}
              >
                <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis block w-full text-right">
                  {d.label}
                </span>
              </button>
            ))}
          </div>
        )}
        {!isGiftCard && !isService && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {WARRANTIES.map((warranty: Warranty) => (
              <button
                key={warranty.id}
                onClick={() => setSelectedWarranty(warranty.id)}
                className={`h-[35px] sm:h-[40px] p-1 rounded-lg border-2 text-right transition-all shadow-sm ${
                  selectedWarranty === warranty.id
                    ? "bg-[#ff5538] text-white border-[#ff5538] shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:border-[#ff5538] hover:bg-gray-50"
                }`}
              >
                <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {warranty.text}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      )}

      {!canAddToCart && (
        <div className="text-xs text-[#ff5538] text-right bg-[#ff5538]/10 p-2 rounded-lg border border-[#ff5538]/20">
          ⚠️ {hasDenominations ? "لطفاً مبلغ گیفت کارت را انتخاب کنید" : isService ? "" : "لطفاً رنگ و گارانتی محصول را انتخاب کنید"}
        </div>
      )}
      <button
        disabled={!canAddToCart || isSubmitting}
        onClick={handleAddToCart}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-opacity shadow-sm ${
          canAddToCart && !isSubmitting
            ? "bg-[#ff5538] text-white hover:opacity-90 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? "در حال ثبت…" : "ثبت سفارش"}
      </button>
    </div>
  );
}
