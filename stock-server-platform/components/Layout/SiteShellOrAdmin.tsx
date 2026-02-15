"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/Layout/TopBar";
import Header from "@/components/Layout/Header";
import Navigation from "@/components/Layout/Navigation";
import FloatingCategoryMenu from "@/components/Layout/FloatingCategoryMenu";
import Footer from "@/components/Layout/Footer";

export default function SiteShellOrAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      <TopBar />
      <Header />
      <Navigation />
      <div className="relative">
        <FloatingCategoryMenu />
        {children}
      </div>
      <Footer />
    </>
  );
}
