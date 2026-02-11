import type { Metadata } from "next";
import {
  Hero,
  ServicesSection,
  PaymentMethods,
  ExamRegistration,
  VisaPayments,
} from "@/app/(main)/components/home";

export const metadata: Metadata = {
  title: "ريتكس | RAITX - خدمات ارزی و پرداخت ارزی",
  description:
    "ريتكس (RAITX) - نقد درآمد پی‌پال، پرداخت با مسترکارت، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل. تماس: ۰۲۱-۹۱۳۲۰۷۰۰ | support@mrpremiumhub.org",
  keywords: [
    "نقد درآمد ارزی",
    "پرداخت پی‌پال",
    "پرداخت مستر کارت",
    "پرداخت ویزا",
    "پرداخت هزینه سفارت",
    "ثبت نام آزمون بین‌المللی",
    "خرید بلیت هواپیما",
    "پرداخت هتل",
    "ريتكس",
    "RAITX",
    "خدمات ارزی",
  ],
  openGraph: {
    title: "ريتكس | خدمات ارزی و پرداخت ارزی",
    description:
      "نقد درآمد پی‌پال، پرداخت با مسترکارت، ویزا و سفارت، آزمون‌های بین‌المللی، بلیت و هتل. تماس: ۰۲۱-۹۱۳۲۰۷۰۰",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "خدمات پرداخت ارزی و نقد کردن درآمد",
    provider: {
      "@type": "Organization",
      name: "ريتكس",
      alternateName: "RAITX",
    },
    areaServed: "IR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات پرداخت ارزی",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "نقد کردن درآمد پی پال",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "پرداخت با پی پال",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "پرداخت هزینه ویزا و سفارت",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ثبت نام آزمون‌های بین‌المللی",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <main className="min-h-screen bg-gray-50">
        <Hero />
        <ServicesSection />
        <PaymentMethods />
        <ExamRegistration />
        <VisaPayments />
      </main>
    </>
  );
}
