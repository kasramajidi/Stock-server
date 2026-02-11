"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiSparkles,
  HiChevronRight,
  HiChevronLeft,
  HiGlobe,
  HiAcademicCap,
  HiServer,
  HiOutlineDesktopComputer,
} from "react-icons/hi";
import { FaGamepad, FaBrain, FaSearch } from "react-icons/fa";
import { MdSimCard, MdPhone, MdDomain, MdCloud, MdCode } from "react-icons/md";
import React from "react";

interface CategoryItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface Category {
  id: string;
  label: string;
  labelEn?: string;
  description: string;
  icon: React.ReactNode;
  items: CategoryItem[];
  category: string;
  color: string;
}

const currencyPaymentCategories: Category[] = [
  {
    id: "vps-services",
    label: "سرویس های VPS",
    labelEn: "VPS Services",
    description: "سرویس‌های VPS برای تریدینگ و استفاده روزانه",
    icon: React.createElement(HiServer, {
      className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
    }),
    category: "vps",
    color: "red",
    items: [
      {
        label: "VPS تریدینگ",
        href: "/currency-payment/vps-trading",
        icon: React.createElement(HiServer, {
          className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
        }),
      },
      {
        label: "VPS روزانه",
        href: "/currency-payment/vps-daily",
        icon: React.createElement(HiServer, {
          className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
        }),
      },
      {
        label: "VPS آمریکا",
        href: "/currency-payment/vps-usa",
        icon: React.createElement(HiServer, {
          className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
        }),
      },
      {
        label: "VPS هلند",
        href: "/currency-payment/vps-netherlands",
        icon: React.createElement(HiServer, {
          className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
        }),
      },
      {
        label: "VPS فرانسه",
        href: "/currency-payment/vps-france",
        icon: React.createElement(HiServer, {
          className: "text-3xl sm:text-4xl md:text-5xl text-red-500",
        }),
      },
    ],
  },
  {
    id: "premium-accounts",
    label: "اکانت های پریمیوم",
    labelEn: "Premium Accounts",
    description: "خرید اکانت‌های پریمیوم برای هوش مصنوعی، سئو، بازی و نرم‌افزار",
    icon: React.createElement(HiOutlineDesktopComputer, {
      className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
    }),
    category: "premium",
    color: "green",
    items: [
      {
        label: "خرید اکانت هوش مصنوعی",
        href: "/currency-payment/ai-account",
        icon: React.createElement(FaBrain, {
          className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
        }),
      },
      {
        label: "خرید اکانت ابزارهای سئو",
        href: "/currency-payment/seo-account",
        icon: React.createElement(FaSearch, {
          className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
        }),
      },
      {
        label: "خرید اکانت بازی",
        href: "/currency-payment/game-account",
        icon: React.createElement(FaGamepad, {
          className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
        }),
      },
      {
        label: "خرید اکانت اورجینال نرم افزار",
        href: "/currency-payment/software-account",
        icon: React.createElement(MdCode, {
          className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
        }),
      },
    ],
  },
  {
    id: "education-exam",
    label: "آموزش و آزمون",
    labelEn: "Education & Exam",
    description: "ثبت نام آزمون‌های زبان و بین‌المللی و پرداخت‌های دانشجویی",
    icon: React.createElement(HiAcademicCap, {
      className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]",
    }),
    category: "education",
    color: "orange",
    items: [
      {
        label: "ثبت نام آزمون زبان",
        href: "/currency-payment/language-exam",
        icon: React.createElement(HiAcademicCap, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]",
        }),
      },
      {
        label: "پرداخت دانشجویی",
        href: "/currency-payment/student-payment",
        icon: React.createElement(HiAcademicCap, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]",
        }),
      },
      {
        label: "آزمونهای بین المللی",
        href: "/currency-payment/international-exam",
        icon: React.createElement(HiGlobe, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]",
        }),
      },
    ],
  },
  {
    id: "international-services",
    label: "خدمات بین المللی",
    labelEn: "International Services",
    description: "خدمات بین‌المللی شامل سیم کارت، شماره مجازی، دامنه و هاست",
    icon: React.createElement(HiGlobe, {
      className: "text-3xl sm:text-4xl md:text-5xl text-blue-500",
    }),
    category: "international",
    color: "blue",
    items: [
      {
        label: "سیم کارت بین المللی",
        href: "/currency-payment/international-sim",
        icon: React.createElement(MdSimCard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-blue-500",
        }),
      },
      {
        label: "شماره مجازی",
        href: "/currency-payment/virtual-number",
        icon: React.createElement(MdPhone, {
          className: "text-3xl sm:text-4xl md:text-5xl text-blue-500",
        }),
      },
      {
        label: "خرید دامنه",
        href: "/currency-payment/domain",
        icon: React.createElement(MdDomain, {
          className: "text-3xl sm:text-4xl md:text-5xl text-blue-500",
        }),
      },
      {
        label: "خرید هاست",
        href: "/currency-payment/host",
        icon: React.createElement(MdCloud, {
          className: "text-3xl sm:text-4xl md:text-5xl text-blue-500",
        }),
      },
    ],
  },
];

