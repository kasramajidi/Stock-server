import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description: "پاسخ به سوالات رایج شما درباره خدمات ريتكس",
  keywords: [
    "سوالات متداول",
    "FAQ",
    "پرسش و پاسخ",
    "ريتكس",
  ],
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 md:pb-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <FAQPageClient />
      </div>
    </main>
  );
}

