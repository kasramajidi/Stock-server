import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود و ثبت نام | ريتكس",
  description:
    "ورود به حساب کاربری یا ایجاد حساب جدید در ريتكس - دسترسی به تمام خدمات",
  keywords: [
    "ورود",
    "ثبت نام",
    "حساب کاربری",
    "ريتكس",
    "احراز هویت",
  ],
  alternates: {
    canonical: "/auth",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
