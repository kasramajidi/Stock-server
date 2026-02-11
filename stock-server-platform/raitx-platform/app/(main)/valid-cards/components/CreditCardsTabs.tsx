"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiSparkles,
  HiCreditCard,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import {
  SiMastercard,
  SiVisa,
  SiPlaystation,
  SiSteam,
  SiAmazon,
  SiApple,
  SiSpotify,
  SiNetflix,
} from "react-icons/si";
import {
  HiOutlineDesktopComputer,
  HiOutlineGift,
  HiOutlineGlobe,
} from "react-icons/hi";
import { FaGamepad, FaXbox } from "react-icons/fa";
import { MdCreditCard, MdCardGiftcard } from "react-icons/md";
import React from "react";
import { useCart, type CartItem } from "@/app/(main)/context/CartContext";
import { createInvoice, getLoginPhoneFromStorage, normalizePhoneForComparison } from "@/app/(main)/my-account/lib/my-account-api";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";

function useIsLoggedIn(): boolean | null {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const ok = !!(getAuthCookie() || getLoginPhoneFromStorage()?.trim());
    setIsLoggedIn(ok);
  }, []);
  return isLoggedIn;
}

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
}

const creditCardCategories: Category[] = [
  {
    id: "game-gift-cards",
    label: "گیفت کارت بازی",
    labelEn: "Game Gift Cards",
    description: "خرید گیفت کارت‌های بازی برای کنسول‌ها و پلتفرم‌های مختلف",
    icon: React.createElement(HiOutlineDesktopComputer, {
      className: "text-3xl sm:text-4xl md:text-5xl text-green-500",
    }),
    category: "gaming",
    items: [
      {
        label: "گیفت کارت Play Station",
        href: "/valid-cards/playstation",
        icon: React.createElement(SiPlaystation, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#003087]",
        }),
      },
      {
        label: "گیفت کارت ایکس باکس XBOX",
        href: "/valid-cards/xbox",
        icon: React.createElement(FaXbox, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#107C10]",
        }),
      },
      {
        label: "گیفت کارت استیم والت Steam",
        href: "/valid-cards/steam",
        icon: React.createElement(SiSteam, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1B2838]",
        }),
      },
      {
        label: "گیفت کارت بتل نت Battle.Net",
        href: "/valid-cards/battlenet",
        icon: React.createElement(FaGamepad, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#148EFF]",
        }),
      },
    ],
  },
  {
    id: "gift-cards",
    label: "گیفت کارت‌ها",
    labelEn: "Gift Cards",
    description: "خرید انواع گیفت کارت‌های بین‌المللی",
    icon: React.createElement(HiOutlineGift, {
      className: "text-3xl sm:text-4xl md:text-5xl text-purple-500",
    }),
    category: "gift",
    items: [
      {
        label: "گیفت کارت ویزا",
        href: "/valid-cards/gift-card-visa",
        icon: React.createElement(SiVisa, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
        }),
      },
      {
        label: "گیفت کارت آمازون",
        href: "/valid-cards/amazon",
        icon: React.createElement(SiAmazon, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#FF9900]",
        }),
      },
      {
        label: "گیفت کارت اپل",
        href: "/valid-cards/apple",
        icon: React.createElement(SiApple, {
          className: "text-3xl sm:text-4xl md:text-5xl text-gray-900",
        }),
      },
      {
        label: "گیفت کارت اسپاتیفای",
        href: "/valid-cards/spotify",
        icon: React.createElement(SiSpotify, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1DB954]",
        }),
      },
      {
        label: "گیفت کارت نتفلیکس",
        href: "/valid-cards/netflix",
        icon: React.createElement(SiNetflix, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#E50914]",
        }),
      },
    ],
  },
  {
    id: "mastercard",
    label: "مسترکارت",
    labelEn: "MasterCard",
    description: "دریافت و استفاده از کارت‌های اعتباری مسترکارت",
    icon: React.createElement(SiMastercard, {
      className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
    }),
    category: "mastercard",
    items: [
      {
        label: "مسترکارت فیزیکی پرایم",
        href: "/valid-cards/mastercard-prime",
        icon: React.createElement(SiMastercard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
        }),
      },
      {
        label: "مسترکارت مجازی آمریکا",
        href: "/valid-cards/mastercard-us-virtual",
        icon: React.createElement(HiOutlineGlobe, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
        }),
      },
      {
        label: "مسترکارت مجازی",
        href: "/valid-cards/mastercard-virtual",
        icon: React.createElement(MdCreditCard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
        }),
      },
      {
        label: "مسترکارت فیزیکی",
        href: "/valid-cards/mastercard-physical",
        icon: React.createElement(SiMastercard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
        }),
      },
      {
        label: "مسترکارت فیزیکی پرسونال",
        href: "/valid-cards/mastercard-personal",
        icon: React.createElement(HiCreditCard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]",
        }),
      },
    ],
  },
  {
    id: "visa-card",
    label: "ویزا کارت",
    labelEn: "Visa Card",
    description: "دریافت و استفاده از کارت‌های اعتباری ویزا",
    icon: React.createElement(SiVisa, {
      className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
    }),
    category: "visa",
    items: [
      {
        label: "ویزا کارت مجازی",
        href: "/valid-cards/visa-virtual",
        icon: React.createElement(MdCreditCard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
        }),
      },
      {
        label: "ویزا کارت فیزیکی",
        href: "/valid-cards/visa-physical",
        icon: React.createElement(SiVisa, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
        }),
      },
      {
        label: "ویزا کارت هدیه",
        href: "/valid-cards/visa-gift",
        icon: React.createElement(MdCardGiftcard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
        }),
      },
      {
        label: "کردیت کارت",
        href: "/valid-cards/credit-card",
        icon: React.createElement(HiCreditCard, {
          className: "text-3xl sm:text-4xl md:text-5xl text-[#1A1F71]",
        }),
      },
    ],
  },
];

