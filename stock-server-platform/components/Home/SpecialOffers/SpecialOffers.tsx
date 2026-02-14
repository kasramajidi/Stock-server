"use client";

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
}

const offers: SpecialOfferConfig[] = [
  { id: "1", title: "کانفیگ ویژه شماره ۱", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
  { id: "2", title: "کانفیگ ویژه شماره ۲", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
  { id: "3", title: "کانفیگ ویژه شماره ۳", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
  { id: "4", title: "کانفیگ ویژه شماره ۴", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
  { id: "5", title: "کانفیگ ویژه شماره ۵", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
  { id: "6", title: "کانفیگ ویژه شماره ۶", specs: ["این یک متن است", "این یک متن است", "این یک متن است", "این یک متن است"], image: "/Images/PromotionalBanners/Baner.png" },
];

function OfferCard({ config }: { config: SpecialOfferConfig }) {
  const content = (
    <>
      <p className="text-base min-[400px]:text-lg sm:text-xl md:text-xl font-bold text-gray-800 text-center">{config.title}</p>
      <div className="relative w-full aspect-video min-h-[100px] min-[400px]:min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] bg-gray-100 rounded-lg overflow-hidden">
        {config.image ? (
          <Image src={config.image} alt={config.title} fill className="object-cover" sizes="(max-width: 480px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>
      <ul className="flex flex-col gap-2 sm:gap-3 w-full">
        {config.specs.map((spec, i) => (
          <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs min-[400px]:text-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00DDFF] shrink-0" />
            <span>{spec}</span>
          </li>
        ))}
      </ul>
    </>
  );

  const className = "border-2 border-[#00DDFF]/40 hover:border-[#00DDFF] rounded-xl bg-white p-3 min-[400px]:p-4 sm:p-5 md:p-5 flex flex-col items-center gap-3 min-[400px]:gap-4 sm:gap-5 transition-colors w-full";

  if (config.href) {
    return <Link href={config.href} className={className}>{content}</Link>;
  }

  return <div className={className}>{content}</div>;
}

export default function SpecialOffers() {
  return (
    <section className="mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-4 sm:mt-6 mb-0">
      <div
        className="flex flex-col lg:flex-row items-center lg:items-stretch rounded-xl sm:rounded-2xl gap-4 min-[400px]:gap-5 sm:gap-6 md:gap-8 p-3 min-[400px]:p-4 sm:p-5 md:p-6 shadow-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c1929 0%, #0f2847 25%, #0d3d5c 50%, #0a4d6e 75%, #00DDFF 100%)",
        }}
      >
        <h2 className="text-xl min-[400px]:text-2xl sm:text-2xl md:text-3xl text-white font-bold shrink-0 text-center lg:text-right">آفرهای ویژه</h2>

        <div className="relative w-full min-w-0 flex-1 max-w-[300px] min-[400px]:max-w-[624px] sm:max-w-[948px] md:max-w-[1272px] lg:max-w-[1432px] mx-auto px-0 sm:px-12 md:px-16 lg:px-20">
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            className="w-full"
          >
            <CarouselContent className="-ms-4 min-[400px]:-ms-5 sm:-ms-6 md:-ms-8">
              {offers.map((config) => (
                <CarouselItem
                  key={config.id}
                  className="ps-4 min-[400px]:ps-5 sm:ps-6 md:ps-8 basis-full min-[500px]:basis-1/2 md:basis-1/3 lg:basis-1/3"
                >
                  <div className="flex justify-center w-full sm:justify-start">
                    <div className="w-[280px] min-[400px]:w-[300px] sm:w-[320px] lg:w-[340px]">
                      <OfferCard config={config} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 z-10 size-10 sm:size-11 bg-white text-gray-900 border-2 border-white shadow-lg hover:bg-gray-100 hover:border-gray-200 [&_svg]:size-5 sm:[&_svg]:size-6" />
            <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 z-10 size-10 sm:size-11 bg-white text-gray-900 border-2 border-white shadow-lg hover:bg-gray-100 hover:border-gray-200 [&_svg]:size-5 sm:[&_svg]:size-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
