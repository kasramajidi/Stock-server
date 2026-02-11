"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { fetchWalletBalance } from "../lib/my-account-api";

export default function WalletSection() {
  const router = useRouter();
  const [wallet, setWallet] = useState<{ total?: number; available?: number; blocked?: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletBalance().then(setWallet).finally(() => setLoading(false));
  }, []);

  const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";
  const total = wallet.total ?? 0;
  const available = wallet.available ?? wallet.total ?? 0;
  const blocked = wallet.blocked ?? 0;

  const cards = [
    { title: "موجودی بلوکه شده", value: blocked, action: null as string | null, href: null as string | null },
    {
      title: "موجودی در دسترس",
      value: available,
      action: "افزایش",
      href: "/my-account/wallet-increase",
    },
    { title: "موجودی کیف پول", value: total, action: null as string | null, href: null as string | null },
  ];

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">کیف پول</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          موجودی و تراکنش‌های کیف پول خود را مشاهده و مدیریت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{card.title}</span>
              <button type="button" className="text-gray-400 hover:text-gray-600" title="اطلاعات">
                <Info size={14} />
              </button>
            </div>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {loading ? "—" : formatRial(card.value)}
            </p>
            {card.action && card.href && (
              <button
                type="button"
                onClick={() => router.push(card.href!)}
                className="mt-4 text-sm font-medium text-[#ff5538] hover:underline"
              >
                {card.action}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
        <h4 className="text-sm font-semibold text-gray-700">دسترسی سریع</h4>
        <ul className="mt-2 space-y-1.5 text-sm">
          <li>
            <button
              type="button"
              onClick={() => router.push("/my-account/wallet-increase")}
              className="text-[#ff5538] hover:underline"
            >
              افزایش اعتبار
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
