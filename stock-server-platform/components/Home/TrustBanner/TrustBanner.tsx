"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const trustLogos = [
  { src: "/Images/Category/CPU.png", alt: "برند ۱" },
  { src: "/Images/Logo/logo stock copy 2.png", alt: "برند ۲" },
  { src: "/Images/Category/CPU.png", alt: "برند ۳" },
  { src: "/Images/Logo/logo stock copy 2.png", alt: "برند ۴" },
  { src: "/Images/Category/CPU.png", alt: "برند ۵" },
  { src: "/Images/Logo/logo stock copy 2.png", alt: "برند ۶" },
  { src: "/Images/Category/CPU.png", alt: "برند ۷" },
  { src: "/Images/Logo/logo stock copy 2.png", alt: "برند ۸" },
  { src: "/Images/Category/CPU.png", alt: "برند ۹" },
  { src: "/Images/Logo/logo stock copy 2.png", alt: "برند ۱۰" },
];

export default function TrustBanner() {
  return (
    <section className="w-full py-8 sm:py-10 bg-gray-50/80">
      <div className="mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px]">
        <h2 className="text-center text-gray-800 font-semibold text-lg sm:text-xl mb-6">
          مفتخریم به اعتماد شما
        </h2>

        <div className="relative px-0 sm:px-12 md:px-16 lg:px-20">
          <Carousel
            opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
            className="w-full"
          >
            <CarouselContent className="-ms-4">
              {trustLogos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="ps-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <div className="flex justify-center items-center w-full h-[80px] sm:h-[90px] bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={90}
                      height={50}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 z-10 size-9 sm:size-10 bg-white border border-gray-200 shadow-md hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF] [&_svg]:size-5" />
            <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 z-10 size-9 sm:size-10 bg-white border border-gray-200 shadow-md hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF] [&_svg]:size-5" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
