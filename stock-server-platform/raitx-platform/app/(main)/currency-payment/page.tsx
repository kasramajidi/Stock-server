import type { Metadata } from "next";
import CurrencyPaymentTabs from "./components/CurrencyPaymentTabs";

export const metadata: Metadata = {
  title: "پرداخت ارزی",
  description: "خدمات پرداخت ارزی، اکانت‌های پریمیوم، سرویس‌های VPS و خدمات آموزشی ريتكس",
  keywords: [
    "پرداخت ارزی",
    "اکانت پریمیوم",
    "VPS",
    "خدمات بین‌المللی",
    "آموزش و آزمون",
    "ريتكس",
  ],
  alternates: {
    canonical: "/currency-payment",
  },
};

export default function CurrencyPaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <CurrencyPaymentTabs />
      </div>
    </main>
  );
}

