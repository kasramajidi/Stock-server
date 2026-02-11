"use client";

import React, { useState, useEffect } from "react";
import type { CartItem } from "@/app/(main)/context/CartContext";
import type { StoredOrderDetailItem } from "@/app/(main)/lib/cart-storage";

interface OrderSummaryProps {
  items: CartItem[];
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
  /** جزئیات سفارش ذخیره‌شده از سبد (ایندکس به صورت رشته "0", "1", ...) */
  orderDetailsFromStorage?: Record<string, StoredOrderDetailItem> | null;
  /** با کلیک روی «انتقال به درگاه پرداخت» فراخوانی می‌شود؛ مبلغ، شماره کارت و نام صاحب کارت را می‌گیرد */
  onConfirmOrder?: (paymentGateway: string, paymentDetails?: { amount: number; cardNumber: string; name: string }) => void | Promise<void>;
}

export default function OrderSummary({
  items,
  getTotalPrice,
  formatPrice,
  orderDetailsFromStorage = null,
  onConfirmOrder,
}: OrderSummaryProps) {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [money, setMoney] = useState<string>("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const toggleDiscountInput = () => {
    setShowDiscountInput(!showDiscountInput);
  };

  const getWarrantyText = (warrantyId: string): string => {
    if (warrantyId === "36") return "36 ماهه";
    if (warrantyId === "18") return "18 ماهه";
    return "12 ماهه";
  };

  const getColorName = (colorValue: string): string => {
    if (colorValue === "black") return "مشکی";
    if (colorValue === "white") return "سفید";
    if (colorValue === "red") return "قرمز";
    return "آبی";
  };

  const getItemSubtitle = (item: CartItem): string => {
    const p = item.product as CartItem["product"] & { productType?: string; denominations?: { id: string; label: string }[] };
    if (p.productType === "service") return "خدمات ارزی / پرداخت ارزی";
    if (p.productType === "gift_card" && p.denominations?.length && item.selectedWarranty) {
      const d = p.denominations.find((x) => x.id === item.selectedWarranty);
      return d ? `مبلغ: ${d.label}` : getWarrantyText(item.selectedWarranty);
    }
    if (item.selectedWarranty) return `گارانتی: ${getWarrantyText(item.selectedWarranty)}`;
    return "";
  };

  const subtotal = getTotalPrice();
  const fastOrderFee = (orderDetailsFromStorage && items.length > 0)
    ? items.reduce((sum, item, index) => {
        if (orderDetailsFromStorage[String(index)]?.fastOrder) {
          return sum + Math.round((item.finalPrice * item.quantity) * 0.01);
        }
        return sum;
      }, 0)
    : 0;
  const total = subtotal + fastOrderFee;
  /** مبلغ مجموع به ریال برای درگاه (۱ تومان = ۱۰ ریال) */
  const totalRial = total * 10;

  useEffect(() => {
    if (paymentMethod === "card" && totalRial > 0 && !money) {
      setMoney(String(totalRial).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
  }, [paymentMethod, totalRial, money]);

  return (
    <div className="lg:col-span-2">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-lg font-medium text-gray-900 text-right mb-4">
            سفارش شما
          </h3>
          <div className="text-sm space-y-3">
            {items.map((item: CartItem, index: number) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {item.product.name}
                </h4>
                <div className="text-xs text-gray-600 space-y-0.5">
                  {getItemSubtitle(item) && <p>{getItemSubtitle(item)}</p>}
                  <p>تعداد: {item.quantity}</p>
                  {(item.product as CartItem["product"] & { productType?: string }).productType !== "service" && (
                    <p>رنگ: {getColorName(item.selectedColor)}</p>
                  )}
                  {orderDetailsFromStorage?.[String(index)]?.fastOrder && (
                    <span className="inline-block mt-1 text-[#ff5538] font-medium">سفارش سریع (۱٪)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">جمع جزء:</span>
              <span className="font-medium text-gray-900 text-sm">
                {formatPrice(subtotal)}
              </span>
            </div>
            {fastOrderFee > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">کارمزد سفارش سریع (۱٪):</span>
                <span className="font-medium text-gray-900 text-sm">
                  {formatPrice(fastOrderFee)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-700 font-medium text-sm">مجموع:</span>
              <span className="font-semibold text-[#ff5538] text-base">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* کد تخفیف */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p
            className="text-sm text-gray-700 text-center cursor-pointer hover:text-[#ff5538] transition-colors"
            onClick={toggleDiscountInput}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDiscountInput();
              }
            }}
          >
            کد تخفیف دارید؟ برای وارد کردن کد اینجا کلیک کنید
          </p>
          {showDiscountInput && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="کد تخفیف خود را وارد کنید"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538] focus:border-transparent text-sm"
                aria-label="کد تخفیف"
              />
              <button
                type="button"
                className="w-full bg-[#ff5538] text-white py-2.5 px-4 font-medium text-sm hover:opacity-90 transition-opacity rounded-lg"
              >
                اعمال کد تخفیف
              </button>
            </div>
          )}
        </div>

        {/* بخش پرداخت و انتقال به درگاه */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 text-right mb-4 flex items-center gap-2 justify-end">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            پرداخت ارزی و ثبت سفارش
          </h3>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 text-right mb-3">انتخاب روش پرداخت</h4>
            <div className="flex gap-3">
              <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-[#ff5538] bg-[#ff5538]/5" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="pay-method" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="sr-only" />
                <span className="text-sm font-medium">پرداخت با کارت</span>
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "wallet" ? "border-[#ff5538] bg-[#ff5538]/5" : "border-gray-200 hover:border-gray-300"}`}>
                <input type="radio" name="pay-method" value="wallet" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} className="sr-only" />
                <span className="text-sm font-medium">پرداخت از کیف پول</span>
              </label>
            </div>
          </div>
          {paymentError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800 text-right">
              {paymentError}
            </div>
          )}
          {paymentMethod === "card" && (
            <>
              <p className="text-sm text-gray-600 text-right mb-4">
                مبلغ و اطلاعات کارت را وارد کنید تا درخواست شما ثبت و برای کارشناسان ارسال شود.
              </p>
              <div className="space-y-4 mb-5">
                <div>
                  <label htmlFor="checkout-amount" className="block text-sm font-medium text-gray-700 text-right mb-1">مبلغ (ریال)</label>
                  <input
                    id="checkout-amount"
                    type="text"
                    inputMode="numeric"
                    placeholder={String(totalRial).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ریال"}
                    value={money}
                    onChange={(e) => setMoney(e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">معادل {formatPrice(total)} (۱ تومان = ۱۰ ریال)</p>
                </div>
                <div>
                  <label htmlFor="checkout-card" className="block text-sm font-medium text-gray-700 text-right mb-1">شماره کارت</label>
                  <input
                    id="checkout-card"
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="۱۶ رقم شماره کارت"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-right font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-name" className="block text-sm font-medium text-gray-700 text-right mb-1">نام و نام خانوادگی صاحب کارت</label>
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-right"
                  />
                </div>
              </div>
            </>
          )}
          {paymentMethod === "wallet" && (
            <p className="text-sm text-gray-600 text-right mb-5">مبلغ <span className="font-semibold text-gray-900">{formatPrice(total)}</span> از موجودی کیف پول شما کسر می‌شود.</p>
          )}
          <button
            type="button"
            disabled={isSubmitting || !onConfirmOrder}
            onClick={async () => {
              if (!onConfirmOrder || isSubmitting) return;
              setPaymentError(null);
              if (paymentMethod === "wallet") {
                setIsSubmitting(true);
                try {
                  await onConfirmOrder("wallet");
                } catch {
                  setPaymentError("خطا در پرداخت. لطفاً دوباره تلاش کنید.");
                } finally {
                  setIsSubmitting(false);
                }
                return;
              }
              const amount = Number(money?.replace(/,/g, "") || 0);
              if (amount <= 0) {
                setPaymentError("مبلغ را وارد کنید.");
                return;
              }
              if (cardNumber.replace(/\D/g, "").length < 16) {
                setPaymentError("شماره کارت باید ۱۶ رقم باشد.");
                return;
              }
              if (!cardholderName.trim()) {
                setPaymentError("نام و نام خانوادگی صاحب کارت را وارد کنید.");
                return;
              }
              setIsSubmitting(true);
              try {
                await onConfirmOrder("card-to-card", {
                  amount,
                  cardNumber,
                  name: cardholderName.trim(),
                });
              } catch {
                setPaymentError("خطا در ارسال. لطفاً دوباره تلاش کنید.");
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="w-full bg-[#ff5538] text-white py-3.5 px-6 rounded-xl font-medium text-base hover:opacity-90 transition-opacity shadow-md shadow-[#ff5538]/25 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "در حال پردازش…"
              : paymentMethod === "wallet"
              ? "پرداخت از کیف پول"
              : "ثبت سفارش"}
          </button>
        </div>
      </div>
    </div>
  );
}
