import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مستندات API",
  robots: { index: false, follow: false },
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