const serviceCategories = [
  { id: "all", label: "همه خدمات", value: "all" },
  { id: "GiftCardGame", label: "گیفت کارت‌ بازی", value: "gaming" },
  { id: "VisaCard", label: "ویزا کارت", value: "visa" },
  { id: "MasterCard", label: "مسترکارت", value: "mastercard" },
  { id: "GiftCards", label: "گیفت کارت ها", value: "gift" },
];

/** نگاشت slug خدمت (مثلاً playstation) به value تب */
const serviceSlugToCategory: Record<string, string> = {};
creditCardCategories.forEach((cat) => {
  cat.items.forEach((item) => {
    const slug = item.href.replace(/^\/valid-cards\/?/, "").split("/")[0] || "";
    if (slug) serviceSlugToCategory[slug] = cat.category;
  });
});

interface CardItem {
  id: string;
  label: string;
  labelEn?: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

/** محصول API را با نام کارت استاتیک تطبیق می‌دهد (ادمین محصول را با همین نام یا نام مشابه ثبت می‌کند) */
function findProductForCard(cardLabel: string, products: ShopProduct[]): ShopProduct | undefined {
  const n = (s: string) => s.trim().replace(/\s+/g, " ");
  const a = n(cardLabel);
  if (!a) return undefined;
  const exact = products.find((p) => n(p.name) === a);
  if (exact) return exact;
  return products.find(
    (p) => n(p.name).includes(a) || a.includes(n(p.name))
  );
}

/** بخش اول کارت: آیکون، عنوان، توضیح */
function GiftCardContent({
  icon,
  label,
  labelEn,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  labelEn?: string;
  description: string;
}) {
  return (
    <>
      <div className="mb-4 sm:mb-5 flex items-center justify-center">
        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 group-hover:bg-[#ff5538]/5 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#ff5538] transition-colors">
        {label}
      </h3>
      {labelEn && (
        <p className="text-[10px] sm:text-xs text-gray-400 mb-2 font-medium">
          {labelEn}
        </p>
      )}
      <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-4 flex-1">
        {description}
      </p>
    </>
  );
}

export default function CreditCardsTabs({ initialProducts = [] }: { initialProducts?: ShopProduct[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const isLoggedIn = useIsLoggedIn();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      const category = serviceSlugToCategory[serviceSlug];
      if (category) setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleRegisterOrder = async (product: ShopProduct) => {
    setOrderError(null);
    setSubmittingId(product.id);
    try {
      const loginPhone = getLoginPhoneFromStorage();
      if (!loginPhone?.trim()) {
        router.push("/auth?next=/valid-cards");
        return;
      }
      const userid = normalizePhoneForComparison(loginPhone);
      if (!userid) {
        setOrderError("شماره تماس معتبر برای ثبت سفارش یافت نشد.");
        return;
      }
      const ok = await createInvoice([
        { shopid: product.id, userid, quantity: 1, isPaid: false, paymentStatus: "not payed", price: product.price },
      ]);
      if (!ok) {
        setOrderError("ثبت سفارش در سامانه انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }
      const cartItem: CartItem = {
        product: { ...product },
        quantity: 1,
        selectedColor: "",
        selectedWarranty: "",
        finalPrice: product.price,
      };
      addToCart(cartItem);
      router.push("/cart");
    } finally {
      setSubmittingId(null);
    }
  };

  const filteredCategories: Category[] =
    selectedCategory === "all"
      ? creditCardCategories
      : creditCardCategories.filter(
          (category) => category.category === selectedCategory
        );

  const getAllCards = (): CardItem[] => {
    const allCards: CardItem[] = [];

    filteredCategories.forEach((category) => {
      if (
        category.category === "gaming" ||
        category.id === "visa-card" ||
        category.id === "mastercard" ||
        category.id === "gift-cards"
      ) {
        category.items.forEach((item) => {
          allCards.push({
            id: item.href,
            label: item.label,
            description: category.description,
            icon: item.icon || category.icon,
            href: item.href,
          });
        });
      } else {
        allCards.push({
          id: category.id,
          label: category.label,
          labelEn: category.labelEn,
          description: category.description,
          icon: category.icon,
          href: category.items[0]?.href || "#",
        });
      }
    });

    return allCards;
  };

  /** تب «همه خدمات» همیشه کارت‌های استاتیک را نشان می‌دهد؛ قیمت/ثبت سفارش از API با تطبیق نام اعمال می‌شود */
  const useApiProducts = false;
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
              <span style={{ color: "#ff5538" }}>کارت‌های</span>{" "}
              <span className="text-[#1a3760]">اعتباری</span>
            </h1>
          </div>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 max-w-2xl mx-auto">
          ريتكس ارائه‌دهنده انواع کارت‌های اعتباری بین‌المللی، گیفت
          کارت‌های بازی، مسترکارت و ویزا کارت است. ما با سال‌ها تجربه در زمینه
          کارت‌های اعتباری و پرداخت‌های بین‌المللی، آماده خدمت‌رسانی به شما
          هستیم.
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
            {orderError && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {orderError}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {currentPageCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1"
                >
                  <GiftCardContent
                    icon={card.icon}
                    label={card.label}
                    labelEn={card.labelEn}
                    description={card.description}
                  />
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
                const renderItemCard = (item: CategoryItem) => {
                  const matched = findProductForCard(item.label, initialProducts);
                  if (matched) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1 flex flex-col cursor-pointer"
                      >
                        <div className="mb-4 sm:mb-5 flex items-center justify-center">
                          <div className="p-3 sm:p-4 rounded-xl bg-gray-50 group-hover:bg-[#ff5538]/5 transition-all duration-300 group-hover:scale-110">
                            {item.icon || category.icon}
                          </div>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#ff5538] transition-colors">
                          {item.label}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-4 flex-1">
                          {category.description}
                        </p>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1"
                    >
                      <div className="mb-4 sm:mb-5 flex items-center justify-center">
                        <div className="p-3 sm:p-4 rounded-xl bg-gray-50 group-hover:bg-[#ff5538]/5 transition-all duration-300 group-hover:scale-110">
                          {item.icon || category.icon}
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#ff5538] transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                        {category.description}
                      </p>
                    </Link>
                  );
                };
                if (category.category === "gaming") {
                  return category.items.map((item) => renderItemCard(item));
                }
                if (category.id === "visa-card") {
                  return category.items.map((item) => renderItemCard(item));
                }
                if (category.id === "mastercard") {
                  return category.items.map((item) => renderItemCard(item));
                }
                if (category.id === "gift-cards") {
                  return category.items.map((item) => renderItemCard(item));
                }

                return (
                  <div
                    key={category.id}
                    className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center border border-gray-100 hover:border-[#ff5538]/30 hover:-translate-y-1"
                  >
                    <div className="mb-4 sm:mb-5 flex items-center justify-center">
                      <div className="p-3 sm:p-4 rounded-xl bg-gray-50 group-hover:bg-[#ff5538]/5 transition-all duration-300 group-hover:scale-110">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#ff5538] transition-colors">
                      {category.label}
                    </h3>
                    {category.labelEn && (
                      <p className="text-[10px] sm:text-xs text-gray-400 mb-3 font-medium">
                        {category.labelEn}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-4">
                      {category.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <ul className="space-y-2 text-right">
                        {category.items.slice(0, 3).map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              className="text-[10px] sm:text-xs text-gray-600 hover:text-[#ff5538] transition-colors"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {category.items.length > 3 && (
                          <li className="text-[10px] sm:text-xs text-[#ff5538] font-medium">
                            +{category.items.length - 3} مورد دیگر
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
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
