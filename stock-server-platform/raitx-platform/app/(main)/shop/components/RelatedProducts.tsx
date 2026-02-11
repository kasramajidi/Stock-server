"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./CardProduct";
import { products } from "./productsData";
import type { Product } from "./productsData";
import { fetchShopProducts, type ShopProduct } from "../lib/shop-api";

type ProductLike = Product | ShopProduct;

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

const RelatedProducts = React.memo<RelatedProductsProps>(
  ({ currentProductId, category }) => {
    const [relatedProducts, setRelatedProducts] = useState<ProductLike[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      fetchShopProducts()
        .then((list) => {
          if (cancelled) return;
          const related = list
            .filter(
              (p) => p.id !== currentProductId && p.category === category
            )
            .slice(0, 4);
          setRelatedProducts(related);
        })
        .catch(() => {
          if (cancelled) return;
          const fromStatic = products
            .filter(
              (p: Product) =>
                p.id !== currentProductId && p.category === category
            )
            .slice(0, 4);
          setRelatedProducts(fromStatic);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, [currentProductId, category]);

    const header = (
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-7 rounded-full bg-[#ff5538]" aria-hidden />
          محصولات مرتبط
        </h2>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-xl text-sm font-medium border-2 border-[#ff5538] text-[#ff5538] hover:bg-[#ff5538] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          مشاهده همه
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    );

    if (loading) {
      return (
        <section className="py-8 sm:py-10 px-5 sm:px-8 bg-white border border-gray-200/80 rounded-2xl mt-10 shadow-sm">
          {header}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-gray-100 animate-pulse"
                aria-hidden
              />
            ))}
          </div>
        </section>
      );
    }

    if (relatedProducts.length === 0) {
      return (
        <section className="py-8 sm:py-10 px-5 sm:px-8 bg-white border border-gray-200/80 rounded-2xl mt-10 shadow-sm">
          {header}
          <div className="text-center py-12 text-gray-500 text-[1.05rem]">
            محصول مرتبطی یافت نشد
          </div>
        </section>
      );
    }

    return (
      <section className="py-8 sm:py-10 px-5 sm:px-8 bg-white border border-gray-200/80 rounded-2xl mt-10 shadow-sm">
        {header}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      </section>
    );
  }
);

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;
