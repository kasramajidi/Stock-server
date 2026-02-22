import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingMenuProvider } from "@/components/Layout/FloatingMenuContext";
import SiteShellOrAdmin from "@/components/Layout/SiteShellOrAdmin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir"
  ),
  title: {
    default: "استوک سرور | Stock Server - فروش سرور و تجهیزات شبکه",
    template: "%s | استوک سرور",
  },
  description:
    "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت. خرید سرور، تجهیزات شبکه، رم سرور، هارد سرور و پردازنده با گارانتی معتبر.",
  keywords: [
    "سرور",
    "تجهیزات شبکه",
    "رم سرور",
    "هارد سرور",
    "پردازنده",
    "استوک سرور",
    "stock server",
    "خرید سرور",
    "فروش سرور",
    "سرور دست دوم",
  ],
  authors: [{ name: "استوک سرور" }],
  creator: "استوک سرور",
  publisher: "استوک سرور",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "استوک سرور",
    title: "استوک سرور | Stock Server - فروش سرور و تجهیزات شبکه",
    description:
      "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت. خرید سرور، تجهیزات شبکه، رم سرور، هارد سرور و پردازنده با گارانتی معتبر.",
    images: [
      {
        url: "/Images/Logo/logo stock copy 2.png",
        width: 1200,
        height: 630,
        alt: "استوک سرور - فروش سرور و تجهیزات شبکه",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "استوک سرور | Stock Server",
    description: "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت",
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
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="site-top" className="absolute top-0 left-0 w-0 h-0" aria-hidden />
        <FloatingMenuProvider>
          <SiteShellOrAdmin>{children}</SiteShellOrAdmin>
        </FloatingMenuProvider>
      </body>
    </html>
  );
}
