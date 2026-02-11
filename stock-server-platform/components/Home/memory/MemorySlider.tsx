"use client";

import { useRef } from "react";
import MemoryCard from "./MemoryCard";

const memories = [
  { image: "/Images/Baner/Layer 5.png", title: "HPE 32GB Single Rank x4 DDR4-2933 Registered Smart", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 64GB Quad Rank x4 DDR4-2933 Load Reduced Smart", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 128GB Octal Rank x4 DDR4-2933 Load Reduced FDS", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 16GB Dual Rank x8 DDR4-3200 Registered", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 64GB Dual Rank x4 DDR4-3200 Load Reduced", description: "برای استعلام موجودی تماس بگیرید" },
  { image: "/Images/Baner/Layer 5.png", title: "HPE 32GB Dual Rank x4 DDR4-2933 Registered", description: "برای استعلام موجودی تماس بگیرید" },
];

const CARD_WIDTH = 280;
const GAP = 24;

export default function MemorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative flex items-center">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-2 sm:px-12"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      >
        {memories.map((item, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <MemoryCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
