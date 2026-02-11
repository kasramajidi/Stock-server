import { HiQuestionMarkCircle, HiInformationCircle } from "react-icons/hi";

export default function FAQHeader() {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10 text-right">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#ff5538]/10 flex items-center justify-center">
          <HiQuestionMarkCircle className="text-[#ff5538] text-lg sm:text-xl md:text-2xl" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-right leading-tight">
            <span style={{ color: '#ff5538' }}>سوالات</span>{" "}
            <span className="text-brand">متداول</span>
          </h1>
        </div>
      </div>
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-muted flex items-center justify-center">
            <HiInformationCircle className="text-brand text-xs sm:text-sm" />
          </div>
        </div>
        <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 md:leading-7 text-justify sm:text-right flex-1">
          پاسخ به سوالات رایج شما درباره خدمات ريتكس. در این بخش می‌توانید پاسخ سوالات خود را در مورد خدمات ارزی، پرداخت‌های بین‌المللی و سایر خدمات ما پیدا کنید.
        </p>
      </div>
    </div>
  );
}
