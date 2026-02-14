"use client";
import Image from "next/image";

type DLServerCardProps = {
  title: string;
  image: string;
  oldPrice?: string | null;
  price?: string | null;
};

export default function DLServerCard({ title, image, oldPrice, price }: DLServerCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-between text-center shrink-0 w-[250px] sm:w-[270px] md:w-[290px] lg:w-[300px] min-h-[380px] sm:min-h-[400px]
      bg-white rounded-xl border border-gray-100 shadow hover:shadow-lg transition-shadow duration-200"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Image */}
      <div className="relative h-[180px] sm:h-[200px] bg-[#00DDFF] rounded-t-xl w-full flex justify-center items-center overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="300px"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 text-[10px] text-center">
          استوک سرور
        </div>
      </div>

      {/* Content - ارتفاع ثابت تا کارت‌ها یکسان باشند */}
      <div className="p-4 flex flex-col items-center text-center w-full flex-1 min-h-[200px]">
        <p className="text-sm text-gray-800 leading-relaxed mb-3 line-clamp-2">{title}</p>

        {/* Prices - بلوک با ارتفاع ثابت */}
        <div className="min-h-[52px] flex flex-col justify-center gap-1 mb-3 items-center w-full">
          {price ? (
            <>
              {oldPrice && (
                <span className="text-xs text-gray-400 line-through">{oldPrice} تومان</span>
              )}
              <span className="text-sm font-bold text-gray-800">{price} تومان</span>
            </>
          ) : (
            <p className="text-sm text-gray-800">تماس بگیرید</p>
          )}
        </div>

        {/* Button */}
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00DDFF] text-white hover:bg-[#00c4e6] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
