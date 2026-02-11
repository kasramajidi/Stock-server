"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  getLoginPhoneFromStorage,
  requestWalletPaymentLink,
} from "../lib/my-account-api";

export default function WalletIncreaseSection() {
  const [money, setMoney] = useState<string>("");
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
      const url = await requestWalletPaymentLink({
        phone,
        money: amount,
        cardNumber,
        name: name.trim(),
      });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت لینک پرداخت.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">افزایش اعتبار</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          مبلغ و اطلاعات کارت را وارد کنید تا به درگاه پرداخت منتقل شوید.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="wallet-amount" className="block text-sm font-medium text-gray-700 mb-1">
            مبلغ (ریال)
          </label>
          <input
            id="wallet-amount"
            type="text"
            inputMode="numeric"
            placeholder="مثال: 100000"
            value={money}
            onChange={(e) => setMoney(e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-left"
          />
        </div>
        <div>
          <label htmlFor="wallet-card" className="block text-sm font-medium text-gray-700 mb-1">
            شماره کارت
          </label>
          <input
            id="wallet-card"
            type="text"
            inputMode="numeric"
            maxLength={19}
            placeholder="۱۶ رقم شماره کارت"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-left font-mono"
          />
        </div>
        <div>
          <label htmlFor="wallet-name" className="block text-sm font-medium text-gray-700 mb-1">
            نام و نام خانوادگی صاحب کارت
          </label>
          <input
            id="wallet-name"
            type="text"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#ff5538] text-white font-bold py-3 px-4 hover:opacity-90 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              در حال انتقال به درگاه…
            </>
          ) : (
            "انتقال به درگاه پرداخت"
          )}
        </button>
      </form>
    </div>
  );
}
