"use client";

import React from "react";
import Link from "next/link";
import type { ShopProduct } from "@/lib/shop-api";

interface ReviewsSectionProps {
  product: ShopProduct | null;
}

export default function ReviewsSection({ product }: ReviewsSectionProps) {
  const name = product?.name ?? "این محصول";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-base font-semibold text-slate-900 mb-3">نظرات کاربران</h3>
        <p className="text-slate-500 text-sm">هنوز نظری ثبت نشده است.</p>
      </div>
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-1">ثبت نظر</h3>
        <p className="text-slate-600 text-sm mb-4">&quot;{name}&quot;</p>
        <p className="text-slate-500 text-sm mb-4">
          برای ثبت نظر یا استعلام با کارشناسان ما تماس بگیرید.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          تماس با ما
        </Link>
      </div>
    </div>
  );
}
