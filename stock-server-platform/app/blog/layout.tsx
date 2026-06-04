import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وبلاگ",
  description:
    "مقالات تخصصی سرور، شبکه، استوریج و تجهیزات HP و HPE — راهنماها و اخبار فنی از استوک سرور.",
  openGraph: {
    title: "وبلاگ | استوک سرور",
    description: "مقالات تخصصی سرور و تجهیزات شبکه",
    url: "/blog",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
