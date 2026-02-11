"use client";

import ReactCountryFlag from "react-country-flag";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface SimCardType {
  id: string;
  title: string;
  subtitle: string;
  titleEn: string;
  href: string;
  flagCode?: string;
  icon?: React.ReactNode;
}

const simCardTypes: SimCardType[] = [
  {
    id: "austria-sim",
    title: "خرید سیم کارتهای اتریش",
    subtitle: "سیم کارتهای اتریش با کیفیت بالا",
    titleEn: "Austria SIM Cards",
    href: "/currency-payment",
    flagCode: "AT",
  },
  {
    id: "ee-uk-sim",
    title: "سیم کارت EE انگلستان",
    subtitle: "سیم کارت اختصاصی انگلستان",
    titleEn: "EE UK SIM Card",
    href: "/currency-payment",
    flagCode: "GB",
  },
  {
    id: "world-sim",
    title: "سیم کارت بین المللی World Sim",
    subtitle: "سیم کارت جهانی با پوشش گسترده",
    titleEn: "World Sim International",
    href: "/currency-payment",
    icon: (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-white text-2xl sm:text-3xl">🌍</span>
      </div>
    ),
  },
  {
    id: "asda-sim",
    title: "سیم کارت فیزیکی ASDA",
    subtitle: "سیم کارت ASDA با قیمت مناسب",
    titleEn: "ASDA Physical SIM",
    href: "/currency-payment",
    icon: (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-600 flex items-center justify-center">
        <span className="text-white text-lg sm:text-xl font-bold">ASDA</span>
      </div>
    ),
  },
  {
    id: "georgia-sim",
    title: "سیم کارت فیزیکی گرجستان",
    subtitle: "سیم کارت فیزیکی گرجستان",
    titleEn: "Georgia Physical SIM",
    href: "/currency-payment",
    flagCode: "GE",
  },
  {
    id: "estonia-sim",
    title: "سیم کارت بین المللی استونی",
    subtitle: "سیم کارت استونی برای اروپا",
    titleEn: "Estonia International SIM",
    href: "/currency-payment",
    flagCode: "EE",
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

interface SimCardTypesProps {
  initialProducts?: ShopProduct[];
}

export default function SimCardTypes({
  initialProducts = [],
}: SimCardTypesProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        خرید انواع سیم کارت خارجی و بین المللی
      </h2>
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید معتبرترین سیم کارت‌های بین المللی از طریق خدمت پرداخت ارزی ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر سیم کارت کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {simCardTypes.map((simCard) => {
          const matched =
            findProductForCard(simCard.title, initialProducts) ||
            findProductForCard(simCard.titleEn, initialProducts);
          const isSelected = matched && selectedProduct?.id === matched.id;
          if (matched && setSelectedProduct) {
            return (
              <button
                key={simCard.id}
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
                className={`bg-white rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 border-2 text-right flex flex-col w-full ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-blue-300"
                } group`}
              >
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="mb-3 sm:mb-4">
                    {simCard.flagCode ? (
                      <ReactCountryFlag
                        countryCode={simCard.flagCode}
                        svg
                        style={{ width: "4rem", height: "4rem" }}
                        title={simCard.flagCode}
                        className="rounded-lg"
                      />
                    ) : (
                      simCard.icon
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {simCard.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-2">
                    {simCard.subtitle}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">
                    {simCard.titleEn}
                  </p>
                </div>
              </button>
            );
          }
          return (
            <div
              key={simCard.id}
              className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-100 group opacity-90"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4">
                  {simCard.flagCode ? (
                    <ReactCountryFlag
                      countryCode={simCard.flagCode}
                      svg
                      style={{ width: "4rem", height: "4rem" }}
                      title={simCard.flagCode}
                      className="rounded-lg"
                    />
                  ) : (
                    simCard.icon
                  )}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2">
                  {simCard.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-2">
                  {simCard.subtitle}
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-400">
                  {simCard.titleEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
