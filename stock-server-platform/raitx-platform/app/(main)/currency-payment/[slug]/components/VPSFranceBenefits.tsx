"use client";

import { HiServer, HiShieldCheck, HiChartBar } from "react-icons/hi";

const benefits = [
  {
    title: "آی‌پی خاص فرانسه برای دسترسی به خدمات اروپایی",
    description:
      "یکی از دلایل مهم خرید سرور مجازی (VPS) فرانسه، آی‌پی خاص این کشور است که دارای سرعت و ثبات بالایی است و از شهر پاریس ارائه می‌گردد. کاربرانی که در حوزه تجارت الکترونیک فعال هستند، از علاقه‌مندان سرورهای مجازی می‌باشند.",
    icon: <HiServer className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
  {
    title: "کمترین حساسیت نسبت به کپی‌رایت",
    description:
      "سرور مجازی فرانسه کمترین حساسیت را نسبت به کپی‌رایت و کرک دارد. به همین دلیل، شما با خرید VPS فرانسه و اتصال به آن، می‌توانید از تمام مزایای یک شهروند فرانسوی استفاده کنید.",
    icon: <HiShieldCheck className="text-3xl" />,
    iconColor: "text-[#1a3760]",
  },
  {
    title: "سرعت بالا و کیفیت مناسب از پاریس",
    description:
      "در واقع شما می‌توانید با سفارش سرور مجازی فرانسه از ريتكس، از سرعت بالای سرورهای آن بهره‌مند گردید.",
    icon: <HiChartBar className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
];

export default function VPSFranceBenefits() {
  return (
    <section
      aria-labelledby="vps-france-benefits-heading"
      className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-france-benefits-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        مزایا و ویژگی‌های خرید سرور مجازی فرانسه از ريتكس
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        چرا سرور مجازی فرانسه انتخاب مناسبی است؟
      </p>
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
