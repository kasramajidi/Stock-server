import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConditionalSiteLayout from "@/components/layout/ConditionalSiteLayout";
import CartProviderWrapper from "./CartProviderWrapper";

const iransans = localFont({
  src: [
    {
      path: "../public/font/woff2/IRANSansWeb.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/woff2/IRANSansWeb_Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"
  ),
  title: {
    default: "ريتكس | RAITX - خدمات پرداخت ارزی و پی پال",
    template: "%s | ريتكس",
  },
  description:
    "ريتكس ارائه‌دهنده خدمات پرداخت ارزی، نقد کردن درآمد پی پال، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل",
  icons: {
    icon: "/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png",
    apple: "/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png",
  },
  keywords: [
    "ريتكس",
    "RAITX",
    "پرداخت ارزی",
    "پی پال",
    "نقد کردن پی پال",
    "پرداخت ویزا",
    "ثبت نام آزمون",
    "سفارت",
    "پرداخت هزینه سفارت",
    "خرید بلیت هواپیما",
    "پرداخت هتل",
  ],
  authors: [{ name: "RAITX" }],
  creator: "RAITX",
  publisher: "RAITX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "ريتكس",
    title: "ريتكس | RAITX - خدمات پرداخت ارزی و پی پال",
    description:
      "ريتكس ارائه‌دهنده خدمات پرداخت ارزی، نقد کردن درآمد پی پال، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل",
    images: [
      {
        url: "/Images/Baner/Layer 5.png",
        width: 1200,
        height: 630,
        alt: "ريتكس - RAITX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ريتكس | RAITX",
    description:
      "ريتكس ارائه‌دهنده خدمات پرداخت ارزی، نقد کردن درآمد پی پال، پرداخت هزینه ویزا و سفارت",
    images: ["/Images/Baner/Layer 5.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ريتكس",
    alternateName: "RAITX",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"
    }/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png`,
    description:
      "ريتكس ارائه‌دهنده خدمات پرداخت ارزی، نقد کردن درآمد پی پال، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IR",
    },
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ريتكس",
    alternateName: "RAITX",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"
        }/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fa" dir="rtl">
      <body className={`${iransans.variable} antialiased bg-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CartProviderWrapper>
          <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
