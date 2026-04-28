import type { ComponentType, JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CheckBadgeIcon,
  ClockIcon,
  CreditCardIcon,
  LifebuoyIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import {
  PhoneIcon as SolidPhoneIcon,
  MapPinIcon as SolidMapPinIcon,
} from "@heroicons/react/20/solid";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

import ScrollArrow from "@/components/Layout/ScrollArrow";

/* =======================
   Types
======================= */

interface SimpleLink {
  name: string;
  href: string;
}

interface FooterLinkProps {
  name: string;
  href: string;
}

interface ServiceItem {
  title: string;
  icon: ComponentType<{ className?: string }>;
}

/* =======================
   Data
======================= */

const importantLinks: SimpleLink[] = [
  { name: "سرور اچ پی", href: "/category/server" },
  { name: "خرید سرور استوک", href: "/shop" },
  { name: "خرید رم سرور", href: "/category/ram" },
  { name: "هارد سرور HP", href: "/category/hdd" },
  { name: "قیمت باتری سرور", href: "/category/battery" },
  { name: "فرم ثبت شکایات", href: "#" },
  { name: "فرم نظر سنجی", href: "#" },
];

const quickAccessLinks: SimpleLink[] = [
  { name: "صفحه اصلی", href: "/" },
  { name: "تاریخچه HPE", href: "#" },
  { name: "فروشگاه", href: "/shop" },
  { name: "درخواست پیش فاکتور", href: "#" },
  { name: "تماس با ما", href: "/contact" },
  { name: "درباره ما", href: "/about" },
  { name: "درخواست همکاری", href: "#" },
];

const serviceItems: ServiceItem[] = [
  { title: "پشتیبانی فنی", icon: LifebuoyIcon },
  { title: "ارسال سریع", icon: TruckIcon },
  { title: "پرداخت امن", icon: CreditCardIcon },
  { title: "ضمانت اصالت کالا", icon: CheckBadgeIcon },
  { title: "خدمات تعمیر", icon: WrenchScrewdriverIcon },
];

/* =======================
   Components
======================= */

const FooterLink = ({ name, href, center }: FooterLinkProps & { center?: boolean }): JSX.Element => (
  <li className={`flex items-center gap-2 flex-row-reverse ${center ? "justify-center text-center" : "justify-end text-right"}`}>
    <Link
      href={href}
      className="text-sm text-gray-600 hover:text-[#17e2fe] transition-colors"
    >
      {name}
    </Link>
    <span className="w-1.5 h-1.5 rounded-full bg-[#17e2fe] shrink-0" />
  </li>
);

/* =======================
   Main Footer
======================= */

export default function Footer(): JSX.Element {
  return (
    <footer id="site-footer" className="w-full bg-white mt-16 text-right">
      <div className="flex justify-center border-b border-gray-100">
        <ScrollArrow direction="up" label="برگشت به بالای صفحه" className="!pb-2" />
      </div>
      <div className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 pt-10 sm:pt-12 lg:pt-14">
        {/*
          چیدمان دو بخشی:
          - راست (در RTL اول DOM): لوگو، متن، شبکه‌های اجتماعی — از ابتدای فوتر
          - چپ: بالا آیکن‌های سرویس، پایین لینک‌ها و منوها
        */}
        <div className="flex flex-col gap-10 pb-12 sm:pb-14 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* ستون راست: معرفی برند */}
          <div className="flex w-full shrink-0 flex-col items-stretch gap-5 text-right lg:w-[42%] lg:max-w-[560px] lg:items-start">
            <Image
              src="/Images/Logo/logo stock copy 2.png"
              alt="لوگوی استوک سرور"
              width={300}
              height={102}
              className="-mt-3 object-contain sm:-mt-4"
            />

            <p className="text-base leading-8 text-gray-600">
              شرکت ماهان شبکه ایرانیان یکی از معتبرترین و قدیمی‌ترین شرکت‌هایی است که
              به‌صورت تخصصی در حوزه فروش سرور HPE و قطعات و تجهیزات سرور فعالیت دارد.
              این شرکت با شماره ثبت و شناسه ملی و تاسیس در سال ۱۳۹۶، با مجوزهای لازم
              در حوزه تجارت الکترونیک فعالیت می‌کند و امکان ثبت سفارش به صورت ۲۴ ساعته
              برای مشتریان فراهم است.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <p className="w-full text-sm font-semibold text-gray-700 sm:w-auto">
                ما را در شبکه های اجتماعی دنبال کنید :
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                  aria-label="واتساپ"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/stock-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17e2fe]/10 text-[#17e2fe] transition-colors hover:bg-[#17e2fe]/20"
                  aria-label="اینستاگرام"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@stock-server.ir"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17e2fe]/10 text-[#17e2fe] transition-colors hover:bg-[#17e2fe]/20"
                  aria-label="ایمیل"
                >
                  <HiMail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* ستون چپ: بالا آیکن‌ها، پایین لینک‌ها */}
          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
              {serviceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl bg-slate-50/70 px-2 py-3 text-center md:min-h-0 md:flex-row md:justify-start md:bg-transparent md:px-0 md:py-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17e2fe]/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-[#17e2fe] sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-center md:text-right text-xs sm:text-sm font-medium leading-snug text-gray-700">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <div className="flex flex-col">
                <h4 className="mb-4 inline-block border-b-2 border-[#17e2fe] pb-1.5 text-sm font-bold text-gray-800 sm:text-base">
                  لینک های مهم
                </h4>
                <ul className="space-y-2.5">
                  {importantLinks.map((link) => (
                    <FooterLink key={link.name} {...link} />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="mb-4 inline-block border-b-2 border-[#17e2fe] pb-1.5 text-sm font-bold text-gray-800 sm:text-base">
                  دسترسی سریع
                </h4>
                <ul className="space-y-2.5">
                  {quickAccessLinks.map((link) => (
                    <FooterLink key={link.name} {...link} />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="mb-4 inline-block border-b-2 border-[#17e2fe] pb-1.5 text-sm font-bold text-gray-800 sm:text-base">
                  اطلاعات تماس
                </h4>
                <div className="space-y-3 text-xs text-gray-600 sm:text-sm">
                  <div className="flex flex-row-reverse items-center justify-end gap-2">
                    <span>ساعات پاسخگویی: ۹:۰۰ الی ۱۷:۰۰</span>
                    <ClockIcon className="h-4 w-4 shrink-0 text-[#17e2fe]" />
                  </div>
                  <div className="flex flex-row-reverse items-center justify-end gap-2">
                    <span>پشتیبانی و فروش: ۱۶ - ۴۸۲۸۵۰۰۰</span>
                    <SolidPhoneIcon className="h-4 w-4 shrink-0 text-[#17e2fe]" />
                  </div>
                  <div className="flex flex-row-reverse items-start justify-end gap-2">
                    <div className="text-right">
                      <p className="mb-0.5 font-medium text-gray-700">آدرس فروشگاه :</p>
                      <p>تهران، میدان ولی عصر</p>
                      <p>خیابان ملایی، پلاک ۱</p>
                      <p>ساختمان ماهان، طبقه اول</p>
                    </div>
                    <SolidMapPinIcon className="mt-1 h-4 w-4 shrink-0 text-[#17e2fe]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="mb-4 inline-block border-b-2 border-[#17e2fe] pb-1.5 text-sm font-bold text-gray-800 sm:text-base">
                  مجوزها
                </h4>
                <div className="flex flex-wrap justify-end gap-3">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:h-20 sm:w-20">
                    <span className="px-1 text-center text-[10px] text-gray-400">نماد</span>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:h-20 sm:w-20">
                    <span className="px-1 text-center text-[10px] text-gray-400">e نماد</span>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:h-20 sm:w-20">
                    <span className="px-1 text-center text-[10px] text-gray-400">مجوز</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="bg-gray-50 py-3 sm:py-4">
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          تمامی مطالبه عکس ها و... متعلق به سایت استوک سرور می باشد.
        </p>
      </div>
    </footer>
  );
}
