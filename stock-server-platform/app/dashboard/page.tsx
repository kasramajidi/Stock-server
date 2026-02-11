"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookie } from "@/lib/cookie";
import Sidebar from "@/components/Dashboard/Sidebar";
import WelcomeBox from "@/components/Dashboard/WelcomeBox";
import DashboardMain from "@/components/Dashboard/DashboardMain";
import DashboardCards from "@/components/Dashboard/DashboardCards";
import AccountEmptyState from "@/components/Dashboard/AccountEmptyState";
import AddressesSection from "@/components/Dashboard/AddressesSection";
import AccountDetailsSection from "@/components/Dashboard/AccountDetailsSection";
import WalletSection from "@/components/Dashboard/WalletSection";
import WalletIncreaseSection from "@/components/Dashboard/WalletIncreaseSection";
import OrdersSection from "@/components/Dashboard/OrdersSection";
import CryptocurrencySection from "@/components/Dashboard/CryptocurrencySection";

export default function DashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const hasUser = localStorage.getItem("user") || getAuthCookie();
      if (!hasUser) {
        router.push("/auth", { scroll: false });
      }
    }
  }, [router]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section === "dashboard") {
      router.push("/dashboard", { scroll: false });
    } else {
      router.push(`/dashboard/${section}`, { scroll: false });
    }
  };

  if (!mounted) {
    return null;
  }

  let content: React.ReactNode;
  if (activeSection === "dashboard") {
    content = (
      <div className="flex flex-col gap-10">
        <WelcomeBox />
        <DashboardMain />
        <DashboardCards />
      </div>
    );
  } else if (activeSection === "orders") {
    content = <OrdersSection />;
  } else if (activeSection === "orders-new" || activeSection === "orders-refund") {
    content = (
      <AccountEmptyState
        message="این بخش به زودی در دسترس خواهد بود."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon
      />
    );
  } else if (activeSection === "downloads") {
    content = (
      <AccountEmptyState
        message="محصول دانلودی برای شما ثبت نشده است."
        buttonText="مشاهده فروشگاه"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/shop", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "addresses") {
    content = <AddressesSection />;
  } else if (activeSection === "accountDetails") {
    content = <AccountDetailsSection />;
  } else if (activeSection === "wallet") {
    content = <WalletSection />;
  } else if (activeSection === "cryptocurrency") {
    content = <CryptocurrencySection />;
  } else if (activeSection === "wallet-increase") {
    content = <WalletIncreaseSection />;
  } else if (
    activeSection === "wallet-repay" ||
    activeSection === "wallet-payments" ||
    activeSection === "wallet-transactions" ||
    activeSection === "profile-banks" ||
    activeSection === "profile-password" ||
    activeSection === "profile-invite" ||
    activeSection === "profile-messages"
  ) {
    content = (
      <AccountEmptyState
        message="این بخش به زودی در دسترس خواهد بود."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon
      />
    );
  } else {
    content = (
      <AccountEmptyState
        message="این بخش به زودی در دسترس خواهد بود."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k py-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="lg:sticky lg:top-8 lg:w-52 lg:shrink-0 lg:self-start">
            <Sidebar active={activeSection} onSectionChange={handleSectionChange} />
          </aside>
          <main className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <header className="mb-8 border-b border-border pb-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                حساب کاربری
              </p>
              <h1 className="mt-1 text-2xl font-light tracking-tight text-foreground">
                {activeSection === "dashboard" ? "پیشخوان" : "حساب من"}
              </h1>
            </header>
            <div className="min-h-[360px]">{content}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
