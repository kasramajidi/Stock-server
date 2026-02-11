"use client";

import { HiDotsHorizontal, HiCreditCard, HiPaperAirplane, HiGlobe, HiAcademicCap } from "react-icons/hi";
import { SiPaypal } from "react-icons/si";
import { FaBitcoin } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "general",
    label: "عمومی",
    icon: <HiDotsHorizontal className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "credit-cards",
    label: "کارت های اعتباری",
    icon: <HiCreditCard className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "crypto",
    label: "ارز دیجیتال",
    icon: <FaBitcoin className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "transfer",
    label: "حواله ارزی",
    icon: <BiTransfer className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "paypal",
    label: "پی پال",
    icon: <SiPaypal className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "travel",
    label: "مسافرتی",
    icon: <HiPaperAirplane className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "immigration",
    label: "مهاجرتی",
    icon: <HiGlobe className="text-sm sm:text-base md:text-lg" />,
  },
  {
    id: "university",
    label: "دانشگاهی",
    icon: <HiAcademicCap className="text-sm sm:text-base md:text-lg" />,
  },
];

interface FAQSidebarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function FAQSidebar({
  activeCategory,
  onCategoryChange,
}: FAQSidebarProps) {
  return (
    <div className="space-y-1.5">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg
              transition-all duration-200 text-right cursor-pointer
              ${
                isActive
                  ? "bg-[#ff5538] text-white shadow-sm scale-[1.02]"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-gray-200"
              }
            `}
          >
            <span className={`text-[10px] sm:text-xs md:text-sm font-medium flex-1 text-right transition-colors ${
              isActive ? "text-white" : "text-gray-700"
            }`}>
              {category.label}
            </span>
            <div className={`flex-shrink-0 transition-colors ${
              isActive ? "text-white" : "text-gray-500"
            }`}>
              {category.icon}
            </div>
          </button>
        );
      })}
    </div>
  );
}

