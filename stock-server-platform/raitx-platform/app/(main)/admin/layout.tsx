import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت | ريتكس",
  description: "پنل مدیریت ريتكس",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}