"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import { useCart, type CartItem } from "../context/CartContext";
import MainContainer from "./Components/ui/MainContainer";
import BreadcrumbBox from "./Components/ui/BreadcrumbBox";
import OrderDetailsForm, {
  defaultOrderDetails,
  type OrderDetailsData,
} from "./Components/OrderDetailsForm";
import {
  COLORS,
  WARRANTIES,
  type Color,
  type Warranty,
} from "./Components/constants/productConstants";

const CART_ORDER_DETAILS_STORAGE_KEY = "cart_order_details_v1";
const EXPIRY_DAYS = 30;

export type CartContact = { name: string; phone: string };

type StoredOrderDetails = Omit<OrderDetailsData, "attachmentFile"> & { attachmentFileName?: string | null };

function serializeForStorage(data: OrderDetailsData): StoredOrderDetails {
  return {
    amount: data.amount,
    currencyType: data.currencyType,
    destinationUrl: data.destinationUrl,
    loginRequired: data.loginRequired,
    fastOrder: data.fastOrder,
    stepsDescription: data.stepsDescription,
    attachmentFileName: data.attachmentFile ? data.attachmentFile.name : null,
  };
}

function deserializeFromStorage(stored: StoredOrderDetails): OrderDetailsData {
  return {
    ...stored,
    attachmentFile: null,
  };
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const [orderDetailsByIndex, setOrderDetailsByIndex] = useState<Record<number, OrderDetailsData>>({});
  const [contact, setContact] = useState<CartContact>({ name: "", phone: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hasUser = typeof window !== "undefined" && (localStorage.getItem("user") || getAuthCookie());
    if (!hasUser) {
      router.replace("/auth?next=/cart");
      return;
    }
  }, [mounted, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CART_ORDER_DETAILS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        savedAt: number;
        expiresAt: number;
        orderDetails?: Record<string, StoredOrderDetails>;
        contact?: CartContact;
      };
      if (parsed.expiresAt < Date.now()) {
        localStorage.removeItem(CART_ORDER_DETAILS_STORAGE_KEY);
        return;
      }
      const restored: Record<number, OrderDetailsData> = {};
      for (const [key, val] of Object.entries(parsed.orderDetails || {})) {
        const idx = Number(key);
        if (!Number.isNaN(idx) && val && typeof val === "object") {
          restored[idx] = deserializeFromStorage(val as StoredOrderDetails);
        }
      }
      setOrderDetailsByIndex(restored);
      if (parsed.contact && typeof parsed.contact === "object") {
        setContact({
          name: typeof parsed.contact.name === "string" ? parsed.contact.name : "",
          phone: typeof parsed.contact.phone === "string" ? parsed.contact.phone : "",
        });
      }
    } catch {
      localStorage.removeItem(CART_ORDER_DETAILS_STORAGE_KEY);
    }
  }, [router]);

  const getOrderDetails = (index: number): OrderDetailsData =>
    orderDetailsByIndex[index] ?? defaultOrderDetails;

  const setOrderDetails = (index: number, data: OrderDetailsData) => {
    setOrderDetailsByIndex((prev) => ({ ...prev, [index]: data }));
  };

  const toggleAccordion = (index: number) => {
    setExpandedAccordion((prev) => (prev === index ? null : index));
  };

  const saveToLocalStorageAndGoToCheckout = () => {
    const orderDetailsSerialized: Record<string, StoredOrderDetails> = {};
    for (const [key, data] of Object.entries(orderDetailsByIndex)) {
      orderDetailsSerialized[key] = serializeForStorage(data);
    }
    const savedAt = Date.now();
    const expiresAt = savedAt + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    try {
      localStorage.setItem(
        CART_ORDER_DETAILS_STORAGE_KEY,
        JSON.stringify({
          savedAt,
          expiresAt,
          orderDetails: orderDetailsSerialized,
          contact: { name: contact.name.trim(), phone: contact.phone.trim() },
        })
      );
    } catch {
      // ignore
    }
    router.push("/checkout");
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getColorName = (colorValue: string): string => {
    const color: Color | undefined = COLORS.find((c) => c.value === colorValue);
    return color ? color.name : colorValue;
  };

  const getWarrantyText = (warrantyId: string): string => {
    const warranty: Warranty | undefined = WARRANTIES.find(
      (w) => w.id === warrantyId
    );
    return warranty ? warranty.text : warrantyId;
  };

  const getOptionLabel = (item: CartItem): string => {
    const p = item.product as CartItem["product"] & { productType?: string; denominations?: { id: string; label: string }[] };
    if (p.productType === "service") return "خدمات ارزی / پرداخت ارزی";
    if (p.productType === "gift_card" && p.denominations?.length && item.selectedWarranty) {
      const d = p.denominations.find((x) => x.id === item.selectedWarranty);
      return d ? `مبلغ: ${d.label}` : getWarrantyText(item.selectedWarranty);
    }
    if (item.selectedWarranty) return `گارانتی: ${getWarrantyText(item.selectedWarranty)}`;
    return "";
  };

  const showColor = (item: CartItem): boolean => {
    const t = (item.product as CartItem["product"] & { productType?: string }).productType;
    return t !== "gift_card" && t !== "service";
  };

  if (!mounted) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">در حال بارگذاری…</p>
      </div>
    );
  }

  const hasUser = typeof window !== "undefined" && (localStorage.getItem("user") || getAuthCookie());
  if (!hasUser) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">در حال انتقال به صفحهٔ ورود…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen">
        <MainContainer>
          <BreadcrumbBox pageName="سبد خرید" />
          <div className="mt-8 text-center">
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm">
              <h2 className="text-gray-800 text-sm sm:text-base font-medium">
                سبد خرید شما در حال حاضر خالی است
              </h2>
            </div>
            <button
              onClick={() => router.push("/")}
              className="bg-[#ff5538] mt-4 text-white px-6 sm:px-8 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base font-medium"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </MainContainer>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <MainContainer>
        <BreadcrumbBox pageName="سبد خرید" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-right">
                پرداخت ارزی و خدمات ارزی
              </h2>
              <p className="text-sm text-gray-600 text-right mt-1">
                سبد خرید و تسویه‌حساب برای پرداخت‌های ارزی و خدمات ارزی
              </p>
            </div>
            <div>
              <div>
                <div className="overflow-x-auto bg-white p-3 sm:p-4 rounded-2xl shadow-sm">
                  <div className="hidden sm:block">
                    <table className="w-full" aria-label="جدول سبد خرید — پرداخت ارزی و خدمات ارزی">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            محصول
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            قیمت
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            تعداد
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            جمع جزء
                          </th>
                          <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                            عملیات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item: CartItem, index: number) => (
                          <React.Fragment key={index}>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 sm:py-4 px-2 sm:px-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                    <svg
                                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 4V2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="text-right min-w-0">
                                    <h3 className="font-medium text-gray-800 text-xs sm:text-sm">
                                      {item.product.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs mt-1">
                                      {(item.product as CartItem["product"] & { productType?: string }).productType === "service"
                                        ? "خدمات ارزی / پرداخت ارزی"
                                        : `گارانتی: ${getWarrantyText(item.selectedWarranty)}، رنگ: ${getColorName(item.selectedColor)}`}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => toggleAccordion(index)}
                                      className="mt-2 text-xs text-[#ff5538] hover:underline flex items-center gap-1"
                                    >
                                      {expandedAccordion === index ? "بستن" : "اطلاعات سفارش"}
                                      <svg
                                        className={`w-4 h-4 transition-transform ${expandedAccordion === index ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                                <span className="font-medium text-gray-600 text-xs sm:text-sm">
                                  {formatPrice(item.finalPrice)}
                                </span>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      index,
                                      parseInt(e.target.value, 10) || 1
                                    )
                                  }
                                  className="w-14 sm:w-16 h-8 sm:h-10 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-xs sm:text-sm"
                                  aria-label={`تعداد ${item.product.name}`}
                                />
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                                <span className="font-bold text-gray-600 text-xs sm:text-sm">
                                  {formatPrice(item.finalPrice * item.quantity)}
                                </span>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                                <button
                                  onClick={() => removeFromCart(index)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                                  aria-label={`حذف ${item.product.name} از سبد خرید`}
                                >
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                            {expandedAccordion === index && (
                              <tr className="bg-gray-50/50">
                                <td colSpan={5} className="p-4 border-b border-gray-100">
                                  <OrderDetailsForm
                                    data={getOrderDetails(index)}
                                    onChange={(data) => setOrderDetails(index, data)}
                                    productSummary={{
                                      name: item.product.name,
                                      price: item.finalPrice,
                                      quantity: item.quantity,
                                    }}
                                    contact={contact.name || contact.phone ? contact : undefined}
                                  />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="sm:hidden space-y-4">
                    {items.map((item: CartItem, index: number) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <svg
                              className="w-6 h-6 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4V2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-brand text-sm">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-500 text-xs mt-1">
                              {getOptionLabel(item)}
                              {showColor(item) && `، رنگ: ${getColorName(item.selectedColor)}`}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              قیمت:
                            </span>
                            <span className="font-medium text-gray-900">
                              {formatPrice(item.finalPrice)}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              تعداد:
                            </span>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  index,
                                  parseInt(e.target.value, 10) || 1
                                )
                              }
                              className="w-16 h-8 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-xs"
                              aria-label={`تعداد ${item.product.name}`}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              جمع جزء:
                            </span>
                            <span className="font-bold text-gray-900">
                              {formatPrice(item.finalPrice * item.quantity)}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-600 block text-xs mb-1">
                              عملیات:
                            </span>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="w-8 h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center mx-auto"
                              aria-label={`حذف ${item.product.name} از سبد خرید`}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => toggleAccordion(index)}
                            className="text-xs text-[#ff5538] hover:underline flex items-center gap-1"
                          >
                            {expandedAccordion === index ? "بستن اطلاعات سفارش" : "پر کردن اطلاعات سفارش"}
                            <svg
                              className={`w-4 h-4 transition-transform ${expandedAccordion === index ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedAccordion === index && (
                            <div className="mt-3">
                              <OrderDetailsForm
                                data={getOrderDetails(index)}
                                onChange={(data) => setOrderDetails(index, data)}
                                productSummary={{
                                  name: item.product.name,
                                  price: item.finalPrice,
                                  quantity: item.quantity,
                                }}
                                contact={contact.name || contact.phone ? contact : undefined}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 bg-white p-3 sm:p-4 rounded-2xl shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="discount-code" className="sr-only">
                        کد تخفیف
                      </label>
                      <input
                        id="discount-code"
                        type="text"
                        placeholder="کد تخفیف"
                        className="w-full h-10 sm:h-12 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 text-right text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-xs sm:text-sm"
                        aria-label="کد تخفیف"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[#ff5538] hover:opacity-90 text-white px-4 sm:px-6 py-2 rounded-lg transition-opacity cursor-pointer whitespace-nowrap text-xs sm:text-sm font-medium"
                    >
                      اعمال کد تخفیف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <aside
              className="bg-white rounded-2xl p-4 sm:p-6 sticky top-8 shadow-sm space-y-4 sm:space-y-6"
              aria-label="خلاصه سبد خرید"
            >
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 text-right mb-3">
                  اطلاعات تماس
                </h4>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="cart-contact-name" className="block text-xs text-gray-600 text-right mb-1">
                      نام
                    </label>
                    <input
                      id="cart-contact-name"
                      type="text"
                      value={contact.name}
                      onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      placeholder="نام شما"
                      className="w-full h-9 sm:h-10 bg-white border border-gray-200 rounded-lg px-3 text-right text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent"
                      aria-label="نام"
                    />
                  </div>
                  <div>
                    <label htmlFor="cart-contact-phone" className="block text-xs text-gray-600 text-right mb-1">
                      شماره تماس
                    </label>
                    <input
                      id="cart-contact-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full h-9 sm:h-10 bg-white border border-gray-200 rounded-lg px-3 text-right text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent"
                      aria-label="شماره تماس"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 text-right mb-4 sm:mb-6">
                جمع کل سبد خرید
              </h3>

              {(() => {
                const subtotal = getTotalPrice();
                const fastOrderFee = items.reduce((sum, item, index) => {
                  if (getOrderDetails(index).fastOrder) {
                    return sum + Math.round((item.finalPrice * item.quantity) * 0.01);
                  }
                  return sum;
                }, 0);
                const total = subtotal + fastOrderFee;
                return (
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        جمع جزء:
                      </span>
                      <span className="font-medium text-gray-800 text-xs sm:text-sm">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    {fastOrderFee > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-xs sm:text-sm">
                          کارمزد سفارش سریع (۱٪):
                        </span>
                        <span className="font-medium text-gray-800 text-xs sm:text-sm">
                          {formatPrice(fastOrderFee)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        تخفیف:
                      </span>
                      <span className="font-medium text-gray-600 text-xs sm:text-sm">
                        0 تومان
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                          مجموع:
                        </span>
                        <span className="font-bold text-[#ff5538] text-base sm:text-lg">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <button
                onClick={saveToLocalStorageAndGoToCheckout}
                className="w-full bg-[#ff5538] text-white py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity mb-3 sm:mb-4 font-medium"
              >
                ادامه جهت تسویه حساب
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm"
              >
                پاک کردن سبد خرید
              </button>
            </aside>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
