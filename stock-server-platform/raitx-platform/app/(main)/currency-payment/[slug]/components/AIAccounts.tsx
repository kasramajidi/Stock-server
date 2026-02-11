"use client";

import { FaImage, FaPenFancy, FaVideo, FaPalette, FaFileAlt } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface AIAccount {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  icon: React.ReactNode;
  iconBg: string;
}

const aiAccounts: AIAccount[] = [
  {
    id: "midjourney",
    title: "اکانت Midjourney",
    description: "تولید تصاویر با هوش مصنوعی",
    titleEn: "Midjourney Account",
    icon: <FaImage className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-indigo-600",
  },
  {
    id: "jasper",
    title: "اکانت Jasper AI",
    description: "ابزار نوشتن هوشمند با AI",
    titleEn: "Jasper AI Account",
    icon: <FaPenFancy className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-purple-500",
  },
  {
    id: "openai",
    title: "اکانت Open AI",
    description: "دسترسی به ChatGPT و GPT-4",
    titleEn: "OpenAI Account",
    icon: <SiOpenai className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-green-600",
  },
  {
    id: "synthesia",
    title: "اکانت Synthesia",
    description: "تولید ویدیو با آواتار AI",
    titleEn: "Synthesia Account",
    icon: <FaVideo className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-sky-500",
  },
  {
    id: "dream",
    title: "اکانت Dream.ai",
    description: "خلق آثار هنری با هوش مصنوعی",
    titleEn: "Dream.ai Account",
    icon: <FaPalette className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-red-500",
  },
  {
    id: "writesonic",
    title: "اکانت Writesonic",
    description: "نوشتن محتوا با کمک AI",
    titleEn: "Writesonic Account",
    icon: <FaFileAlt className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-500",
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
  name: "اکانت‌های هوش مصنوعی",
  description: "خرید انواع اکانت‌های پریمیوم هوش مصنوعی از طریق ريتكس",
  numberOfItems: 6,
  itemListElement: aiAccounts.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

interface AIAccountsProps {
  initialProducts?: ShopProduct[];
}

export default function AIAccounts({
  initialProducts = [],
}: AIAccountsProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="ai-accounts-heading"
      className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="ai-accounts-heading"
        className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center flex items-center justify-center gap-2"
      >
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
        اکانت‌های هوش مصنوعی
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        خرید انواع اکانت‌های پریمیوم هوش مصنوعی از طریق ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر اکانت کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div
        aria-label="اکانت‌های هوش مصنوعی برای خرید"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {aiAccounts.map((item) => {
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
