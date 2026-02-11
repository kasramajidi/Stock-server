"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/lib/cookie";
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
  { label: "پیشخوان", value: "dashboard", icon: <LayoutDashboard size={18} strokeWidth={1.8} /> },
  {
    label: "سفارش‌ها",
    value: null,
    icon: <FolderOpen size={18} strokeWidth={1.8} />,
    children: [{ label: "سفارشهای من", value: "orders" }],
  },
  {
    label: "کیف پول",
    value: null,
    icon: <Wallet size={18} strokeWidth={1.8} />,
    children: [{ label: "افزایش اعتبار", value: "wallet-increase" }],
  },
  {
    label: "پروفایل",
    value: null,
    icon: <User size={18} strokeWidth={1.8} />,
    children: [{ label: "مشخصات فردی", value: "accountDetails" }],
  },
  { label: "رمزارز", value: "cryptocurrency", icon: <Coins size={18} strokeWidth={1.8} /> },
];

interface SidebarProps {
  active: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ active, onSectionChange }: SidebarProps) {
  const router = useRouter();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "سفارش‌ها": true,
    "کیف پول": true,
    "پروفایل": true,
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
      className="flex flex-col gap-0.5 rounded-2xl border border-border bg-card p-4 shadow-sm"
      aria-label="منوی حساب کاربری"
    >
      {menuGroups.map((group) => {
        const isGroupOpen = group.children ? (openGroups[group.label] ?? true) : false;

        if (group.children) {
          return (
            <div key={group.label} className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-right text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex shrink-0 opacity-70">{group.icon}</span>
                  <span>{group.label}</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 opacity-60 transition-transform ${isGroupOpen ? "rotate-0" : "-rotate-90"}`}
                />
              </button>
              {isGroupOpen && (
                <div className="mr-6 flex flex-col gap-0.5 border-r border-border/60 pr-2">
                  {group.children.map((child) => {
                    const isActive = active === child.value;
                    return (
                      <button
                        key={child.value}
                        type="button"
                        onClick={() => handleClick(child.value)}
                        className={`relative rounded-md px-3 py-2 text-right text-[13px] transition-colors ${
                          isActive
                            ? "font-medium text-[var(--primary-hover)]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute right-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[var(--primary-hover)]" />
                        )}
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
            className={`relative flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-right text-[13px] font-medium transition-colors ${
              isActive
                ? "text-[var(--primary-hover)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <span className="absolute right-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[var(--primary-hover)]" />
            )}
            <span className="flex shrink-0 opacity-70">{group.icon}</span>
            <span>{group.label}</span>
          </button>
        );
      })}

      <div className="mt-4 pt-4 border-t border-border/50">
        <button
          type="button"
          onClick={() => handleClick("logout")}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-right text-[13px] font-medium text-muted-foreground transition-colors hover:text-red-600"
        >
          <LogOut size={16} strokeWidth={1.8} className="shrink-0 opacity-70" />
          <span>خروج</span>
        </button>
      </div>
    </nav>
  );
}
