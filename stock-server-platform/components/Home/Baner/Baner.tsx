"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PromoGridBanner {
  id: string;
  position: number;
  image: string;
  alt: string;
  link?: string;
}

const defaultImage = "/Images/Baner/Layer 5.png";
const defaultAlt = "بنر تبلیغاتی";
const AUTOPLAY_INTERVAL_MS = 5000;

const defaultSlots: PromoGridBanner[] = [
  { id: "1", position: 1, image: defaultImage, alt: defaultAlt },
  { id: "2", position: 2, image: defaultImage, alt: defaultAlt },
  { id: "3", position: 3, image: defaultImage, alt: defaultAlt },
];

export default function Baner() {
  const [slots, setSlots] = useState<PromoGridBanner[]>(defaultSlots);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    fetch("/api/promo-grid-banners", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data?.banners)) {
          const fromApi = (data.banners as PromoGridBanner[]).sort((a, b) => a.position - b.position);
          // حداقل ۳ اسلات: اگر API کمتر از ۳ تا داد، بقیه با پیش‌فرض پر می‌شوند
          const merged: PromoGridBanner[] = [
            fromApi.find((b) => b.position === 1) ?? { id: "1", position: 1, image: defaultImage, alt: defaultAlt },
            fromApi.find((b) => b.position === 2) ?? { id: "2", position: 2, image: defaultImage, alt: defaultAlt },
            fromApi.find((b) => b.position === 3) ?? { id: "3", position: 3, image: defaultImage, alt: defaultAlt },
          ];
          const extra = fromApi.filter((b) => b.position > 3);
          setSlots(extra.length > 0 ? [...merged, ...extra] : merged);
        }
      })
      .catch(() => {});
  }, []);

  const showNav = slots.length > 3;

  useEffect(() => {
    if (!api || !showNav) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [api, showNav]);

  return (
    <div className="relative px-1 sm:px-3 md:px-6 lg:px-10">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: showNav,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ms-4 sm:-ms-5 md:-ms-6">
          {slots.map((banner, index) => (
            <CarouselItem
              key={banner.position}
              className="ps-4 sm:ps-5 md:ps-6 basis-[88%] min-[560px]:basis-[70%] lg:basis-1/2 xl:basis-1/3"
            >
              <div className="relative w-full h-[150px] sm:h-[170px] xl:h-[200px] rounded-xl overflow-hidden">
                {banner.link ? (
                  <Link href={banner.link} className="block w-full h-full" aria-label={banner.alt}>
                    <Image
                      src={banner.image}
                      alt={banner.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </Link>
                ) : (
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNav && (
          <>
            <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 z-10 size-9 sm:size-10 bg-white border border-gray-200 shadow-md hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF] [&_svg]:size-5" />
            <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 z-10 size-9 sm:size-10 bg-white border border-gray-200 shadow-md hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF] [&_svg]:size-5" />
          </>
        )}
      </Carousel>
    </div>
  );
}
