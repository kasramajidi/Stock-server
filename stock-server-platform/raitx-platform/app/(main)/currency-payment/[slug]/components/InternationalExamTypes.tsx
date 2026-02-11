"use client";

import { HiChartBar, HiCurrencyDollar } from "react-icons/hi";
import { FaHeartbeat, FaUserMd, FaHandshake, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface InternationalExam {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const internationalExams: InternationalExam[] = [
  {
    id: "gmat",
    title: "آزمون GMAT",
    description: "آزمون پذیرش مدیریت فارغ‌التحصیل",
    titleEn: "GMAT",
    icon: <HiChartBar className="text-4xl" />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "usmle",
    title: "آزمون USMLE",
    description: "آزمون مجوز پزشکی ایالات متحده",
    titleEn: "USMLE",
    icon: <FaUserMd className="text-3xl" />,
    iconBg: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    id: "pmp",
    title: "آزمون PMP",
    description: "آزمون مدیریت پروژه حرفه‌ای",
    titleEn: "PMP",
    icon: <FaBriefcase className="text-3xl" />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "imat",
    title: "آزمون IMAT",
    description: "آزمون پذیرش دانشکده پزشکی ایتالیا",
    titleEn: "IMAT",
    icon: <FaHeartbeat className="text-3xl" />,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: "sat",
    title: "آزمون SAT",
    description: "آزمون ارزیابی تحصیلی",
    titleEn: "SAT",
    icon: <FaGraduationCap className="text-3xl" />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    id: "prometric",
    title: "آزمون Prometric",
    description: "آزمون‌های تخصصی پرومتریک",
    titleEn: "Prometric",
    icon: <MdComputer className="text-4xl" />,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "icf",
    title: "آزمون ICF",
    description: "آزمون فدراسیون بین‌المللی کوچینگ",
    titleEn: "ICF",
    icon: <FaHandshake className="text-3xl" />,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    id: "cfa",
    title: "آزمون CFA",
    description: "آزمون تحلیلگر مالی معتمد",
    titleEn: "CFA",
    icon: <HiCurrencyDollar className="text-4xl" />,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
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
  name: "شرکت در آزمون‌های بین‌المللی",
  description: "آزمون‌های بین‌المللی مورد نظر خود را در سریع‌ترین زمان ممکن ثبت نام کنید.",
  numberOfItems: 8,
  itemListElement: internationalExams.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

interface InternationalExamTypesProps {
  initialProducts?: ShopProduct[];
}

export default function InternationalExamTypes({
  initialProducts = [],
}: InternationalExamTypesProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="international-exam-types-heading"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="international-exam-types-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        شرکت در آزمون‌های بین‌المللی
      </h2>
      <p className="text-sm text-gray-600 mb-8 text-center leading-relaxed">
        آزمون‌های بین‌المللی مورد نظر خود را در سریع‌ترین زمان ممکن ثبت نام کنید.
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر آزمون کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div
        aria-label="آزمون‌های بین‌المللی برای ثبت نام"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {internationalExams.map((item) => {
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
                className={`bg-white rounded-xl p-5 shadow-md border-2 flex flex-col w-full text-right transition-all duration-200 group hover:shadow-lg ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${item.iconBg} flex items-center justify-center`}
                    aria-hidden
                  >
                    <span className={item.iconColor}>{item.icon}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-h-[140px]">
                  <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-2 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 text-center mb-4">
                    {item.titleEn}
                  </p>
                </div>
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-200 flex flex-col opacity-90"
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full ${item.iconBg} flex items-center justify-center`}
                  aria-hidden
                >
                  <span className={item.iconColor}>{item.icon}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col min-h-[140px]">
                <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-2 leading-relaxed flex-1">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  {item.titleEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
