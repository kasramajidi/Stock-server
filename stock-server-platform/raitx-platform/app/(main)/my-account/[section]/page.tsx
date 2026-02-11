"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import Sidebar from "../components/Sidebar";
import WelcomeBox from "../components/WelcomeBox";
import DashboardMain from "../components/DashboardMain";
import AccountEmptyState from "../components/AccountEmptyState";
import AddressesSection from "../components/AddressesSection";
import AccountDetailsSection from "../components/AccountDetailsSection";
import WalletSection from "../components/WalletSection";
import WalletIncreaseSection from "../components/WalletIncreaseSection";
import OrdersSection from "../components/OrdersSection";
import CryptocurrencySection from "../components/CryptocurrencySection";

export default function MyAccountSectionPage() {
  const router = useRouter();
  const params = useParams();
  const section = params?.section as string;
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

  const allowedSections = [
    "dashboard",
    "orders",
    "orders-new",
    "orders-refund",
    "downloads",
    "addresses",
    "accountDetails",
    "wallet",
    "wallet-increase",
    "wallet-repay",
    "wallet-payments",
    "wallet-transactions",
    "profile-banks",
    "profile-password",
    "profile-invite",
    "profile-messages",
    "cryptocurrency",
  ];

  useEffect(() => {
    if (section && allowedSections.includes(section)) {
      setActiveSection(section);
    } else if (section) {
      router.push("/my-account", { scroll: false });
    }
  }, [section, router]);

  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    if (newSection === "dashboard") {
      router.push("/my-account", { scroll: false });
    } else {
      router.push(`/my-account/${newSection}`, { scroll: false });
    }
  };

  if (!mounted) {
    return null;
  }

  let content;
  if (activeSection === "dashboard") {
    content = (
      <div className="flex flex-col gap-6">
        <WelcomeBox />
        <DashboardMain />
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
        isComingSoon={true}
      />
    );
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
        isComingSoon={true}
      />
    );
  } else if (activeSection === "downloads") {
    content = (
      <AccountEmptyState
        message="محصول دانلودی برای شما ثبت نشده است."
        buttonText="مشاهده فروشگاه"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "addresses") {
    content = <AddressesSection />;
  } else if (activeSection === "accountDetails") {
    content = <AccountDetailsSection />;
  } else {
    content = (
      <AccountEmptyState
        message="این بخش به زودی در دسترس خواهد بود."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
            حساب من
          </h1>
          <div className="mt-1.5 h-0.5 w-10 rounded-full bg-[#ff5538]" />
          <p className="mt-2 text-sm text-gray-500">
            پیشخوان و تنظیمات حساب کاربری
          </p>
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="lg:w-52 lg:shrink-0 lg:sticky lg:top-6 lg:self-start">
            <Sidebar
              active={activeSection}
              onSectionChange={handleSectionChange}
            />
          </aside>
          <main className="min-w-0 flex-1">
            <div className="min-h-[420px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              {content}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
