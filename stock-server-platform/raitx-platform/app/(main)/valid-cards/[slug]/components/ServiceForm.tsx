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

function useIsLoggedIn(): boolean | null {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const ok = !!(getAuthCookie() || getLoginPhoneFromStorage()?.trim());
    setIsLoggedIn(ok);
  }, []);
  return isLoggedIn;
}

interface ServiceFormProps {
  service: Service;
  initialProducts?: ShopProduct[];
}

export default function ServiceForm({
  service,
  initialProducts = [],
}: ServiceFormProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const isLoggedIn = useIsLoggedIn();
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const matchedProduct = findProductForCard(service.label, initialProducts);

  const handleRegisterOrder = async () => {
    if (!matchedProduct) return;
    setOrderError(null);
    setSubmitting(true);
    try {
      const loginPhone = getLoginPhoneFromStorage();
      if (!loginPhone?.trim()) {
        router.push(`/auth?next=/valid-cards/${service.id}`);
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

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
        {service.label}
      </h2>

      {matchedProduct ? (
        isLoggedIn ? (
          <div className="space-y-4">
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
            <p className="text-sm text-gray-600 text-right">
              برای مشاهده قیمت و ثبت سفارش وارد حساب کاربری شوید.
            </p>
            <Link
              href={`/auth?next=${encodeURIComponent(`/valid-cards/${service.id}`)}`}
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
            محصول مورد نظر را از لیست زیر انتخاب کنید.
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
