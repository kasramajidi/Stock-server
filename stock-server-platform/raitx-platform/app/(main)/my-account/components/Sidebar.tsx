"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/app/(main)/auth/lib/cookie";
import {
  LayoutDashboard,
  FolderOpen,
  Wallet,
  User,
  LogOut,
  Coins,
  ChevronDown,
} from "lucide-react";

type SubItem = { label: string; value: string };
type MenuGroup = {
  label: string;
  value: string | null;
  icon: React.ReactNode;
  children?: SubItem[];
};

const menuGroups: MenuGroup[] = [
  { label: "داشبورد", value: "dashboard", icon: <LayoutDashboard size={18} strokeWidth={2} /> },
  {
    label: "سفارش ها",
    value: null,
    icon: <FolderOpen size={18} strokeWidth={2} />,
    children: [{ label: "سفارشهای من", value: "orders" }],
  },
  {
    label: "کیف پول",
    value: null,
    icon: <Wallet size={18} strokeWidth={2} />,
    children: [{ label: "افزایش اعتبار", value: "wallet-increase" }],
  },
  {
    label: "پروفایل کاربری",
    value: null,
    icon: <User size={18} strokeWidth={2} />,
    children: [{ label: "مشخصات فردی", value: "accountDetails" }],
  },
  { label: "رمزارز", value: "cryptocurrency", icon: <Coins size={18} strokeWidth={2} /> },
];

interface SidebarProps {
  active: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ active, onSectionChange }: SidebarProps) {
  const router = useRouter();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "سفارش ها": true,
    "کیف پول": true,
    "پروفایل کاربری": true,
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const CRYPTO_PRICE_URL = "https://faraswap.com/crypto-price";

  const handleClick = (value: string) => {
    if (value === "logout") {
      if (typeof window !== "undefined") {
        deleteAuthCookie();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("loginPhone");
        localStorage.removeItem("loginval");
        window.dispatchEvent(new CustomEvent("userLogout"));
        router.push("/auth", { scroll: false });
      }
    } else if (value === "cryptocurrency") {
      if (typeof window !== "undefined") {
        window.open(CRYPTO_PRICE_URL, "_blank", "noopener,noreferrer");
      }
    } else {
      onSectionChange(value);
    }
  };

  return (
    <nav
      className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
      aria-label="منوی حساب کاربری"
    >
      {menuGroups.map((group) => {
        const isGroupOpen = group.children ? (openGroups[group.label] ?? true) : false;

        if (group.children) {
          return (
            <div key={group.label} className="mb-0.5">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-right text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex shrink-0 text-gray-500">{group.icon}</span>
                  <span>{group.label}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-transform ${isGroupOpen ? "rotate-0" : "-rotate-90"}`}
                />
              </button>
              {isGroupOpen && (
                <div className="mr-5 mt-0.5 space-y-0.5 border-r-2 border-gray-100 pr-2">
                  {group.children.map((child) => {
                    const isActive = active === child.value;
                    return (
                      <button
                        key={child.value}
                        type="button"
                        onClick={() => handleClick(child.value)}
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-right text-sm transition-colors ${
                          isActive
                            ? "bg-[#ff5538] font-medium text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        const isActive = active === group.value;
        return (
          <button
            key={group.value!}
            type="button"
            onClick={() => group.value && handleClick(group.value)}
            className={`relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-right text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#ff5538] text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <span className="absolute right-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-white/30" />
            )}
            <span className="flex shrink-0 text-current opacity-90">{group.icon}</span>
            <span>{group.label}</span>
          </button>
        );
      })}

      <div className="mt-3 border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => handleClick("logout")}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-right text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} strokeWidth={2} className="shrink-0" />
          <span>خروج</span>
        </button>
      </div>
    </nav>
  );
}
