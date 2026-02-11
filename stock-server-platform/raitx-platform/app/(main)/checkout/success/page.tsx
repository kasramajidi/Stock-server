"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MainContainer from "../ui/MainContainer";
import BreadcrumbBox from "../ui/BreadcrumbBox";
import { fetchInvoicesForUser, updateInvoice } from "@/app/(main)/my-account/lib/my-account-api";
import { CheckCircle } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [updating, setUpdating] = useState(true);
  const walletDeducted = searchParams.get("wallet") === "1" ? Number(searchParams.get("deducted") || 0) : 0;
  const walletAvailable = searchParams.get("available") != null ? Number(searchParams.get("available")) : null;
  const walletBlocked = searchParams.get("blocked") != null ? Number(searchParams.get("blocked")) : null;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const orderId = searchParams.get("orderId");
        if (orderId?.trim()) {
          await fetch(`/api/order?id=${encodeURIComponent(orderId.trim())}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPaid: true, status: "پرداخت شده" }),
          });
        }
        if (cancelled) return;
        const list = await fetchInvoicesForUser();
        const unpaid = list.filter((item) => item.id != null && !item.isPaid);
        for (const item of unpaid) {
          if (cancelled) return;
          await updateInvoice(item.id!, { isPaid: true, paymentStatus: "پرداخت شده" });
        }
      } catch {
        // نادیده
      } finally {
        if (!cancelled) setUpdating(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center max-w-lg mx-auto">
      {updating ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-emerald-800 font-medium">در حال به‌روزرسانی وضعیت پرداخت…</p>
        </div>
      ) : (
        <>
          <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" aria-hidden />
          <p className="text-emerald-800 font-bold text-lg mb-2">پرداخت شما با موفقیت ثبت شد.</p>
          <p className="text-emerald-700 text-sm mb-4">
            سفارش‌های شما به‌روزرسانی شده و در بخش «سفارش‌های من» با وضعیت «پرداخت شده» نمایش داده می‌شوند.
          </p>
          {walletDeducted > 0 && (
            <div className="mb-6 text-right rounded-xl bg-white/60 border border-emerald-200 p-4 text-emerald-800 text-sm">
              <p className="font-medium mb-1">پرداخت از کیف پول</p>
              <p>مبلغ کسر شده: <span className="font-semibold">{formatPrice(walletDeducted)}</span></p>
              {walletAvailable != null && (
                <p>موجودی در دسترس: <span className="font-semibold">{formatPrice(walletAvailable)}</span></p>
              )}
              {walletBlocked != null && walletBlocked > 0 && (
                <p>موجودی بلوکه‌شده: <span className="font-semibold">{formatPrice(walletBlocked)}</span></p>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/my-account"
              className="inline-flex items-center justify-center rounded-xl bg-[#ff5538] text-white font-bold py-3 px-6 hover:opacity-90 transition-opacity"
            >
              مشاهده سفارش‌های من
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 text-gray-700 font-medium py-3 px-6 hover:bg-gray-50 transition-colors"
            >
              بازگشت به صفحهٔ اصلی
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function SuccessFallback() {
  return (
    <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center max-w-lg mx-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-emerald-800 font-medium">در حال بارگذاری…</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-6 sm:py-10">
      <MainContainer>
        <BreadcrumbBox pageName="نتیجه پرداخت" />
        <Suspense fallback={<SuccessFallback />}>
          <CheckoutSuccessContent />
        </Suspense>
      </MainContainer>
    </div>
  );
}
