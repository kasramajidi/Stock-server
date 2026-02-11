"use client";

import Image from "next/image";
import Link from "next/link";

export default function FooterLeft() {
  return (
    <div className="flex flex-col items-center md:items-center space-y-4">
      <Link
        href="https://www.enamad.ir"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
          <Image
            src="/Images/enamad-1star.png"
            alt="نماد اعتماد الکترونیکی"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
          />
        </div>
      </Link>

      <div className="text-center space-y-2">
        <p className="text-sm md:text-base font-semibold text-gray-200">
          نهاد اعتماد الکترونیکی
        </p>
        <p className="text-xs md:text-sm text-gray-400">WWW.eNAMAD.ir</p>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <div className="w-4 h-4 md:w-5 md:h-5">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-500"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        {[2, 3, 4, 5].map((item) => (
          <div key={item} className="w-4 h-4 md:w-5 md:h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        ))}
      </div>

      <p className="text-xs md:text-sm text-gray-400 text-center">
        جهت اطمینان کلیک نمایید
      </p>
    </div>
  );
}

