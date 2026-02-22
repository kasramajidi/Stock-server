"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroSectionProps {
  bannerImage?: string | string[] | null;
  bannerAlt?: string;
}

const defaultBanners = [
  "/Images/Baner/Layer 5.png",
  "/Images/Baner/Layer 5.png",
  "/Images/Baner/Layer 5.png",
];
const defaultAlt = "بنر استوک سرور - فروش سرور و تجهیزات شبکه";
const AUTOPLAY_INTERVAL_MS = 5000;

export default function HeroSection({
  bannerImage,
  bannerAlt = defaultAlt,
}: HeroSectionProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images: string[] = Array.isArray(bannerImage)
    ? bannerImage.filter(Boolean).length > 0
      ? bannerImage.filter(Boolean)
      : defaultBanners
    : bannerImage
      ? [bannerImage]
      : defaultBanners;

  const onSelect = useCallback((apiObj: CarouselApi | undefined) => {
    if (apiObj) setSelectedIndex(apiObj.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    queueMicrotask(() => onSelect(api));
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [api, images.length]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section
      className="relative mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-0"
      aria-label="بخش اصلی - بنر استوک سرور"
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="hero-side-notch-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0,0.35 Q 0.04,0.5 0,0.65 L 0,1 L 1,1 L 1,0.65 Q 0.96,0.5 1,0.35 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative px-8 min-[400px]:px-10 sm:px-14 md:px-16 lg:px-20 pt-6 sm:pt-8 md:pt-12">
        <div className="relative w-full">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
            className="relative w-full"
          >
            <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="basis-full pl-0">
                <div
                  className="relative w-full h-[120px] min-[400px]:h-[180px] sm:h-[220px] md:h-[250px] lg:h-[300px] xl:h-[340px] 2xl:h-[380px] overflow-hidden rounded-2xl sm:rounded-3xl"
                  style={{ clipPath: "url(#hero-side-notch-clip)" }}
                >
                  <Image
                    src={src}
                    alt={`${bannerAlt} - اسلاید ${index + 1}`}
                    fill
                    priority={index === 0}
                    quality={95}
                    sizes="(max-width: 400px) calc(100vw - 24px), (max-width: 640px) calc(100vw - 48px), (max-width: 768px) calc(100vw - 100px), (max-width: 1080px) calc(100vw - 100px), (max-width: 1440px) calc(100vw - 100px), 2400px"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className="right-auto -left-2 sm:-left-4 md:-left-6 size-9 sm:size-10 rounded-full border-0 bg-white shadow-lg text-gray-500 hover:bg-[#00DDFF] hover:text-white transition-colors [&_svg]:size-5" />
              <CarouselNext className="-right-2 sm:-right-4 md:-right-6 size-9 sm:size-10 rounded-full border-0 bg-white shadow-lg text-gray-500 hover:bg-[#00DDFF] hover:text-white transition-colors [&_svg]:size-5" />
            </>
          )}
        </Carousel>

          {/* نشانگر روی تصویر (گوشه بالا چپ): نقطه برای غیرفعال، خط برای اسلاید فعال ( . _ . _ ) */}
          {images.length > 1 && (
            <div
              className="absolute top-4 right-4 z-10 flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-black/30 px-3 py-1.5"
              role="tablist"
              aria-label="اسلایدهای بنر"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-label={`اسلاید ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className="flex items-center justify-center p-1 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {selectedIndex === index ? (
                    <span
                      className="h-0.5 w-5 sm:w-6 bg-[#00DDFF] rounded-full transition-all"
                      aria-hidden
                    />
                  ) : (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-white/70 hover:bg-white transition-colors"
                      aria-hidden
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
