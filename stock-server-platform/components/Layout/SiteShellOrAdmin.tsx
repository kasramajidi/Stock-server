"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/Layout/TopBar";
import Header from "@/components/Layout/Header";
import Navigation from "@/components/Layout/Navigation";
import FloatingCategoryMenu from "@/components/Layout/FloatingCategoryMenu";
import FloatingChatWidget from "@/components/Layout/FloatingChatWidget";
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
  const isSupportPage = pathname === "/support";

  return (
    <>
      <div className="bg-gray-100 pt-3 min-[400px]:pt-4 pb-1">
        <TopBar />
        <Header />
      </div>
      <div className="bg-gray-100 pt-1 pb-0">
        <Navigation />
      </div>
      <div className="relative">
        <FloatingCategoryMenu />
        {children}
      </div>
      <Footer />
      {!isSupportPage && <FloatingChatWidget />}
    </>
  );
}
