"use client";

import { HiServer, HiShieldCheck, HiGlobe } from "react-icons/hi";

const benefits = [
  {
    title: "خرید سرور مجازی روزانه برای استفاده کوتاه‌مدت",
    description:
      "خرید سرور مجازی روزانه (Daily VPS) برای مواردی همچون ثبت‌نام، خرید و فروش و هرگونه فعالیتی که برای یک الی چند روز نیازمند اینترنت پرسرعت می‌باشند، بهترین گزینه‌ای است که منافع شما را هم از لحاظ کیفی و سرعت نت و هم از لحاظ هزینه تأمین می‌کند.",
    icon: <HiServer className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
  {
    title: "مقرون به صرفه برای استفاده کوتاه‌مدت",
    description:
      "در نظر داشته باشید، برای مواقعی که تنها به چند روز اینترنت پرسرعت نیازمندید، خریداری سرورهای مجازی روزانه ارزان‌ترین مورد برای شما خواهند بود.",
    icon: <HiShieldCheck className="text-3xl" />,
    iconColor: "text-[#1a3760]",
  },
  {
    title: "سرورهای آمریکا و انگلیس با ویندوز",
    description:
      "سرورهای مجازی روزانه ريتكس از کشورهای آمریکا و انگلیس ارائه شده و برای سیستم‌عامل ویندوز مناسب است.",
    icon: <HiGlobe className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
];

export default function VPSDailyBenefits() {
  return (
    <section
      aria-labelledby="vps-daily-benefits-heading"
      className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-daily-benefits-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center"
      >
        مزایای خرید سرور مجازی روزانه
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-[#ff5538]/20 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-14 h-14 rounded-full bg-[#ff5538]/10 flex items-center justify-center"
                aria-hidden
              >
                <span className={benefit.iconColor}>{benefit.icon}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
