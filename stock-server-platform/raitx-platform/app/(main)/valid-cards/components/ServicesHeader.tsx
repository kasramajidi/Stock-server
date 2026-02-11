import { HiSparkles } from "react-icons/hi";

export default function ServicesHeader() {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 text-center">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#ff5538]/10 flex items-center justify-center">
          <HiSparkles className="text-[#ff5538] text-xl sm:text-2xl md:text-3xl" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            <span style={{ color: '#ff5538' }}>خدمات</span>{" "}
            <span className="text-[#1a3760]">ما</span>
          </h1>
        </div>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 max-w-2xl mx-auto">
        ريتكس ارائه‌دهنده انواع خدمات پرداخت ارزی، مسافرتی، دانشگاهی و سایر خدمات بین‌المللی است. ما با سال‌ها تجربه در این زمینه، آماده خدمت‌رسانی به شما هستیم.
      </p>
    </div>
  );
}

