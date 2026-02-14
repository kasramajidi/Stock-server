"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MemoryCard from "./MemoryCard";

const memories = [
  { image: "/Images/Baner/Layer 5.png", title: "HPE 32GB Single Rank x4 DDR4-2933 Registered Smart", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 64GB Quad Rank x4 DDR4-2933 Load Reduced Smart", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 128GB Octal Rank x4 DDR4-2933 Load Reduced FDS", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 16GB Dual Rank x8 DDR4-3200 Registered", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 64GB Dual Rank x4 DDR4-3200 Load Reduced", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 32GB Dual Rank x4 DDR4-2933 Registered", description: "برای استعلام موجودی تماس بگیرید" },
];

export default function MemorySlider() {
  return (
    <Carousel
      opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
      className="relative w-full max-w-[280px] sm:max-w-[584px] md:max-w-[888px] lg:max-w-[1192px] mx-auto min-w-0"
    >
      <CarouselContent className="-ms-4">
        {memories.map((item, index) => (
          <CarouselItem
            key={index}
            className="ps-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 min-w-0"
          >
            <div className="flex justify-center w-full sm:justify-start">
              <MemoryCard {...item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
      <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
    </Carousel>
  );
}
