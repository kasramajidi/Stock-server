"use client";

import { FaWhatsapp } from "react-icons/fa";
import { SiOpenai, SiPaypal, SiGoogle } from "react-icons/si";
import { MdShare, MdPhone } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface VirtualNumberType {
  id: string;
  title: string;
  subtitle: string;
  titleEn: string;
  icon?: React.ReactNode;
  iconColor: string;
}

const virtualNumberTypes: VirtualNumberType[] = [
  {
    id: "openai-virtual-number",
    title: "شماره مجازی OpenAI",
    subtitle: "شماره مجازی برای ثبت نام در OpenAI",
    titleEn: "OpenAI Virtual Number",
    icon: <SiOpenai className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-green-600",
  },
  {
    id: "usa-virtual-number",
    title: "شماره مجازی آمریکا",
    subtitle: "شماره مجازی آمریکا برای سرویسهای مختلف",
    titleEn: "USA Virtual Number",
    icon: (
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{
          width: "3.5rem",
          height: "3.5rem",
        }}
        title="US"
        className="rounded-lg"
      />
    ),
    iconColor: "bg-red-600",
  },
  {
    id: "paypal-virtual-number",
    title: "شماره مجازی PayPal",
    subtitle: "شماره مجازی برای تایید حساب PayPal",
    titleEn: "PayPal Virtual Number",
    icon: <SiPaypal className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-blue-600",
  },
  {
    id: "social-media-virtual-number",
    title: "شماره مجازی شبکه های اجتماعی",
    subtitle: "شماره مجازی برای ثبت نام در شبکه های اجتماعی",
    titleEn: "Social Media Virtual Number",
    icon: <MdShare className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-purple-600",
  },
  {
    id: "whatsapp-virtual-number",
    title: "شماره مجازی WhatsApp",
    subtitle: "شماره مجازی برای ایجاد حساب WhatsApp",
    titleEn: "WhatsApp Virtual Number",
    icon: <FaWhatsapp className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-green-500",
  },
  {
    id: "google-voice-number",
    title: "شماره مجازی Google Voice",
    subtitle: "شماره مجازی Google Voice با قیمت ۹ دلار",
    titleEn: "Google Voice Number",
    icon: (
      <div className="flex items-center justify-center gap-1">
        <SiGoogle className="text-white text-2xl sm:text-3xl" />
        <MdPhone className="text-white text-xl sm:text-2xl" />
      </div>
    ),
    iconColor: "bg-[#ff5538]",
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

interface VirtualNumberTypesProps {
  initialProducts?: ShopProduct[];
}

export default function VirtualNumberTypes({
  initialProducts = [],
}: VirtualNumberTypesProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        انواع شماره مجازی
      </h2>
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید انواع شماره های مجازی برای سرویسهای مختلف از طریق ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر شماره مجازی کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {virtualNumberTypes.map((virtualNumber) => {
          const matched =
            findProductForCard(virtualNumber.title, initialProducts) ||
            findProductForCard(virtualNumber.titleEn, initialProducts);
          const isSelected = matched && selectedProduct?.id === matched.id;
          if (matched && setSelectedProduct) {
            return (
              <button
                key={virtualNumber.id}
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
                className={`bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-2 text-right flex flex-col w-full group ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-blue-400"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 sm:mb-5">
                    {virtualNumber.id === "usa-virtual-number" ? (
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center overflow-hidden shadow-md`}>
                        {virtualNumber.icon}
                      </div>
                    ) : (
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        {virtualNumber.icon}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors min-h-10 flex items-center justify-center">
                    {virtualNumber.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-5 sm:leading-6 mb-2 sm:mb-3 min-h-10">
                    {virtualNumber.subtitle}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {virtualNumber.titleEn}
                  </p>
                </div>
              </button>
            );
          }
          return (
            <div
              key={virtualNumber.id}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 opacity-90"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 sm:mb-5">
                  {virtualNumber.id === "usa-virtual-number" ? (
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center overflow-hidden shadow-md`}>
                      {virtualNumber.icon}
                    </div>
                  ) : (
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center shadow-md`}>
                      {virtualNumber.icon}
                    </div>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 min-h-10 flex items-center justify-center">
                  {virtualNumber.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-5 sm:leading-6 mb-2 sm:mb-3 min-h-10">
                  {virtualNumber.subtitle}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {virtualNumber.titleEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
