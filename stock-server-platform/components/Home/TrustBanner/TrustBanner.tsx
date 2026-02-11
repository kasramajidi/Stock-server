"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TrustBanner() {
  return (
    <section className="w-full py-8 bg-no-repeat bg-center">
      {/* Title */}
      <h2 className="text-center text-red-600 font-semibold text-lg mb-6">
        مفتخریم به اعتماد شما
      </h2>

      <div className="relative max-w-6xl mx-auto flex items-center justify-center">
        {/* Left Arrow – فقط دسکتاپ */}
        <button className="hidden md:block absolute left-0 text-gray-300 hover:text-gray-500 transition">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        {/* Logos */}
        <div
          className="
            flex items-center gap-10 px-12
            overflow-x-auto md:overflow-visible
            scrollbar-hide
          "
        >
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
        </div>

        {/* Right Arrow – فقط دسکتاپ */}
        <button className="hidden md:block absolute right-0 text-gray-300 hover:text-gray-500 transition">
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
