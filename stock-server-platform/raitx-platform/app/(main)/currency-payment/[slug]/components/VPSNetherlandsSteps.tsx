"use client";

import { HiUserAdd, HiDocumentText, HiCreditCard, HiCheckCircle } from "react-icons/hi";

const steps = [
  {
    title: "ثبت نام در سایت ريتكس",
    description: "شما هم به ريتكس بپیوندید. برای خرید سرور مجازی در سایت ثبت نام کنید.",
    icon: <HiUserAdd className="text-3xl" />,
    bgColor: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    title: "ثبت درخواست خرید سرور مجازی",
    description: "بسته به هدف خود و سایت مورد نظر، سرور مجازی خود را بر حسب کشور مناسب انتخاب نمایید.",
    icon: <HiDocumentText className="text-3xl" />,
    bgColor: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
  {
    title: "تکمیل اطلاعات و پرداخت هزینه",
    description: "وارد پنل کاربری خود شده و ثبت سفارش سرور مجازی را انجام دهید.",
    icon: <HiCreditCard className="text-3xl" />,
    bgColor: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    title: "سرور شما آماده استفاده است!",
    description: "پس از ثبت درخواست و پرداخت هزینه ریالی، سرور مجازی مورد نظر شما خریداری می‌شود.",
    icon: <HiCheckCircle className="text-3xl" />,
    bgColor: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
];

export default function VPSNetherlandsSteps() {
  return (
    <section
      aria-labelledby="vps-netherlands-steps-heading"
      className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-netherlands-steps-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center"
      >
        مراحل خرید سرور مجازی هلند از ريتكس
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-[#ff5538]/20 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center`}
                aria-hidden
              >
                <span className={step.iconColor}>{step.icon}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
