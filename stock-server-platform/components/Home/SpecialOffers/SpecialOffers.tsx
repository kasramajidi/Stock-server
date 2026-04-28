"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface SpecialOfferConfig {
  id: string;
  title: string;
  image?: string;
  specs: string[];
  href?: string;
  offerDiscountPercent?: number;
  price?: number;
  originalPrice?: number | null;
  priceLabel?: string;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

// آیکون سرور (سه رک روی هم)
function ServerStackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="6" width="32" height="10" rx="1" />
      <line x1="8" y1="12" x2="40" y2="12" />
      <rect x="8" y="20" width="32" height="10" rx="1" />
      <line x1="8" y1="26" x2="40" y2="26" />
      <rect x="8" y="34" width="32" height="10" rx="1" />
      <line x1="8" y1="40" x2="40" y2="40" />
      <circle cx="14" cy="9" r="0.8" fill="currentColor" />
      <circle cx="14" cy="23" r="0.8" fill="currentColor" />
      <circle cx="14" cy="37" r="0.8" fill="currentColor" />
    </svg>
  );
}

function OfferCard({ config, index }: { config: SpecialOfferConfig; index: number }) {
  const hasPrice = (config.price ?? 0) > 0;
  const showStrikethrough = hasPrice && (config.originalPrice ?? 0) > 0 && (config.originalPrice ?? 0) > (config.price ?? 0);

  const content = (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        animation: "offerCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* بخش بالایی — پس‌زمینه فیروزه‌ای با تصویر */}
      <div className="relative flex flex-col items-center justify-center rounded-b-3xl bg-cyan-500 px-4 pt-6 pb-5 min-h-[140px] sm:min-h-[160px]">
        {config.offerDiscountPercent != null && config.offerDiscountPercent > 0 && (
          <span className="absolute top-3 end-3 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-900 shadow-md">
            {config.offerDiscountPercent}٪ تخفیف
          </span>
        )}
        {config.image ? (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
            <Image
              src={config.image}
              alt={config.title}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="text-slate-800/90">
            <ServerStackIcon className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
        )}
        <span className="mt-2 text-sm font-medium text-white">استوک سرور</span>
      </div>

      {/* بخش سفید — نام و قیمت */}
      <div className="flex flex-1 flex-col p-4 pt-5">
        <h3 className="text-center text-base font-bold text-slate-800 leading-snug mb-4 line-clamp-2 min-h-10">
          {config.title}
        </h3>

        {/* قیمت‌ها */}
        <div className="flex flex-col items-center gap-0.5 mb-4">
          {showStrikethrough && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(config.originalPrice!)}
            </span>
          )}
          {hasPrice ? (
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {formatPrice(config.price!)}
            </span>
          ) : (
            <span className="text-sm text-slate-600 font-medium">
              {config.priceLabel || "برای استعلام تماس بگیرید"}
            </span>
          )}
        </div>

        {/* دکمه افزودن به سبد */}
        <span
          className="mx-auto flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white transition-colors group-hover:bg-cyan-600"
          aria-hidden
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
      </div>
    </div>
  );

  const wrapperClass = "block h-full w-full";
  if (config.href) {
    return <Link href={config.href} className={wrapperClass}>{content}</Link>;
  }
  return <div className={wrapperClass}>{content}</div>;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<SpecialOfferConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#special-offers") {
      const el = document.getElementById("special-offers");
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return () => clearTimeout(t);
      }
    }
  }, []);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.offers)) {
          setOffers(data.offers);
        }
      })
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="special-offers" className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 header-4k mt-4 sm:mt-6 mb-0 scroll-mt-24">
        <div
          className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-xl sm:rounded-2xl gap-4 min-[400px]:gap-5 sm:gap-6 md:gap-8 p-3 min-[400px]:p-4 sm:p-5 md:p-6 shadow-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0c1929 0%, #0f2847 25%, #0d3d5c 50%, #0a4d6e 75%, #00DDFF 100%)",
          }}
        >
          <h2 className="text-xl min-[400px]:text-2xl sm:text-2xl md:text-3xl text-white font-bold shrink-0">آفرهای ویژه</h2>
          <div className="flex-1 flex items-center justify-center min-h-[240px]">
            <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="special-offers" className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 header-4k mt-4 sm:mt-6 mb-0 scroll-mt-24">
      <div
        className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-xl sm:rounded-2xl gap-4 min-[400px]:gap-5 sm:gap-6 md:gap-8 p-3 min-[400px]:p-4 sm:p-5 md:p-6 shadow-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c1929 0%, #0f2847 25%, #0d3d5c 50%, #0a4d6e 75%, #00DDFF 100%)",
        }}
      >
        <h2 className="text-xl min-[400px]:text-2xl sm:text-2xl md:text-3xl text-white font-bold shrink-0 text-center lg:text-right">آفرهای ویژه</h2>

        <div className="relative w-full min-w-0 flex-1 mx-auto px-1 sm:px-4 md:px-8 lg:px-10">
          {offers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-white/90">
              <p className="text-center text-base sm:text-lg font-medium">در حال حاضر آفری موجود نیست</p>
              <p className="text-center text-sm text-white/70 mt-1">محصولات را در پنل ادمین با درصد تخفیف آفر ثبت کنید</p>
            </div>
          ) : (
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            className="w-full"
          >
            <CarouselContent className="-ms-4 sm:-ms-6 md:-ms-8">
              {offers.map((config, idx) => (
                <CarouselItem
                  key={config.id}
                  className="ps-4 sm:ps-6 md:ps-8 basis-[88%] min-[500px]:basis-[70%] sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex justify-center w-full sm:justify-start">
                    <div className="w-full max-w-[340px] h-full">
                      <OfferCard config={config} index={idx} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {offers.length > 1 && offers.length <= 4 && (
              <>
                <CarouselPrevious className="right-auto -left-5 sm:-left-12 md:-left-16 lg:-left-20 z-10 size-10 sm:size-11 bg-white text-gray-900 border-2 border-white shadow-lg hover:bg-gray-100 hover:border-gray-200 [&_svg]:size-5 sm:[&_svg]:size-6" />
                <CarouselNext className="-right-5 sm:-right-12 md:-right-16 lg:-right-20 z-10 size-10 sm:size-11 bg-white text-gray-900 border-2 border-white shadow-lg hover:bg-gray-100 hover:border-gray-200 [&_svg]:size-5 sm:[&_svg]:size-6" />
              </>
            )}
          </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
