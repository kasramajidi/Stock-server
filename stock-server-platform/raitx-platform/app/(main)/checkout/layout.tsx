import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description:
    "تسویه حساب و تکمیل سفارش در ريتكس - وارد کردن اطلاعات صورتحساب و پرداخت",
  keywords: ["تسویه حساب", "پرداخت", "سفارش", "صورتحساب", "ريتكس"],
  openGraph: {
    title: "تسویه حساب | ريتكس",
    description: "تسویه حساب و تکمیل سفارش در ريتكس",
    type: "website",
  },
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

