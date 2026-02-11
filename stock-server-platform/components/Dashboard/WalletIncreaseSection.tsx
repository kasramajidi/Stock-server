"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getLoginPhoneFromStorage } from "@/lib/dashboard-api";

export default function WalletIncreaseSection() {
  const [money, setMoney] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const phone = getLoginPhoneFromStorage();
    if (!phone?.trim()) {
      setError("ابتدا وارد حساب کاربری شوید.");
      return;
    }
    const amount = Number(money?.replace(/,/g, "") || 0);
    if (amount <= 0) {
      setError("مبلغ را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      setError("درگاه پرداخت به زودی فعال می‌شود.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
      <p className="mb-6 text-[13px] text-muted-foreground">
        مبلغ و اطلاعات کارت را وارد کنید تا به درگاه پرداخت منتقل شوید.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="rounded-lg border border-red-200/60 bg-red-50/50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="money" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            مبلغ (تومان)
          </label>
          <input
            id="money"
            type="text"
            inputMode="numeric"
            value={money}
            onChange={(e) => setMoney(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground"
            placeholder="۱۰۰۰۰۰"
          />
        </div>
        <div>
          <label htmlFor="cardNumber" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            شماره کارت
          </label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-[13px] text-foreground"
            placeholder="۱۶ رقم"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            نام صاحب کارت
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground"
            placeholder="نام و نام خانوادگی"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-[var(--primary-hover)] bg-transparent py-2.5 text-[13px] font-medium text-[var(--primary-hover)] transition-colors hover:bg-[var(--primary-hover)] hover:text-white disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              در حال انتقال…
            </span>
          ) : (
            "انتقال به درگاه پرداخت"
          )}
        </button>
      </form>
    </div>
  );
}
