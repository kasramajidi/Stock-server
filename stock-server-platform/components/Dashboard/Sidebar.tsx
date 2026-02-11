"use client";

import Link from "next/link";

const items: { id: string; label: string; href: string }[] = [
  { id: "dashboard", label: "پیشخوان", href: "/dashboard" },
  { id: "orders", label: "سفارش‌های من", href: "/dashboard/orders" },
  { id: "addresses", label: "آدرس‌ها", href: "/dashboard/addresses" },
  { id: "wallet", label: "کیف پول", href: "/dashboard/wallet" },
  { id: "cryptocurrency", label: "رمزارز", href: "/dashboard/cryptocurrency" },
];

interface SidebarProps {
  active: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ active, onSectionChange }: SidebarProps) {
  return (
    <nav className="flex flex-col gap-1 rounded-xl border border-border bg-card p-2">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => onSectionChange(item.id)}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
