"use client";

import Link from "next/link";
import { HiServer, HiGlobe, HiAcademicCap } from "react-icons/hi";
import { HiOutlineDesktopComputer } from "react-icons/hi";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    icon: (
      <HiOutlineDesktopComputer className="text-4xl sm:text-5xl md:text-6xl text-green-500" />
    ),
    title: "اکانت‌های پریمیوم",
    description: "خرید اکانت هوش مصنوعی، سئو، بازی و نرم‌افزار",
    href: "/currency-payment/ai-account",
  },
  {
    icon: (
      <HiAcademicCap className="text-4xl sm:text-5xl md:text-6xl text-[#ff5538]" />
    ),
    title: "آموزش و آزمون",
    description: "ثبت نام آزمون زبان و بین‌المللی، پرداخت دانشجویی",
    href: "/currency-payment/language-exam",
  },
  {
    icon: (
      <HiGlobe className="text-4xl sm:text-5xl md:text-6xl text-blue-500" />
    ),
    title: "خدمات بین‌المللی",
    description: "سیم کارت، شماره مجازی، دامنه و هاست",
    href: "/currency-payment/international-sim",
  },
  {
    icon: (
      <HiServer className="text-4xl sm:text-5xl md:text-6xl text-red-500" />
    ),
    title: "سرویس‌های VPS",
    description: "VPS تریدینگ، روزانه، آمریکا، هلند و فرانسه",
    href: "/currency-payment/vps-trading",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-1">
            خدمات ارزی و پرداخت ارزی
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            ريتكس (RAITX) پرداخت ارزی، اکانت پریمیوم، آزمون و ویزا، سیم کارت و VPS را با امنیت و بهترین نرخ ارائه می‌دهد.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/currency-payment"
            className="inline-block px-6 py-2.5 bg-[#ff5538] text-white rounded-lg text-sm font-medium hover:opacity-90"
          >
            مشاهده همه خدمات پرداخت ارزی
          </Link>
          <span className="mx-2 text-gray-400">|</span>
          <Link
            href="/valid-cards"
            className="inline-block px-6 py-2.5 border border-[#ff5538] text-[#ff5538] rounded-lg text-sm font-medium hover:bg-[#ff5538] hover:text-white"
          >
            کارت‌های اعتباری
          </Link>
        </div>
      </div>
    </section>
  );
}
