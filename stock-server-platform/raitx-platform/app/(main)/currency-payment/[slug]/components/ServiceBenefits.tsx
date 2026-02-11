"use client";

import { Service } from "../../components/servicesData";
import { HiCheckCircle, HiShieldCheck, HiClock, HiCurrencyDollar, HiRefresh, HiX, HiCreditCard, HiSupport, HiAcademicCap } from "react-icons/hi";
import { MdSimCard, MdDomain } from "react-icons/md";
import { FaGlobeAmericas, FaServer } from "react-icons/fa";

interface ServiceBenefitsProps {
  service: Service;
}

const benefits = [
  {
    icon: <HiShieldCheck className="text-2xl sm:text-3xl" />,
    title: "امنیت بالا",
    description: "تمام تراکنش‌ها با بالاترین سطح امنیت انجام می‌شود",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiClock className="text-2xl sm:text-3xl" />,
    title: "پردازش سریع",
    description: "خدمات شما در کوتاه‌ترین زمان ممکن انجام می‌شود",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl" />,
    title: "نرخ مناسب",
    description: "بهترین نرخ‌ها و قیمت‌های رقابتی در بازار",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiCheckCircle className="text-2xl sm:text-3xl" />,
    title: "پشتیبانی 24/7",
    description: "پشتیبانی شبانه‌روزی برای پاسخگویی به سوالات شما",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
];

const internationalSimBenefits = [
  {
    icon: <MdSimCard className="text-white text-3xl md:text-4xl" />,
    title: "خرید انواع سیمکارت بین المللی",
    description: "دسترسی به معتبرترین سیم کارت‌های بین‌المللی از کشورهای مختلف",
  },
  {
    icon: <HiRefresh className="text-white text-3xl md:text-4xl" />,
    title: "شارژ سریع و آسان",
    description: "امکان شارژ سریع و آسان سیم کارت در هر زمان و مکان",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-3xl md:text-4xl" />
        <HiX className="text-white text-2xl md:text-3xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری بین‌المللی",
    description: "خرید و شارژ بدون نیاز به کارت اعتباری بین‌المللی",
  },
  {
    icon: <HiClock className="text-white text-3xl md:text-4xl" />,
    title: "تحویل در ۲ الی ۴ روز کاری",
    description: "تحویل سریع سیم کارت در ۲ الی ۴ روز کاری",
  },
];

const domainBenefits = [
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-3xl md:text-4xl" />
        <HiX className="text-white text-2xl md:text-3xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به حساب ارزی",
    description: "خرید دامنه بدون نیاز به داشتن حساب ارزی",
  },
  {
    icon: <HiCurrencyDollar className="text-white text-3xl md:text-4xl" />,
    title: "پرداخت به صورت ریالی",
    description: "امکان پرداخت با ریال ایران",
  },
  {
    icon: <HiCheckCircle className="text-white text-3xl md:text-4xl" />,
    title: "تضمین خرید",
    description: "تضمین انجام خرید و تحویل دامنه",
  },
  {
    icon: <HiClock className="text-white text-3xl md:text-4xl" />,
    title: "سرعت بالا",
    description: "انجام سریع فرآیند خرید دامنه",
  },
];

