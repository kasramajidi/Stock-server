"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Service } from "../../components/servicesData";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useCart, type CartItem } from "@/app/(main)/context/CartContext";
import {
  createInvoice,
  getLoginPhoneFromStorage,
  normalizePhoneForComparison,
} from "@/app/(main)/my-account/lib/my-account-api";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

const API_URL = "/api/auth-proxy?action=ExamRegister";

function findProductForCard(
  cardLabel: string,
  products: ShopProduct[]
): ShopProduct | undefined {
  const n = (s: string) => s.trim().replace(/\s+/g, " ");
  const a = n(cardLabel);
  if (!a) return undefined;
  const exact = products.find((p) => n(p.name) === a);
  if (exact) return exact;
  return products.find(
    (p) => n(p.name).includes(a) || a.includes(n(p.name))
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

interface ServiceFormProps {
  service: Service;
  /** وقتی پاس داده شود (مثلاً سیم کارت بین المللی)، باکس ثبت سفارش مثل کارت‌های اعتباری نمایش داده می‌شود */
  initialProducts?: ShopProduct[];
}

function useIsLoggedIn(): boolean | null {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const ok = !!(getAuthCookie() || getLoginPhoneFromStorage()?.trim());
    setIsLoggedIn(ok);
  }, []);
  return isLoggedIn;
}

export default function ServiceForm({
  service,
  initialProducts,
}: ServiceFormProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const isLoggedIn = useIsLoggedIn();
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const useOrderFlow = initialProducts !== undefined;
  const selection = useInternationalSimSelection();
  const selectedSimProduct = selection?.selectedProduct ?? null;
  const labelMatchedProduct = useOrderFlow ? findProductForCard(service.label, initialProducts ?? []) : undefined;
  const labelMatchedEn = useOrderFlow ? findProductForCard(service.labelEn ?? "", initialProducts ?? []) : undefined;
  const matchedProduct = useOrderFlow
    ? (selection ? (selectedSimProduct ?? labelMatchedProduct ?? labelMatchedEn) : (labelMatchedProduct ?? labelMatchedEn))
    : undefined;

  const handleRegisterOrder = async () => {
    if (!matchedProduct) return;
    setOrderError(null);
    setSubmitting(true);
    try {
      const loginPhone = getLoginPhoneFromStorage();
      if (!loginPhone?.trim()) {
        router.push(`/auth?next=/currency-payment/${service.id}`);
        return;
      }
      const userid = normalizePhoneForComparison(loginPhone);
      if (!userid) {
        setOrderError("شماره تماس معتبر برای ثبت سفارش یافت نشد.");
        return;
      }
      const ok = await createInvoice([
        {
          shopid: matchedProduct.id,
          userid,
          quantity: 1,
          isPaid: false,
          paymentStatus: "not payed",
          price: matchedProduct.price,
        },
      ]);
      if (!ok) {
        setOrderError("ثبت سفارش در سامانه انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }
      const cartItem: CartItem = {
        product: { ...matchedProduct },
        quantity: 1,
        selectedColor: "",
        selectedWarranty: "",
        finalPrice: matchedProduct.price,
      };
      addToCart(cartItem);
      router.push("/cart");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    try {
      const payload = {
        title: formData.subject.trim() || service.label,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.description,
        date: new Date().toISOString(),
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : "خطا در ارسال درخواست");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", description: "" });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  if (useOrderFlow) {
    return (
      <div id="order-box" className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
          {service.label}
        </h2>

        {matchedProduct ? (
          isLoggedIn ? (
            <div className="space-y-4">
              {selectedSimProduct && (
                <p className="text-xs text-gray-600 text-right">
                  {selectedSimProduct.name}
                </p>
              )}
              <p className="text-base font-bold text-[#ff5538] tabular-nums text-right">
                {formatPrice(matchedProduct.price)}
              </p>
              {orderError && (
                <p className="text-sm text-red-600 text-right">{orderError}</p>
              )}
              <button
                type="button"
                onClick={handleRegisterOrder}
                disabled={submitting}
                className="w-full text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#ff5538" }}
              >
                {submitting ? "در حال ثبت…" : "ثبت سفارش"}
              </button>
              <p className="text-[10px] sm:text-xs text-gray-500 text-right">
                پس از ثبت، به سبد خرید منتقل می‌شوید.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedSimProduct && (
                <p className="text-xs text-gray-600 text-right">
                  {selectedSimProduct.name}
                </p>
              )}
              <p className="text-sm text-gray-600 text-right">
                برای مشاهده قیمت و ثبت سفارش وارد حساب کاربری شوید.
              </p>
              <Link
                href={`/auth?next=${encodeURIComponent(`/currency-payment/${service.id}`)}`}
                className="block w-full text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-opacity hover:opacity-90 text-center cursor-pointer"
                style={{ backgroundColor: "#ff5538" }}
              >
                ورود / ثبت‌نام
              </Link>
            </div>
          )
        ) : (
          <div className="space-y-3 text-right">
            <p className="text-xs sm:text-sm text-gray-600">
              {selection
                ? service.id === "international-sim"
                  ? "یک سیم کارت را از لیست زیر انتخاب کنید."
                  : "محصول مورد نظر را از لیست زیر انتخاب کنید."
                : "محصول مورد نظر را از لیست زیر انتخاب کنید."}
            </p>
            <button
              type="button"
              disabled
              className="w-full text-center text-gray-400 text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg cursor-not-allowed bg-gray-200"
            >
              ابتدا یک گزینه از لیست زیر انتخاب کنید
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
        درخواست {service.label}
      </h2>
      <form onSubmit={handleRequestSubmit} className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              ایمیل
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            شماره تماس
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            placeholder="09123456789"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            موضوع
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            placeholder="موضوع درخواست را وارد کنید"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            توضیحات (اختیاری)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent resize-none text-right"
            placeholder="توضیحات اضافی را اینجا وارد کنید"
          />
        </div>
        {submitStatus === "success" && (
          <p className="text-sm text-green-600 text-right">
            درخواست شما با موفقیت ارسال شد.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-sm text-red-600 text-right">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#ff5538" }}
        >
          {submitting ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </form>
    </div>
  );
}
