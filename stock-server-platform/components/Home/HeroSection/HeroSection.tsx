"use client";

import Image from "next/image";

interface HeroSectionProps {
  bannerImage?: string | string[] | null;
  bannerAlt?: string;
}

const defaultBanner = "/Images/Baner/Layer 5.png";
const defaultAlt = "بنر استوک سرور - فروش سرور و تجهیزات شبکه";

export default function HeroSection({
  bannerImage,
  bannerAlt = defaultAlt,
}: HeroSectionProps) {
  const imageSrc = Array.isArray(bannerImage)
    ? bannerImage.filter(Boolean)[0] ?? defaultBanner
    : bannerImage ?? defaultBanner;
  const imageAlt = bannerAlt ?? defaultAlt;

  return (
    <section
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-4"
      aria-label="بخش اصلی - بنر استوک سرور"
    >
      <div className="relative w-full h-[120px] min-[400px]:h-[180px] sm:h-[220px] md:h-[250px] lg:h-[300px] xl:h-[340px] 2xl:h-[380px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          quality={95}
          sizes="(max-width: 400px) calc(100vw - 24px), (max-width: 640px) calc(100vw - 48px), (max-width: 768px) calc(100vw - 100px), (max-width: 1080px) calc(100vw - 100px), (max-width: 1440px) calc(100vw - 100px), 2400px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
