"use client";

import { HiChip, HiDatabase, HiGlobe } from "react-icons/hi";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

const plans = [
  {
    id: "1-day",
    title: "پلن ۱ روزه",
    titleEn: "VPS Daily 1 day",
    subtitle: "سرور مجازی یک‌روزه",
    price: "2",
    period: "۱ روزه",
    features: [
      "پردازنده مناسب",
      "رم کافی",
      "فضای ذخیره‌سازی",
      "ترافیک نامحدود",
      "پهنای باند بالا",
    ],
    bgClass: "bg-[#ff5538]/5",
  },
  {
    id: "5-day",
    title: "پلن ۵ روزه",
    titleEn: "VPS Daily 5 day",
    subtitle: "سرور مجازی پنج‌روزه",
    price: "3",
    period: "۵ روزه",
    features: [
      "پردازنده مناسب",
      "رم کافی",
      "فضای ذخیره‌سازی",
      "ترافیک نامحدود",
      "پهنای باند بالا",
    ],
    bgClass: "bg-[#1a3760]/5",
  },
];

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

interface VPSDailyPlansProps {
  initialProducts?: ShopProduct[];
}

export default function VPSDailyPlans({
  initialProducts = [],
}: VPSDailyPlansProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="vps-daily-plans-heading"
      className="rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-daily-plans-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        ویژگی‌ها و امکانات پلن‌های سرور مجازی روزانه
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        پلن‌های مختلف سرور مجازی روزانه برای نیازهای کوتاه‌مدت شما
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر پلن کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const matched =
            findProductForCard(plan.title, initialProducts) ||
            findProductForCard(plan.titleEn, initialProducts);
          const isSelected = matched && selectedProduct?.id === matched.id;
          const priceDisplay = matched
            ? formatPrice(matched.price)
            : `${plan.price} USD`;

          if (matched && setSelectedProduct) {
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => {
                  setSelectedProduct(isSelected ? null : matched);
                  if (typeof window !== "undefined" && window.innerWidth < 768 && matched) {
                    setTimeout(
                      () =>
                        document.getElementById("order-box")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      150
                    );
                  }
                }}
                className={`${plan.bgClass} rounded-xl p-6 shadow-sm border-2 w-full text-right transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-[#ff5538]/20"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-[#ff5538] tabular-nums">
                    {priceDisplay}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.period}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-[#ff5538] shrink-0">
                        {i < 3 ? (
                          i === 0 ? (
                            <HiChip className="text-lg" />
                          ) : i === 1 ? (
                            <HiDatabase className="text-lg" />
                          ) : (
                            <HiGlobe className="text-lg" />
                          )
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#ff5538]" />
                        )}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            );
          }

          return (
            <div
              key={plan.id}
              className={`${plan.bgClass} rounded-xl p-6 shadow-sm border border-gray-100 opacity-90`}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-sm text-gray-500">USD</span>
                <span className="text-2xl font-bold text-[#ff5538]">{plan.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{plan.period}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="text-[#ff5538] shrink-0">
                      {i < 3 ? (
                        i === 0 ? (
                          <HiChip className="text-lg" />
                        ) : i === 1 ? (
                          <HiDatabase className="text-lg" />
                        ) : (
                          <HiGlobe className="text-lg" />
                        )
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#ff5538]" />
                      )}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
