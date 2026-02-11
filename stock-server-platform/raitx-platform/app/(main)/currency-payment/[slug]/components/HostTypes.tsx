"use client";

import { MdCloud, MdStorage, MdComputer, MdPublic } from "react-icons/md";
import { HiServer, HiGlobe } from "react-icons/hi";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface HostType {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  icon: React.ReactNode;
}

const hostTypes: HostType[] = [
  {
    id: "cloud-host",
    title: "هاست ابری",
    description: "هاست ابری با قابلیت مقیاس‌پذیری",
    titleEn: "Cloud Hosting",
    icon: <MdCloud className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "dedicated-host",
    title: "هاست اختصاصی",
    description: "سرور اختصاصی با منابع کامل",
    titleEn: "Dedicated Hosting",
    icon: <HiServer className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "shared-host",
    title: "هاست اشتراکی",
    description: "مناسب برای وب‌سایت‌های کوچک و متوسط",
    titleEn: "Shared Hosting",
    icon: <MdStorage className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "hetzner-host",
    title: "هاست Hetzner",
    description: "هاست آلمانی Hetzner با کیفیت بالا",
    titleEn: "Hetzner Hosting",
    icon: <MdComputer className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "godaddy-host",
    title: "هاست GoDaddy",
    description: "هاست معتبر GoDaddy با پشتیبانی کامل",
    titleEn: "GoDaddy Hosting",
    icon: <HiGlobe className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "vps-host",
    title: "سرور مجازی VPS",
    description: "سرور مجازی با کنترل کامل",
    titleEn: "VPS Hosting",
    icon: <MdPublic className="text-white text-2xl sm:text-3xl" />,
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

interface HostTypesProps {
  initialProducts?: ShopProduct[];
}

export default function HostTypes({
  initialProducts = [],
}: HostTypesProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        انواع هاست خارجی
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید انواع هاست‌های خارجی از بهترین ارائه‌دهندگان جهان از طریق ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر نوع هاست کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {hostTypes.map((item) => {
          const matched =
            findProductForCard(item.title, initialProducts) ||
            findProductForCard(item.titleEn, initialProducts);
          const isSelected = matched && selectedProduct?.id === matched.id;

          if (matched && setSelectedProduct) {
            return (
              <button
                key={item.id}
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
                className={`bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-2 transition-all duration-200 w-full text-right group hover:shadow-md ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#1a3760] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 text-center">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-5">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {item.titleEn}
                </p>
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 opacity-90"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#1a3760] flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-5">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 text-center">
                {item.titleEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
