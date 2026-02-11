"use client";

import React from "react";
import type { Product } from "./productsData";

interface ProductFeaturesProps {
  product: Product;
}

const GIFT_CARD_BENEFITS = [
  { text: "تحویل فوری پس از پرداخت", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { text: "گارانتی اصالت و فعال‌سازی", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { text: "پشتیبانی ۲۴/۷", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  { text: "ارسال آنی به ایمیل یا پنل", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const SERVICE_BENEFITS = [
  { text: "ثبت درخواست آنلاین", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { text: "پشتیبانی ۲۴/۷", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  { text: "پرداخت امن", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { text: "تحویل و پیگیری از طریق پنل", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const PHYSICAL_BENEFITS = [
  { text: "ارسال توسط فروشگاه", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" },
  { text: "گارانتی اصالت و سلامت فیزیکی کالا", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { text: "۷ روز ضمانت تعویض کالا", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { text: "هزینه حمل به عهده خریدار", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14" },
];

function getProductFeatures(product: Product): string[] {
  return [
    `برند: ${product.brand}`,
    `دسته‌بندی: ${product.category}`,
    `امتیاز: ${product.rating}/5`,
    `تعداد نظرات: ${product.reviews}`,
  ];
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  const isServiceOrGiftCard =
    product.productType === "service" || product.productType === "gift_card";
  const productFeatures = getProductFeatures(product);

  return (
    <div className="h-full flex flex-col justify-between gap-4 sm:gap-6">
      <div className="rounded-2xl p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 bg-[#ff5538] rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            خرید محصول
          </h3>
        </div>
        <div className="h-px bg-gray-200 mb-3 sm:mb-4"></div>

        <ul className="space-y-2 sm:space-y-5">
          {(product.productType === "gift_card"
            ? GIFT_CARD_BENEFITS
            : product.productType === "service"
              ? SERVICE_BENEFITS
              : PHYSICAL_BENEFITS
          ).map((item, index) => (
            <li key={index} className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#ff5538] rounded-full flex items-center justify-center shadow-sm shrink-0">
                <svg
                  className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <span className="text-gray-700 text-xs sm:text-sm">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {!isServiceOrGiftCard && (
        <div className="bg-white rounded-2xl p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            ویژگی های پایه
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {productFeatures.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-[#ff5538] rounded-full"></div>
                <span className="text-gray-700 text-xs sm:text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
