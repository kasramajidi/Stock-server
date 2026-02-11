"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWalletBalance } from "@/lib/dashboard-api";

export default function WalletSection() {
  const router = useRouter();
  const [wallet, setWallet] = useState<{ total?: number; available?: number; blocked?: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalletBalance()
      .then(setWallet)
      .finally(() => setLoading(false));
  }, []);

  const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";
  const total = wallet.total ?? 0;
  const available = wallet.available ?? wallet.total ?? 0;
  const blocked = wallet.blocked ?? 0;

  const stats = [
    { label: "موجودی در دسترس", value: available, href: "/dashboard/wallet-increase" as string | null },
    { label: "بلوکه شده", value: blocked, href: null },
    { label: "کل", value: total, href: null },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          کیف پول
        </p>
        <div className="flex flex-wrap gap-10 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="text-2xl font-light tabular-nums text-foreground">
              {loading ? "—" : formatRial(s.value)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{s.label}</p>
            {s.href && (
              <button
                type="button"
                onClick={() => router.push(s.href!)}
                className="mt-2 text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
              >
                افزایش اعتبار
              </button>
            )}
            </div>
          ))}
        </div>
      </section>
      <button
        type="button"
        onClick={() => router.push("/dashboard/wallet-increase")}
        className="self-start text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
      >
        افزایش اعتبار
      </button>
    </div>
  );
}
