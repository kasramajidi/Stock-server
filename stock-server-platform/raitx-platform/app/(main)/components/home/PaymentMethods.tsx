"use client";

import Link from "next/link";
import { SiMastercard, SiPaypal } from "react-icons/si";

interface PaymentCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const paymentMethods: PaymentCard[] = [
  {
    icon: (
      <SiMastercard className="text-4xl sm:text-5xl md:text-6xl text-[#EB001B]" />
    ),
    title: "مسترکارت",
    description: "دریافت کارت اعتباری و پرداخت با مستر کارت",
    href: "/valid-cards",
  },
  {
    icon: (
      <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />
    ),
    title: "پی‌پال",
    description: "نقد درآمد پی‌پال و پرداخت با پی‌پال",
    href: "/currency-payment",
  },
];

export default function PaymentMethods() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          پرداخت ارزی آنلاین با پی‌پال و مستر کارت
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">
          ريتكس پرداخت با مسترکارت و پی‌پال را با امنیت و بهترین نرخ انجام می‌دهد. برای جزئیات به صفحات خدمات ارزی و کارت‌های اعتباری مراجعه کنید.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {paymentMethods.map((method, index) => (
            <Link
              key={index}
              href={method.href}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-center">
                {method.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {method.title}
              </h3>
              <p className="text-xs text-gray-600">{method.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
