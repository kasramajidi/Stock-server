"use client";

import { HiServer, HiShieldCheck, HiChartBar } from "react-icons/hi";

const benefits = [
  {
    title: "خرید سرور مجازی ترید با آی‌پی ثابت",
    description:
      "یکی از دلایل خرید سرور مجازی (VPS) ترید با آی‌پی ثابت، خرید و فروش ارزهای دیجیتال در صرافی‌های مختلف نظیر کوکوین، بیت‌فینکس، بای‌بیت، کوینکس، هوبی و سایر بازارهای مالی است.",
    icon: <HiServer className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
  {
    title: "جلوگیری از مسدود شدن حساب کاربری",
    description:
      "از مزایای خرید سرور مجازی ترید این است که حساب کاربری شما در این صرافی‌ها مسدود نخواهد شد زیرا با آی‌پی ثابت وارد آن می‌شوید.",
    icon: <HiShieldCheck className="text-3xl" />,
    iconColor: "text-[#1a3760]",
  },
  {
    title: "مناسب برای تریدرها و فعالان ارز دیجیتال",
    description:
      "اکثر علاقه‌مندان این نوع سرورها، تریدرها و کسانی هستند که در حوزه ارز دیجیتال فعالیت می‌کنند.",
    icon: <HiChartBar className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
];

export default function VPSTradingBenefits() {
  return (
    <section
      aria-labelledby="vps-trading-benefits-heading"
      className="bg-gradient-to-b from-blue-50/30 to-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-trading-benefits-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center"
      >
        مزایای خرید سرور مجازی ترید
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
