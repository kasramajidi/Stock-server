import type { Metadata } from "next";
import {
  ContactHeader,
  FeatureCards,
  ContactForm,
  MapSection,
} from "./components";

export const metadata: Metadata = {
  title: "تماس با ما | ريتكس",
  description: "تماس با ريتكس: ۰۲۱-۹۱۳۲۰۷۰۰ | support@mrpremiumhub.org | تهران، کارگر شمالی، جلال آل احمد، کوچه چهارم، پلاک ۴۰",
  keywords: [
    "تماس با ما",
    "پشتیبانی",
    "ريتكس",
    "۰۲۱۹۱۳۲۰۷۰۰",
    "support@mrpremiumhub.org",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ContactHeader />
        <FeatureCards />
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-24 mb-10 sm:mb-12 md:mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <ContactForm />
          <MapSection />
        </div>
      </div>
    </main>
  );
}
