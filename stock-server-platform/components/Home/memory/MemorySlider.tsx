import MemoryCard from "./MemoryCard";

const memories = [
  {
    image:   '/Images/Baner/Layer 5.png',

    title:
      "HPE 32GB Single Rank x4 DDR4-2933 Registered Smart",
    description: "برای استعلام موجودی تماس بگیرید",
  },
  {
    image:   '/Images/Baner/Layer 5.png',

    title:
      "HPE 64GB Quad Rank x4 DDR4-2933 Load Reduced Smart",
    description: "برای استعلام موجودی تماس بگیرید",
  },
  {
    image:   '/Images/Baner/Layer 5.png',

    title:
      "HPE 128GB Octal Rank x4 DDR4-2933 Load Reduced FDS",
    description: "برای استعلام موجودی تماس بگیرید",
  },
  {
    image:   '/Images/Baner/Layer 5.png',

    title:
      "HPE 16GB Dual Rank x8 DDR4-3200 Registered",
    description: "برای استعلام موجودی تماس بگیرید",
  },
];

export default function MemorySlider() {
  return (
    <div className="relative">
      {/* Slider */}
      <div
        className="flex gap-6 overflow-x-auto scrollbar-hide px-10 py-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {memories.map((item, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <MemoryCard {...item} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
        ‹
      </button>
      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
        ›
      </button>
    </div>
  );
}
