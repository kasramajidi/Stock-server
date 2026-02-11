"use client";

import { HiAcademicCap } from "react-icons/hi";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface LanguageExam {
  id: string;
  title: string;
  description: string;
  titleEn: string;
}

const languageExams: LanguageExam[] = [
  {
    id: "ielts",
    title: "ثبت نام آزمون آیلتس",
    description: "آزمون آیلتس برای مهاجرت و تحصیل",
    titleEn: "IELTS",
  },
  {
    id: "toefl",
    title: "ثبت نام آزمون TOEFL iBT",
    description: "آزمون تافل برای تحصیل در خارج",
    titleEn: "TOEFL iBT",
  },
  {
    id: "duolingo",
    title: "ثبت نام آزمون Duolingo",
    description: "آزمون آنلاین زبان انگلیسی",
    titleEn: "Duolingo English Test",
  },
  {
    id: "pte",
    title: "ثبت نام آزمون PTE",
    description: "آزمون زبان انگلیسی برای مهاجرت و تحصیل",
    titleEn: "PTE Academic",
  },
  {
    id: "naati",
    title: "ثبت نام آزمون ناتی NAATI",
    description: "آزمون مترجمی برای مهاجرت به استرالیا",
    titleEn: "NAATI CCL",
  },
  {
    id: "gre",
    title: "ثبت نام آزمون GRE",
    description: "آزمون ورودی دانشگاه‌های آمریکا",
    titleEn: "GRE General Test",
  },
  {
    id: "ielts-indicator",
    title: "آزمون آیلتس Indicator",
    description: "آزمون آنلاین آیلتس",
    titleEn: "IELTS Indicator",
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
  name: "انواع آزمون زبان",
  description: "پرداخت هزینه ثبت نام تمامی آزمون‌های زبان در سراسر دنیا از طریق ريتكس",
  numberOfItems: 7,
  itemListElement: languageExams.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

interface LanguageExamTypesProps {
  initialProducts?: ShopProduct[];
}

export default function LanguageExamTypes({
  initialProducts = [],
}: LanguageExamTypesProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="language-exam-types-heading"
      className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-6 bg-[#ff5538] rounded" aria-hidden></span>
        <h2
          id="language-exam-types-heading"
          className="text-base md:text-lg font-bold text-gray-900"
        >
          انواع آزمون زبان
        </h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        پرداخت هزینه ثبت نام تمامی آزمون‌های زبان در سراسر دنیا از طریق ريتكس
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر آزمون کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div
        aria-label="انواع آزمون‌های زبان برای ثبت نام"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {languageExams.map((item) => {
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
                title={`ثبت نام ${item.title}`}
                aria-label={`ثبت نام ${item.title} - ${item.description}`}
                className={`bg-white rounded-lg p-6 shadow-sm border-2 flex flex-col w-full text-right transition-all duration-200 group hover:shadow-md ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center mb-5">
                  <div
                    className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center"
                    aria-hidden
                  >
                    <HiAcademicCap className="text-[#ff5538] text-3xl" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3 text-center min-h-[48px] flex items-center justify-center">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed min-h-[42px]">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  {item.titleEn}
                </p>
                <div className="text-sm text-gray-900 font-semibold text-center mt-auto pt-2 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5">
                    ثبت نام
                    <span className="text-gray-400">&lt;</span>
                  </span>
                </div>
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col opacity-90"
            >
              <div className="flex items-center justify-center mb-5">
                <div
                  className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center"
                  aria-hidden
                >
                  <HiAcademicCap className="text-[#ff5538] text-3xl" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3 text-center min-h-[48px] flex items-center justify-center">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed min-h-[42px]">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 text-center mb-4">
                {item.titleEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
