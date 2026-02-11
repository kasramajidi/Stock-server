import Image from "next/image";
import { HiCube, HiUser, HiTruck, HiShoppingCart } from "react-icons/hi";

export default function FeatureCards() {
  return (
    <div className="relative mt-8 sm:mt-12 md:mt-16 lg:mt-20 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden min-h-[180px] sm:min-h-[250px] md:h-[220px] lg:h-[180px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/bg-img2.png"
          alt="Background"
          fill
          className="object-cover object-center opacity-20"
          quality={100}
          priority={false}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 relative z-10 p-3 sm:p-6 md:p-8 items-start sm:items-end h-full">
        <div className="hidden sm:block absolute top-6 md:top-8 left-6 md:left-8 right-6 md:right-8 h-px border-t border-dashed border-gray-300 opacity-40"></div>

        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow relative pt-4 sm:pt-5 transform translate-y-0 sm:translate-y-0">
          <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse">
            <div className="flex flex-col text-right flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">قیمت مناسب</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed">خرید به صرفه و اقتصادی</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-brand rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
              <HiShoppingCart className="text-white text-sm sm:text-base md:text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow relative pt-4 sm:pt-5 transform translate-y-0 sm:translate-y-[-20px]">
          <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse">
            <div className="flex flex-col text-right flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">ارسال آسان</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed">ارسال سریع محصولات شما</p>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#ff5538' }}>
              <HiTruck className="text-white text-xs sm:text-sm md:text-base" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow relative pt-4 sm:pt-5 transform translate-y-0 sm:translate-y-0">
          <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse">
            <div className="flex flex-col text-right flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">ایجاد حساب</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed">ایجاد حساب اختصاصی</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-brand rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
              <HiUser className="text-white text-sm sm:text-base md:text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow relative pt-4 sm:pt-5 transform translate-y-0 sm:translate-y-[-20px]">
          <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse">
            <div className="flex flex-col text-right flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">محصولات اصل</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-relaxed">تنوع، کیفیت و کمیت بالا</p>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#ff5538' }}>
              <HiCube className="text-white text-xs sm:text-sm md:text-base" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

