"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import type { Product } from "./productsData";

interface ProductImageGalleryProps {
  product: Product;
  images: string[];
}

const ProductImageGallery = React.memo<ProductImageGalleryProps>(
  ({ product, images }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const imageSrc = images[0] ?? "";

    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(product.id));
    }, [product.id]);

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: product.name,
            text: product.description,
            url: window.location.href,
          });
        } catch (err) {
          console.log("Error sharing:", err);
        }
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("لینک محصول در کلیپ‌بورد کپی شد");
      }
    };

    const handleDownload = () => {
      if (!imageSrc) return;
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = `${product.name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleFavorite = () => {
      setIsFavorite(!isFavorite);
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (isFavorite) {
        const updated = favorites.filter((id: number) => id !== product.id);
        localStorage.setItem("favorites", JSON.stringify(updated));
      } else {
        favorites.push(product.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    };

    return (
      <div className="bg-transparent rounded-2xl w-full flex flex-col justify-center p-0">
        <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-xl overflow-hidden group bg-transparent">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              unoptimized={shouldUnoptimizeImage(imageSrc)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
              <svg
                className="w-16 h-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
            <button
              onClick={handleFavorite}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <svg
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleDownload}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="دانلود تصویر"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="اشتراک‌گذاری"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductImageGallery.displayName = "ProductImageGallery";

export default ProductImageGallery;
