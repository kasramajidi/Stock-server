import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "چت پشتیبانی",
  description: "چت آنلاین با پشتیبانی استوک سرور — سوالات خود را بپرسید.",
  robots: { index: false, follow: false },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