const serviceCategories = [
  { id: "all", label: "همه خدمات", value: "all" },
  { id: "InternationalServices", label: "خدمات بین المللی", value: "international" },
  { id: "PremiumAccounts", label: "اکانت های پریمیوم", value: "premium" },
  { id: "EducationExam", label: "آموزش و آزمون", value: "education" },
  { id: "VPSServices", label: "سرویس های VPS", value: "vps" },
];

interface CardItem {
  id: string;
  label: string;
  labelEn?: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function CurrencyPaymentTabs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredCategories: Category[] =
    selectedCategory === "all"
      ? currencyPaymentCategories
      : currencyPaymentCategories.filter(
          (category) => category.category === selectedCategory
        );

  const getAllCards = (): CardItem[] => {
    const allCards: CardItem[] = [];

    filteredCategories.forEach((category) => {
      category.items.forEach((item) => {
        allCards.push({
          id: item.href,
          label: item.label,
          description: category.description,
          icon: item.icon || category.icon,
          href: item.href,
        });
      });
    });

    return allCards;
  };

  const allCards = selectedCategory === "all" ? getAllCards() : [];
  const totalPages = Math.ceil(allCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageCards = allCards.slice(startIndex, endIndex);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="mb-8 sm:mb-10 md:mb-12 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#ff5538]/10 flex items-center justify-center">
            <HiSparkles className="text-[#ff5538] text-xl sm:text-2xl md:text-3xl" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <span style={{ color: "#ff5538" }}>پرداخت</span>{" "}
              <span className="text-[#1a3760]">ارزی</span>
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 max-w-2xl mx-auto">
          ريتكس ارائه‌دهنده انواع خدمات پرداخت ارزی، اکانت‌های پریمیوم،
          سرویس‌های VPS و خدمات آموزشی است. ما با سال‌ها تجربه در زمینه پرداخت‌های
          بین‌المللی، آماده خدمت‌رسانی به شما هستیم.
        </p>
      </div>

      <div className="w-full">
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap gap-2 sm:gap-2.5 justify-center items-center">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.value)}
              className={`
                  px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    selectedCategory === category.value
                      ? "bg-[#ff5538] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }
                `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {selectedCategory === "all" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {currentPageCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm text-center border border-gray-100 block hover:border-[#ff5538]/30 hover:shadow-md transition-all"
                >
                  <div className="mb-4 sm:mb-5 flex items-center justify-center">
                    <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
                      {card.icon}
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2">
                    {card.label}
                  </h3>
                  {card.labelEn && (
                    <p className="text-[10px] sm:text-xs text-gray-400 mb-3 font-medium">
                      {card.labelEn}
                    </p>
                  )}
                  <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }`}
                >
                  <HiChevronRight className="text-lg" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#ff5538] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
                  }`}
                >
                  <HiChevronLeft className="text-lg" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filteredCategories.map((category) => {
                return category.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm text-center border border-gray-100 block hover:border-[#ff5538]/30 hover:shadow-md transition-all"
                  >
                    <div className="mb-4 sm:mb-5 flex items-center justify-center">
                      <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
                        {item.icon || category.icon}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2">
                      {item.label}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                      {category.description}
                    </p>
                  </Link>
                ));
              })}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-sm sm:text-base text-gray-500">
                  خدماتی در این دسته‌بندی یافت نشد.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

