"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/(main)/context/CartContext";
import { getCartOrderDetailsFromStorage, type StoredOrderDetailItem } from "@/app/(main)/lib/cart-storage";
import { createInvoice, getLoginPhoneFromStorage, normalizePhoneForComparison, fetchInvoicesForUser, updateInvoice, requestWalletPaymentLink, validateWalletBalance, payFromWallet } from "@/app/(main)/my-account/lib/my-account-api";
import MainContainer from "./ui/MainContainer";
import BreadcrumbBox from "./ui/BreadcrumbBox";
import OrderSummary from "./Components/OrderSummary";
import BillingDetails from "./Components/BillingDetails";
import EmptyCartState from "./Components/EmptyCartState";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [contact, setContact] = useState<{ name: string; phone: string } | null>(null);
  const [orderDetails, setOrderDetails] = useState<Record<string, StoredOrderDetailItem> | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const DISABLE_PAYMENT_GATEWAY = false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    const { contact: storedContact, orderDetails: storedOrderDetails } = getCartOrderDetailsFromStorage();
    if (storedContact) setContact(storedContact);
    if (storedOrderDetails) setOrderDetails(storedOrderDetails);
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const handleConfirmOrder = useCallback(
    async (paymentGateway: string, paymentDetails?: { amount: number; cardNumber: string; name: string }) => {
      setSubmitError(null);
      setSubmitSuccess(null);
      const name = (document.getElementById("first-name") as HTMLInputElement | null)?.value?.trim();
      const phone = (document.getElementById("billing-phone") as HTMLInputElement | null)?.value?.trim();
      const company = (document.getElementById("company") as HTMLInputElement | null)?.value?.trim();
      const orderNotes = (document.getElementById("order-notes") as HTMLTextAreaElement | null)?.value?.trim();
      if (!name || !phone) {
        setSubmitError("نام و شماره تماس را وارد کنید.");
        return;
      }
      const subtotal = getTotalPrice();
      const fastOrderFee =
        orderDetails && items.length > 0
          ? items.reduce((sum, item, index) => {
              if (orderDetails[String(index)]?.fastOrder) {
                return sum + Math.round(item.finalPrice * item.quantity * 0.01);
              }
              return sum;
            }, 0)
          : 0;
      const total = subtotal + fastOrderFee;
      const userid = normalizePhoneForComparison(getLoginPhoneFromStorage() || phone || "");
      if (!userid) {
        setSubmitError("شماره تماس معتبر برای ثبت فاکتور نیست.");
        return;
      }
      if (!DISABLE_PAYMENT_GATEWAY && paymentGateway === "wallet") {
        const balanceCheck = await validateWalletBalance(total);
        if (!balanceCheck.ok) {
          setSubmitError(balanceCheck.message ?? "موجودی کیف پول کافی نیست.");
          return;
        }
      }
      const invoiceItems = items.map((item) => ({
        shopid: item.product.id,
        userid,
        quantity: item.quantity,
        isPaid: false,
        paymentStatus: "not payed",
        ...(item.finalPrice != null && { price: item.finalPrice }),
      }));
      const invoiceOk = await createInvoice(invoiceItems);
      if (!invoiceOk) {
        setSubmitError("ثبت فاکتور در سامانه انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }
      const payload = {
        contact: { name, phone },
        company: company || undefined,
        orderNotes: orderNotes || undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          finalPrice: item.finalPrice,
          selectedColor: item.selectedColor,
          selectedWarranty: item.selectedWarranty,
          productType: (item.product as { productType?: string }).productType,
        })),
        orderDetails: orderDetails
          ? Object.fromEntries(
              Object.entries(orderDetails).map(([k, v]) => [
                k,
                { fastOrder: v.fastOrder, stepsDescription: v.stepsDescription },
              ])
            )
          : {},
        paymentGateway,
        subtotal,
        fastOrderFee,
        total,
      };
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "خطا در ثبت سفارش.");
        return;
      }
      const orderId = data.orderId as string | undefined;
      if (DISABLE_PAYMENT_GATEWAY) {
        clearCart();
        router.push("/my-account/orders");
        return;
      }
      if (paymentDetails) {
        try {
          const phone = (document.getElementById("billing-phone") as HTMLInputElement | null)?.value?.trim() || getLoginPhoneFromStorage() || "";
          const url = await requestWalletPaymentLink({
            phone,
            money: paymentDetails.amount,
            cardNumber: paymentDetails.cardNumber,
            name: paymentDetails.name,
          });
          clearCart();
          window.location.href = url;
          return;
        } catch (err) {
          setSubmitError(err instanceof Error ? err.message : "خطا در دریافت لینک درگاه پرداخت.");
          return;
        }
      }
      if (paymentGateway === "wallet") {
        const payResult = await payFromWallet(total);
        if (!payResult.success) {
          setSubmitError(payResult.error ?? "پرداخت از کیف پول انجام نشد.");
          return;
        }
        try {
          const list = await fetchInvoicesForUser();
          const unpaid = list.filter((item) => item.id != null && !item.isPaid);
          for (const item of unpaid) await updateInvoice(item.id!, { isPaid: true, paymentStatus: "پرداخت شده" });
        } catch {
          // نادیده
        }
        if (orderId) {
          try {
            await fetch(`/api/order?id=${encodeURIComponent(orderId)}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isPaid: true, status: "پرداخت شده" }),
            });
          } catch {
            // نادیده
          }
        }
        clearCart();
        const q = new URLSearchParams();
        q.set("wallet", "1");
        q.set("deducted", String(total));
        if (payResult.availableBalance != null) q.set("available", String(payResult.availableBalance));
        if (payResult.blockedBalance != null) q.set("blocked", String(payResult.blockedBalance));
        router.push(`/checkout/success?${q.toString()}`);
        return;
      }
      setSubmitSuccess("پرداخت با موفقیت انجام شد.");
      clearCart();
      if (orderId) {
        (async () => {
          try {
            await fetch(`/api/order?id=${encodeURIComponent(orderId)}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isPaid: true, status: "پرداخت شده" }),
            });
          } catch {
            // نادیده
          }
        })();
      }
      (async () => {
        try {
          const list = await fetchInvoicesForUser();
          const unpaid = list.filter((item) => item.id != null && !item.isPaid);
          for (const item of unpaid) await updateInvoice(item.id!, { isPaid: true, paymentStatus: "پرداخت شده" });
        } catch {
          // نادیده
        }
      })();
      setTimeout(() => router.push("/checkout/success"), 1500);
    },
    [items, getTotalPrice, orderDetails, clearCart, router]
  );

  if (!mounted) {
    return (
      <div className="bg-surface min-h-screen py-12 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">در حال بارگذاری…</p>
      </div>
    );
  }

  if (items.length === 0 && !submitSuccess) {
    return <EmptyCartState />;
  }
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-6 sm:py-10">
        <MainContainer>
          <BreadcrumbBox pageName="تسویه حساب" />
          <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center max-w-lg mx-auto">
            <p className="text-emerald-800 font-medium mb-2">{submitSuccess}</p>
            <p className="text-emerald-700 text-sm">در حال انتقال به صفحهٔ اصلی…</p>
          </div>
        </MainContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-6 sm:py-10">
      <MainContainer>
        <BreadcrumbBox pageName="تسویه حساب" />

        <div className="mt-6 sm:mt-10">
          {/* هدر پرداخت ارزی و خدمات ارزی */}
          <header className="mb-8 sm:mb-10 rounded-2xl bg-linear-to-l from-[#ff5538]/10 via-white to-white border border-[#ff5538]/20 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-right">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  پرداخت ارزی و خدمات ارزی
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl">
                  اطلاعات تماس را تکمیل کنید. پس از ثبت سفارش، برای تکمیل پرداخت ارزی با شما تماس گرفته می‌شود.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <ShoppingCart size={18} className="text-[#ff5538]" />
                  سبد خرید
                </span>
                <span className="text-gray-300" aria-hidden>←</span>
                <span className="flex items-center gap-1.5 font-medium text-[#ff5538] text-sm">
                  <CreditCard size={18} />
                  تسویه حساب
                </span>
              </div>
            </div>
          </header>

          {(submitError || submitSuccess) && (
            <div
              className={`mb-6 rounded-xl px-4 py-3 text-right text-sm ${
                submitSuccess ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
              }`}
              role="alert"
            >
              {submitSuccess ?? submitError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            <BillingDetails initialContact={contact ?? undefined} />
            <OrderSummary
              items={items}
              getTotalPrice={getTotalPrice}
              formatPrice={formatPrice}
              orderDetailsFromStorage={orderDetails}
              onConfirmOrder={handleConfirmOrder}
            />
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
