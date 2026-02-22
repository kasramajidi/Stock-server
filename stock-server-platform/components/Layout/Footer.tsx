import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CheckBadgeIcon,
  CreditCardIcon,
  TruckIcon,
  LifebuoyIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
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
      <div className="mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] pt-8 sm:pt-10 lg:pt-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 pb-8 sm:pb-12">
          {/* Column 1: Company Info & Social (rightmost in RTL) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 order-1 flex flex-col">
            {/* سرویس بالای این بخش - وسط */}

            <Image
              src="/Images/Logo/logo stock copy 2.png"
              alt="لوگوی استوک سرور"
              width={150}
              height={50}
              className="object-contain"
            />

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
              شرکت ماهان شبکه ایرانیان یکی از معتبرترین و قدیمی‌ترین شرکت‌هایی است که
              به‌صورت تخصصی در حوزه فروش سرور HPE و قطعات و تجهیزات سرور فعالیت دارد.
              این شرکت با شماره ثبت و شناسه ملی و تاسیس در سال ۱۳۹۶، با مجوزهای لازم
              در حوزه تجارت الکترونیک فعالیت می‌کند و امکان ثبت سفارش به صورت ۲۴ ساعته
              برای مشتریان فراهم است.
            </p>

            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                ما را در شبکه های اجتماعی دنبال کنید :
              </p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  aria-label="واتساپ"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/stock-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center text-[#17e2fe] hover:bg-[#17e2fe]/20 transition-colors"
                  aria-label="اینستاگرام"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@stock-server.ir"
                  className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center text-[#17e2fe] hover:bg-[#17e2fe]/20 transition-colors"
                  aria-label="ایمیل"
                >
                  <HiMail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Important Links */}
          <div className="order-2 flex flex-col">
            {/* سرویس بالای این بخش - وسط */}
            <div className="flex flex-col items-center justify-center gap-2 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30">
                <WrenchScrewdriverIcon className="w-5 h-5 text-[#17e2fe]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">خدمات تعمیر</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold border-b-2 border-[#17e2fe] pb-1.5 inline-block text-gray-800 mb-4">
              لینک های مهم
            </h4>
            <ul className="space-y-2.5">
              {importantLinks.map((link) => (
                <FooterLink key={link.name} {...link} />
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Access */}
          <div className="order-3 flex flex-col items-center text-center">
            {/* سرویس بالای این بخش - وسط */}
            <div className="flex flex-col items-center justify-center gap-2 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30">
                <CheckBadgeIcon className="w-5 h-5 text-[#17e2fe]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">ضمانت اصالت کالا</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold border-b-2 border-[#17e2fe] pb-1.5 inline-block text-gray-800 mb-4">
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5 w-full flex flex-col items-center">
              {quickAccessLinks.map((link) => (
                <FooterLink key={link.name} {...link} center />
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="order-4 flex flex-col">
            {/* سرویس بالای این بخش - وسط */}
            <div className="flex flex-col items-center justify-center gap-2 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30">
                <CreditCardIcon className="w-5 h-5 text-[#17e2fe]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">پرداخت امن</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold border-b-2 border-[#17e2fe] pb-1.5 inline-block text-gray-800 mb-4">
              اطلاعات تماس
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 justify-end flex-row-reverse">
                <span>ساعات پاسخگویی: ۹:۰۰ الی ۱۷:۰۰</span>
                <ClockIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
              </div>

              <div className="flex items-center gap-2 justify-end flex-row-reverse">
                <span>پشتیبانی و فروش: ۱۶ - ۴۸۲۸۵۰۰۰</span>
                <SolidPhoneIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
              </div>

              <div className="flex items-start gap-2 justify-end flex-row-reverse">
                <div className="text-right">
                  <p className="font-medium text-gray-700 mb-0.5">آدرس فروشگاه :</p>
                  <p>تهران، میدان ولی عصر</p>
                  <p>خیابان ملایی، پلاک ۱</p>
                  <p>ساختمان ماهان، طبقه اول</p>
                </div>
                <SolidMapPinIcon className="w-4 h-4 text-[#17e2fe] shrink-0 mt-1" />
              </div>
            </div>
          </div>

          {/* Column 5: Licenses */}
          <div className="order-5 flex flex-col">
            {/* دو آیکون کنار هم: ارسال سریع و پشتیبانی فنی */}
            <div className="flex items-center flex-wrap i justify-between gap-4 sm:gap-6 pb-4 mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30">
                  <TruckIcon className="w-5 h-5 text-[#17e2fe]" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">ارسال سریع</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30">
                  <LifebuoyIcon className="w-5 h-5 text-[#17e2fe]" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">پشتیبانی فنی</span>
              </div>
            </div>
            <h4 className="text-sm sm:text-base font-bold border-b-2 border-[#17e2fe] pb-1.5 inline-block text-gray-800 mb-4">
              مجوزها
            </h4>

            <div className="flex flex-wrap gap-3 justify-end">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-[10px] text-gray-400 text-center px-1">نماد</span>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-[10px] text-gray-400 text-center px-1">e نماد</span>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-[10px] text-gray-400 text-center px-1">مجوز</span>
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
