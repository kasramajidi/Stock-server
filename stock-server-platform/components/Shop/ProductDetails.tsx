"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import type { ShopProduct } from "@/lib/shop-api";

const pageMargin =
  "mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k";

interface ProductDetailsProps {
  initialProduct?: ShopProduct | null;
}

export default function ProductDetails({ initialProduct }: ProductDetailsProps) {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? parseInt(params.id as string, 10) : null;
  const product = initialProduct ?? null;
  const productImages = product && product.image ? [product.image] : [];
  const finalPrice = product?.price ?? 0;

  const handleContact = () => router.push("/contact");

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-3">محصول یافت نشد</h2>
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 sm:py-8">
      <div className={pageMargin}>
        <nav
          className="flex items-center gap-2 py-3 text-xs text-gray-500 mb-6"
          aria-label="مسیر"
        >
          <Link href="/" className="hover:text-[#0e7490] transition-colors">
            صفحه اصلی
          </Link>
          <span aria-hidden>/</span>
          <Link href="/shop" className="hover:text-[#0e7490] transition-colors">
            فروشگاه
          </Link>
          <span aria-hidden>/</span>
          <span
            className="text-gray-800 font-medium truncate max-w-[160px] sm:max-w-[240px]"
            title={product.name}
          >
            {product.name}
          </span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-6 lg:p-8">
            <div className="lg:col-span-5 flex items-center justify-center min-h-[260px] lg:min-h-[340px]">
              <ProductImageGallery product={product} images={productImages} />
            </div>
            <div className="lg:col-span-4 flex flex-col">
              <ProductInfo
                product={product}
                selectedWarranty=""
                setSelectedWarranty={() => {}}
                finalPrice={finalPrice}
                onContactRequest={handleContact}
              />
            </div>
            <div className="lg:col-span-3">
              <ProductFeatures product={product} />
            </div>
          </div>
        </div>

        <ProductTabs product={product} />

        <div className="mt-10 sm:mt-12">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
