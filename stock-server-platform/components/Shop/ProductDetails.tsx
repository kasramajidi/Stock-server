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
      <div className="min-h-screen bg-slate-50/80 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-3">محصول یافت نشد</h2>
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 py-8">
      <div className={pageMargin}>
        <nav className="mb-6 text-sm text-slate-500" aria-label="مسیر">
          <Link href="/" className="hover:text-[#0e7490] transition-colors font-medium">
            صفحه اصلی
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#0e7490] transition-colors font-medium">
            فروشگاه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800 font-semibold truncate max-w-[180px] inline-block align-bottom" title={product.name}>
            {product.name}
          </span>
        </nav>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-6 sm:p-8">
            <div className="lg:col-span-5 flex items-center justify-center min-h-[280px] lg:min-h-[360px]">
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

        <div className="mt-14">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
