import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "چت پشتیبانی",
  description: "چت آنلاین با پشتیبانی استوک سرور — سوالات خود را بپرسید.",
  openGraph: { title: "چت پشتیبانی | استوک سرور", url: "/support" },
  alternates: { canonical: "/support" },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
