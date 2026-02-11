import type { Metadata } from "next";
import { Suspense } from "react";
import CreditCardsTabs from "./components/CreditCardsTabs";
import { fetchShopProducts } from "@/app/(main)/shop/lib/shop-api";

export const metadata: Metadata = {
  title: "کارت‌های اعتباری",
  description: "خرید و دریافت انواع کارت‌های اعتباری، گیفت کارت‌ها و مسترکارت",
  keywords: [
    "کارت اعتباری",
    "مسترکارت",
    "ویزا کارت",
    "گیفت کارت",
    "کارت بازی",
    "ريتكس",
  ],
  alternates: {
    canonical: "/valid-cards",
  },
};

export default async function ValidCardsPage() {
  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
  } catch {
    // client can show empty or retry
  }
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-gray-500">در حال بارگذاری…</div>}>
          <CreditCardsTabs initialProducts={initialProducts} />
        </Suspense>
      </div>
    </main>
  );
}