const virtualNumberBenefits = [
  {
    icon: <HiSupport className="text-white text-2xl sm:text-3xl" />,
    title: "پشتیبانی ۲۴ ساعته",
    description: "پشتیبانی کامل در تمام ساعات شبانه روز",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-2xl sm:text-3xl" />
        <HiX className="text-white text-xl sm:text-2xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری",
    description: "خرید بدون نیاز به کارت اعتباری بین‌المللی",
  },
  {
    icon: <HiClock className="text-white text-2xl sm:text-3xl" />,
    title: "سرویس سریع",
    description: "دریافت فوری شماره مجازی پس از پرداخت",
  },
  {
    icon: <HiShieldCheck className="text-white text-2xl sm:text-3xl" />,
    title: "امنیت بالا",
    description: "حفظ حریم خصوصی و امنیت اطلاعات",
  },
  {
    icon: <HiCheckCircle className="text-white text-2xl sm:text-3xl" />,
    title: "مدت زمان تحویل",
    description: "فوری",
  },
];

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isInternationalSim = service.id === "international-sim";
  const isVirtualNumber = service.id === "virtual-number";
  const isDomain = service.id === "domain";
  const isLanguageExam = service.id === "language-exam";
  const isStudentPayment = service.id === "student-payment";
  const isInternationalExam = service.id === "international-exam";
  const isVPSTrading = service.id === "vps-trading";
  const isVPSDaily = service.id === "vps-daily";
  const isVPSUSA = service.id === "vps-usa";
  const isVPSNetherlands = service.id === "vps-netherlands";
  const isVPSFrance = service.id === "vps-france";

  return (
    <>
      {isVPSFrance && (
        <>
          {/* VPS France Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaServer className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                VPS فرانسه
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                سرویس‌های VPS برای تریدینگ و استفاده روزانه
              </p>
            </div>
          </div>
        </>
      )}

      {isVPSNetherlands && (
        <>
          {/* VPS Netherlands Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaServer className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                VPS هلند
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                سرویس‌های VPS برای تریدینگ و استفاده روزانه
              </p>
            </div>
          </div>
        </>
      )}

      {isVPSUSA && (
        <>
          {/* VPS USA Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaServer className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                VPS آمریکا
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                سرویس‌های VPS برای تریدینگ و استفاده روزانه
              </p>
            </div>
          </div>
        </>
      )}

      {isVPSDaily && (
        <>
          {/* VPS Daily Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaServer className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                VPS روزانه
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                سرویس‌های VPS برای تریدینگ و استفاده روزانه
              </p>
            </div>
          </div>
        </>
      )}

      {isVPSTrading && (
        <>
          {/* VPS Trading Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaServer className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                VPS تریدینگ
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                سرویس‌های VPS برای تریدینگ و استفاده روزانه
              </p>
            </div>
          </div>
        </>
      )}

      {isInternationalExam && (
        <>
          {/* International Exam Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <FaGlobeAmericas className="text-3xl sm:text-4xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                آزمون‌های بین‌المللی
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                ثبت نام آزمون‌های زبان و بین‌المللی و پرداخت‌های دانشجویی
              </p>
            </div>
          </div>
        </>
      )}

      {isStudentPayment && (
        <>
          {/* Student Payment Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <HiAcademicCap className="text-4xl sm:text-5xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                پرداخت دانشجویی
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                ثبت نام آزمون‌های زبان و بین‌المللی و پرداخت‌های دانشجویی
              </p>
            </div>
          </div>
        </>
      )}

      {isLanguageExam && (
        <>
          {/* Language Exam Intro Box - site theme #ff5538 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-[#ff5538]/20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <HiAcademicCap className="text-4xl sm:text-5xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#ff5538] text-center mb-2">
                ثبت نام آزمون زبان
              </h2>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl leading-relaxed">
                ثبت نام آزمونهای زبان و بین المللی و پرداخت های دانشجویی
              </p>
            </div>
          </div>
        </>
      )}

      {isDomain && (
        <>
          {/* Domain Benefits Box */}
          <div className="bg-gray-50 rounded-xl shadow-sm p-5 md:p-6 mb-6 border border-gray-100">
            <div className="flex flex-col items-center mb-5 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#ff5538]/10 flex items-center justify-center mb-3 text-[#ff5538]">
                <MdDomain className="text-2xl sm:text-3xl" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1">
                خرید دامنه
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                خدمات بین‌المللی شامل سیم کارت، شماره مجازی، دامنه و هاست
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {domainBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex items-start gap-3 sm:gap-4 flex-row-reverse"
                >
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1a3760] flex items-center justify-center [&_svg]:!text-lg [&_svg]:sm:!text-xl">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-5">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isInternationalSim && (
        <>
          {/* Benefits Box */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 lg:p-10 mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              خرید معتبرترین سیم کارت‌های بین المللی برای سفرهای خارجی
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-7 md:leading-8 text-right mb-6 md:mb-8">
              اگر قصد و یا تجربه سفر به کشورهای خارجی را داشته باشید، میدانید که خرید سیم کارت های بین المللی تا چه حد می‌توانند چالش‌های ارتباطی شما را از لحاظ سرویس‌دهی، سهولت تماس، اتصال به اینترنت و همچنین هزینه برطرف سازند!
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-7 md:leading-8 text-right mb-8 md:mb-10">
              با استفاده از خدمات ريتكس می‌توانید در کوتاه‌ترین زمان ممکن و بدون نیاز به داشتن حساب ارزی و کارت اعتباری بین المللی، تنها با پرداخت معادل ریالی سرویس، معتبرترین سیم کارت‌های بین المللی را خریداری کنید.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {internationalSimBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center mb-5 md:mb-6">
                    <div className="bg-blue-900 w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 text-center min-h-12 md:min-h-14 flex items-center justify-center">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-6 md:leading-7 text-right">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
          چرا {service.label} را از ما انتخاب کنید؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:border-[#ff5538]/30 hover:shadow-md transition-all duration-200"
            >
              <div className={`${benefit.color} ${benefit.iconColor} p-2 sm:p-3 rounded-lg shrink-0`}>
                {benefit.icon}
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

