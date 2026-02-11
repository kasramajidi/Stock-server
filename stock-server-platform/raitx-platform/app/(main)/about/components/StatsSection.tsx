import Image from "next/image";

export default function StatsSection() {
  return (
    <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/bg-img2.png"
            alt="Background"
            fill
            className="object-cover object-center opacity-60"
            quality={100}
            priority={false}
          />
          <div className="absolute inset-0 opacity-80" style={{ backgroundColor: '#1a3760' }}></div>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 gap-4 sm:gap-6 md:gap-8">
          <div className="flex items-center justify-end flex-1">
            <div className="flex flex-col justify-center text-right">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-1.5 leading-tight">
                هر آنچه داریم از مهر شماست
              </h2>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6">
                ريتكس با تمرکز بر خدمات ارزی و پرداخت ارزی، نقد درآمد پی‌پال، پرداخت با مسترکارت، ویزا و سفارت، آزمون‌های بین‌المللی و سفر را با امنیت و سرعت انجام می‌دهد. رضایت مشتریان و شفافیت در معاملات از اهداف ماست.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4">
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#ff5538] transition-all duration-300 cursor-pointer w-[80px] sm:w-[90px] md:w-[100px] h-[70px] sm:h-[75px] md:h-[80px] flex flex-col justify-center group">
                <div className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 text-right group-hover:text-white transition-colors" style={{ color: '#1a3760' }}>
                  ۵,۰۰۰
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 text-right group-hover:text-white transition-colors">
                  مشتری راضی
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#ff5538] transition-all duration-300 cursor-pointer w-[80px] sm:w-[90px] md:w-[100px] h-[70px] sm:h-[75px] md:h-[80px] flex flex-col justify-center group">
                <div className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 text-right group-hover:text-white transition-colors" style={{ color: '#1a3760' }}>
                  ۲,۰۰۰
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 text-right group-hover:text-white transition-colors">
                  پروژه موفق
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md hover:bg-[#ff5538] transition-all duration-300 cursor-pointer w-[80px] sm:w-[90px] md:w-[100px] h-[70px] sm:h-[75px] md:h-[80px] flex flex-col justify-center group">
                <div className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1 text-right group-hover:text-white transition-colors" style={{ color: '#1a3760' }}>
                  ۲۰
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 text-right group-hover:text-white transition-colors">
                  سال تجربه
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

