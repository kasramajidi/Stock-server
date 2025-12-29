"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface PromotionalBanner {
  id: string;
  image: string;
  alt: string;
  link?: string;
}

const defaultBanners: PromotionalBanner[] = [
  {
    id: "1",
    image: "/Images/PromotionalBanners/Baner.png",
    alt: "بنر تبلیغاتی HPE - آموزش کامل تجهیزات",
  },
  {
    id: "2",
    image: "/Images/PromotionalBanners/Baner.png",
    alt: "بنر گواهینامه‌ها و اعتبارات",
  },
];

async function fetchPromotionalBanners(): Promise<PromotionalBanner[] | null> {
  try {
    const response = await fetch("/api/promotional-banners", {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.banners || null;
  } catch {
    return null;
  }
}

export default function PromotionalBanners() {
  const [banners, setBanners] = useState<PromotionalBanner[]>(defaultBanners);

  useEffect(() => {
    fetchPromotionalBanners().then((apiBanners) => {
      if (apiBanners && apiBanners.length >= 2) {
        setBanners(apiBanners);
      }
    });
  }, []);

  return (
    <section
      className="mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-0 mb-0"
      aria-label="بنرهای تبلیغاتی"
    >
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
        {banners.map((banner, index) => (
          <article
            key={banner.id}
            className="relative w-full sm:flex-1 h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] rounded-3xl overflow-hidden"
          >
            {banner.link ? (
              <Link
                href={banner.link}
                className="block w-full h-full"
                aria-label={banner.alt}
                title={banner.alt}
              >
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover-1440 object-cover-4k"
                  quality={index === 0 ? 95 : 85}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
              </Link>
            ) : (
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className="object-cover-1440 object-cover-4k"
                quality={index === 0 ? 95 : 85}
                sizes="(max-width: 640px) 100vw, 50vw"
                unoptimized
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
