"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import type { Product } from "./productsData";

interface WhiteProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export default function WhiteProductCard({ product }: WhiteProductCardProps) {
  const router = useRouter();
  const { name, price, originalPrice, image, discount } = product;

  const discountPercentage =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const handleProductClick = () => {
    router.push(`/shop/product/${product.id}`);
  };

  return (
    <div
      className="flex flex-col h-full p-3 transition-all duration-300 bg-white shadow-sm cursor-pointer rounded-2xl md:p-4 hover:-translate-y-2"
      onClick={handleProductClick}
    >
      <div className="relative grow mb-3">
        <div className="relative flex items-center justify-center w-full h-40 overflow-hidden md:h-56 bg-gray-50 rounded-xl">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={shouldUnoptimizeImage(image)}
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full md:w-16 md:h-16">
              <svg
                className="w-6 h-6 text-gray-400 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          )}
        </div>
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-[#ff5538] text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <h3 className="mb-3 text-xs font-medium leading-tight text-right text-gray-900 md:text-sm">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-auto">
        <div className="text-left">
          {originalPrice && originalPrice > price ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(originalPrice)}{" "}
                <span className="text-gray-400">تومان</span>
              </span>
              <span className="text-xs font-bold text-gray-900 md:text-sm">
                {formatPrice(price)}{" "}
                <span className="text-gray-400">تومان</span>
              </span>
            </div>
          ) : (
            <span className="text-xs font-bold text-gray-900 md:text-sm">
              {formatPrice(price)} <span className="text-gray-400">تومان</span>
            </span>
          )}
        </div>
        <button className="bg-[#ff5538] text-white py-1.5 md:py-2 px-2 md:px-3 rounded-l-full rounded-r-2xl font-medium text-xs hover:bg-[#e54d32] transition-colors duration-200">
          خرید محصول
        </button>
      </div>
    </div>
  );
}
