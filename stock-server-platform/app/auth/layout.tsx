import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام",
  description: "ورود یا ثبت‌نام در فروشگاه استوک سرور",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
