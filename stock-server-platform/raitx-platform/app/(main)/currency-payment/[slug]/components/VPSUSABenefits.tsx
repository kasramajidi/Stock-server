"use client";

import { HiServer, HiShieldCheck } from "react-icons/hi";

const benefits = [
  {
    title: "آی‌پی خاص آمریکا برای دسترسی به خدمات آمریکایی",
    description:
      "یکی از دلایل مهم خرید سرور مجازی (VPS) آمریکا، آی‌پی خاص این کشور است که امکان بهره‌وری از امکانات برای کاربران مختلف را فراهم می‌کند. کاربرانی که در حوزه‌های مختلف وب‌سایت و تجارت الکترونیک فعالیت می‌کنند یا برای پرداخت‌های خود به پی‌پال، ویزاکارت و … نیاز دارند، اهمیت داشتن یک سرور مجازی را به خوبی درک کرده‌اند.",
    icon: <HiServer className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
  {
    title: "مزایای کاربر آمریکایی در وب‌سایت‌های مختلف",
    description:
      "با خرید VPS آمریکا و اتصال به آن، می‌توانید از تمام مزایای یک کاربر آمریکایی در وب‌سایت‌های مختلف بهره‌مند شوید. قابل توجه است که می‌توانید با سفارش سرور مجازی آمریکا از ريتكس، از سرعت بالای سرورهای روز دنیا لذت ببرید.",
    icon: <HiShieldCheck className="text-3xl" />,
    iconColor: "text-[#1a3760]",
  },
  {
    title: "سرعت بالا و کیفیت مناسب",
    description:
      "سرورهای مجازی آمریکا ريتكس با سرعت بالا و کیفیت مناسب برای انواع کاربردهای تجاری و شخصی ارائه می‌شوند.",
    icon: <HiServer className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
];

export default function VPSUSABenefits() {
  return (
    <section
      aria-labelledby="vps-usa-benefits-heading"
      className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-usa-benefits-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center"
      >
        مزایای خرید سرور مجازی آمریکا
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
