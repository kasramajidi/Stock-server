"use client";

import { FaSearch } from "react-icons/fa";
import { HiChartBar, HiGlobe, HiCheckCircle } from "react-icons/hi";
import { MdAnalytics } from "react-icons/md";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface SeoTool {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  icon: React.ReactNode;
  iconBg: string;
}

const seoTools: SeoTool[] = [
  {
    id: "kwfinder",
    title: "KWFinder",
    description: "ابزار تحقیق کلمات کلیدی با حجم جستجوی دقیق",
    titleEn: "KWFinder Account",
    icon: <FaSearch className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-red-500",
  },
  {
    id: "moz",
    title: "MOZ Pro",
    description: "مجموعه نرم‌افزار سئو برای بهبود رتبه در جستجو",
    titleEn: "MOZ Pro Account",
    icon: <HiChartBar className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-600",
  },
  {
    id: "ahrefs",
    title: "Ahrefs",
    description: "ابزار قدرتمند سئو برای تحلیل بک‌لینک و تحقیق کلمات کلیدی",
    titleEn: "Ahrefs Account",
    icon: <HiGlobe className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-500",
  },
  {
    id: "semrush",
    title: "SEMrush",
    description: "ابزار کامل سئو برای تحقیق کلمات کلیدی، تحلیل رقبا و ممیزی سایت",
    titleEn: "SEMrush Account",
    icon: <MdAnalytics className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#ff5538]",
  },
  {
    id: "woorank",
    title: "Woorank",
    description: "ابزار تحلیل سایت و سئو برای بازاریابان دیجیتال",
    titleEn: "Woorank Account",
    icon: <HiCheckCircle className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-sky-500",
  },
  {
    id: "seoptimer",
    title: "SEOptimer",
    description: "ابزار ممیزی سئو برای تحلیل جامع سایت",
    titleEn: "SEOptimer Account",
    icon: <FaSearch className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-indigo-500",
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

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ابزارهای سئو",
  description: "خرید انواع اکانت‌های پریمیوم ابزارهای سئو از طریق ريتكس",
  numberOfItems: 6,
  itemListElement: seoTools.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

interface SeoToolsProps {
  initialProducts?: ShopProduct[];
}

export default function SeoTools({
  initialProducts = [],
}: SeoToolsProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="seo-tools-heading"
      className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="seo-tools-heading"
        className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center flex items-center justify-center gap-2"
      >
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
        ابزارهای سئو
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        خرید انواع اکانت‌های پریمیوم ابزارهای سئو از طریق ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر ابزار کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div
        aria-label="ابزارهای سئو برای خرید اکانت"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {seoTools.map((item) => {
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
                  setSelectedProduct?.(isSelected ? null : matched);
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
                title={`خرید اکانت ${item.title}`}
                aria-label={`خرید اکانت ${item.title} - ${item.description}`}
                className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border-2 flex flex-col h-full w-full text-right transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-[#ff5538]/20"
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300`}
                    aria-hidden
                  >
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 text-center">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-6 flex-1">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 text-center mb-4 not-italic font-medium">
                  {item.titleEn}
                </p>
                <p className="text-xs sm:text-sm text-[#1a3760] font-semibold text-center flex justify-center group-hover:text-[#ff5538] transition-colors duration-200 mt-auto">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    خرید اکانت
                    <span className="shrink-0 rtl:rotate-180">&lt;</span>
                  </span>
                </p>
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col h-full opacity-90"
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.iconBg} flex items-center justify-center shadow-md`}
                  aria-hidden
                >
                  {item.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-6 flex-1">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 text-center mb-4 not-italic font-medium">
                {item.titleEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
