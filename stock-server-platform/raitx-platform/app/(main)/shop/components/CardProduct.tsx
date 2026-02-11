"use client";

import Image from "next/image";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import { useRouter } from "next/navigation";
import type { Product } from "./productsData";

interface ProductCardProps {
  product: Product;
  /** اولویت لود تصویر برای بهبود LCP (اولین کارت‌های صفحه) */
  priority?: boolean;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

function ServiceIcon({ mainCategoryId, useFlightTicketIntro }: { mainCategoryId: string; useFlightTicketIntro?: boolean }) {
  const className = "w-16 h-16 sm:w-20 sm:h-20 text-[#ff5538]";
  if (useFlightTicketIntro) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0V9" />
      </svg>
    );
  }
  switch (mainCategoryId) {
    case "currency":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "exams":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "embassy":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case "apply":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case "giftcards":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const router = useRouter();
  const { name, price, originalPrice, image, discount, productType, mainCategoryId } = product;
  const isGiftCard = productType === "gift_card";
  const isService = productType === "service";

  const discountPercentage =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const handleProductClick = () => {
    router.push(`/shop/product/${product.id}`);
  };

  const hasImage = Boolean(image?.trim());
  const showIcon = isService && !hasImage;

  return (
    <div
      className="cursor-pointer h-full flex flex-col transition-opacity hover:opacity-80"
      onClick={handleProductClick}
    >
      <div className="relative grow mb-4">
        <div className="relative flex items-center justify-center w-full h-48 md:h-64 overflow-hidden rounded-xl bg-transparent">
          {hasImage ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={priority}
              unoptimized={shouldUnoptimizeImage(image)}
            />
          ) : showIcon ? (
            <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#fef3f2]">
              <ServiceIcon mainCategoryId={mainCategoryId} useFlightTicketIntro={product.useFlightTicketIntro} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full md:w-16 md:h-16">
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
          <div className="absolute top-2 right-2 bg-[#ff5538] text-white px-2 py-1 text-xs font-medium rounded">
            -{discountPercentage}%
          </div>
        )}
        {isGiftCard && !discountPercentage && (
          <div className="absolute top-2 right-2 bg-[#1a3760] text-white px-2 py-1 text-xs font-medium rounded">
            تحویل فوری
          </div>
        )}
      </div>
      <h3 className="mb-4 text-sm font-medium leading-tight text-right text-gray-900">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
        <div className="text-left">
          {originalPrice && originalPrice > price ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)} تومان
              </span>
              <span className="text-base font-semibold text-gray-900">
                {formatPrice(price)} تومان
              </span>
            </div>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              {formatPrice(price)} تومان
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
          className="bg-[#ff5538] text-white py-2 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          خرید محصول
        </button>
      </div>
    </div>
  );
}
