"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { ChatWidgetWrapper } from "@/components/ChatWidget";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAuthCookie());
  }, [pathname]);

  useEffect(() => {
    const onLogout = () => setIsAuthenticated(false);
    window.addEventListener("userLogout", onLogout);
    return () => window.removeEventListener("userLogout", onLogout);
  }, []);

  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main className="pt-4 sm:pt-5 md:pt-6">
        {children}
      </main>
      <Footer />
      <ChatWidgetWrapper adminAvatars={[]} />
    </>
  );
}
