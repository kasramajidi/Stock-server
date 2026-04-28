"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface PromotionalBanner {
  id: string;
  position: "left" | "right";
  image: string;
  alt: string;
  link?: string;
}

const defaultBanner: Omit<PromotionalBanner, "id" | "position"> = {
  image: "/Images/PromotionalBanners/Baner.png",
  alt: "بنر تبلیغاتی",
};

async function fetchPromotionalBanners(): Promise<PromotionalBanner[] | null> {
  try {
    const response = await fetch("/api/promotional-banners", { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.success || !Array.isArray(data?.banners)) return null;
    return data.banners;
  } catch {
    return null;
  }
}

export default function PromotionalBanners() {
  const [banners, setBanners] = useState<PromotionalBanner[]>([
    { id: "left", position: "left", ...defaultBanner },
    { id: "right", position: "right", ...defaultBanner },
  ]);

  useEffect(() => {
    fetchPromotionalBanners().then((apiBanners) => {
      if (apiBanners && apiBanners.length > 0) {
        const byPos = Object.fromEntries(apiBanners.map((b) => [b.position, b]));
        const merged: PromotionalBanner[] = [
          byPos.left ?? { id: "left", position: "left", ...defaultBanner },
          byPos.right ?? { id: "right", position: "right", ...defaultBanner },
        ];
        setBanners(merged);
      }
    });
  }, []);

  return (
    <section
      className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 header-4k mt-0 mb-0"
      aria-label="بنرهای تبلیغاتی"
    >
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
        {banners.map((banner, index) => (
          <article
            key={banner.id}
            className="relative w-full lg:flex-1 h-[120px] min-[400px]:h-[140px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden"
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
