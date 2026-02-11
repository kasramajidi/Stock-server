"use client";

import { FaGamepad } from "react-icons/fa";
import { SiPlaystation, SiSteam, SiEpicgames, SiTwitch, SiSpotify, SiNetflix } from "react-icons/si";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface GameAccount {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  icon: React.ReactNode;
  iconBg: string;
}

const gameAccounts: GameAccount[] = [
  {
    id: "xbox-game-pass",
    title: "اکانت گیم پس ایکس باکس",
    description: "دسترسی به کتابخانه عظیم بازی های Xbox",
    titleEn: "Xbox Game Pass",
    icon: <FaGamepad className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#107C10]",
  },
  {
    id: "xbox-live-gold",
    title: "Xbox Live Gold",
    description: "بازی آنلاین و دسترسی به بازی های رایگان ماهانه",
    titleEn: "Xbox Live Gold",
    icon: <FaGamepad className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#107C10]",
  },
  {
    id: "twitch-prime",
    title: "توییچ پرایم Twitch prime",
    description: "دسترسی به محتوای اختصاصی و بازی های رایگان",
    titleEn: "Twitch Prime",
    icon: <SiTwitch className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#9146FF]",
  },
  {
    id: "playstation-plus",
    title: "پلی استیشن PS Plus",
    description: "دسترسی به بازی های رایگان ماهانه و تخفیف های ویژه",
    titleEn: "PlayStation Plus",
    icon: <SiPlaystation className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#003087]",
  },
  {
    id: "spotify-gaming",
    title: "Spotify Gaming",
    description: "موسیقی بی وقفه هنگام بازی",
    titleEn: "Spotify Premium",
    icon: <SiSpotify className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#1DB954]",
  },
  {
    id: "netflix-gaming",
    title: "Netflix Gaming",
    description: "دسترسی به بازی های موبایل Netflix",
    titleEn: "Netflix Games",
    icon: <SiNetflix className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#E50914]",
  },
  {
    id: "epic-games-store",
    title: "شارژ اکانت اپیک گیمز",
    description: "شارژ اکانت Epic Games برای خرید بازی های اختصاصی",
    titleEn: "Epic Games Store",
    icon: <SiEpicgames className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#2A2A2A]",
  },
  {
    id: "steam-wallet",
    title: "شارژ استیم Steam",
    description: "شارژ کیف پول Steam برای خرید بازی",
    titleEn: "Steam Wallet",
    icon: <SiSteam className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#1B2838]",
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
  name: "خرید انواع اکانت بازی",
  description: "خرید اکانت‌های پریمیوم بازی از Xbox، PlayStation، Steam و سایر پلتفرم‌ها از طریق ريتكس",
  numberOfItems: 8,
  itemListElement: gameAccounts.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

interface GameAccountsProps {
  initialProducts?: ShopProduct[];
}

export default function GameAccounts({
  initialProducts = [],
}: GameAccountsProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <section
      aria-labelledby="game-accounts-heading"
      className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="game-accounts-heading"
        className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center flex items-center justify-center gap-2"
      >
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
        خرید انواع اکانت بازی
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        اکانت‌های گیم مورد نظر خود را در سریع‌ترین زمان ممکن خریداری کنید.
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
        روی هر اکانت کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
      </p>
      <div
        aria-label="اکانت‌های بازی برای خرید"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {gameAccounts.map((item) => {
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
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300`}
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
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg ${item.iconBg} flex items-center justify-center shadow-md`}
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
