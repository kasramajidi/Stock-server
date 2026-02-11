import type { ComponentType, SVGProps, JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CheckBadgeIcon,
  CreditCardIcon,
  TruckIcon,
  LifebuoyIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import {
  PhoneIcon as SolidPhoneIcon,
  MapPinIcon as SolidMapPinIcon,
} from "@heroicons/react/20/solid";

/* =======================
   Types
======================= */

interface FeatureItem {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

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

const topFeatures: FeatureItem[] = [
  { name: "پشتیبانی فنی", icon: LifebuoyIcon },
  { name: "خدمات تعمیر", icon: WrenchScrewdriverIcon },
  { name: "ضمانت اصالت کالا", icon: CheckBadgeIcon },
  { name: "پرداخت امن", icon: CreditCardIcon },
  { name: "ارسال سریع", icon: TruckIcon },
];

const importantLinks: SimpleLink[] = [
  { name: "سرور اچ پی", href: "#" },
  { name: "خرید سرور استوک", href: "#" },
  { name: "خرید رم سرور", href: "#" },
  { name: "هارد سرور HP", href: "#" },
  { name: "قیمت باتری سرور", href: "#" },
  { name: "فرم ثبت شکایات", href: "#" },
  { name: "فرم نظر سنجی", href: "#" },
];

const quickAccessLinks: SimpleLink[] = [
  { name: "صفحه اصلی", href: "/" },
  { name: "فروشگاه", href: "/shop" },
  { name: "وبلاگ", href: "/blog" },
  { name: "تماس با ما", href: "/contact" },
  { name: "درباره ما", href: "/about" },
];

/* =======================
   Components
======================= */

const FooterLink = ({ name, href }: FooterLinkProps): JSX.Element => (
  <li className="flex items-center gap-2 flex-row-reverse justify-end">
    <Link
      href={href}
      className="text-sm text-gray-600 hover:text-[#17e2fe] transition-colors text-right"
    >
      {name}
    </Link>
    <AcademicCapIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
  </li>
);

/* =======================
   Main Footer
======================= */

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-10 lg:px-16 bg-white mt-16 text-right">
      <div className="pt-8 sm:pt-10 lg:pt-12">
        {/* Top Features */}
        <div className="hidden md:flex flex-row flex-wrap items-center justify-center sm:justify-between gap-6 lg:gap-8 text-right pb-6 lg:pb-8 mb-6 lg:mb-8">
          {topFeatures.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#17e2fe]/10 flex items-center justify-center border-2 border-[#17e2fe]/30 shadow-sm">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#17e2fe]" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 pb-8 sm:pb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Image
              src="/Images/Logo/logo stock copy 2.png"
              alt="لوگوی استوک سرور"
              width={150}
              height={50}
              className="object-contain"
            />

            <p className="text-sm text-gray-600 leading-relaxed pt-2">
              شرکت ماهان شبکه ایرانیان یکی از معتبرترین و قدیمی‌ترین شرکت‌هایی
              است که به‌صورت تخصصی در حوزه فروش سرور HPE و سایر قطعات و تجهیزات
              سرور فعالیت دارد...
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <a href="#" className="p-2 rounded-full bg-[#17e2fe]/10 text-[#17e2fe] hover:bg-[#17e2fe]/20 transition-colors" aria-label="شبکه اجتماعی">
                <AcademicCapIcon className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#17e2fe]/10 text-[#17e2fe] hover:bg-[#17e2fe]/20 transition-colors" aria-label="شبکه اجتماعی">
                <AcademicCapIcon className="w-5 h-5" />
              </a>
            </div>

            <p className="text-xs font-semibold text-gray-700 text-right">
              ما را در شبکه‌های اجتماعی دنبال کنید:
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold border-b-2 border-[#17e2fe] pb-1.5 text-right text-gray-800 mb-4">
              لینک‌های مهم
            </h4>
            <ul className="space-y-2.5">
              {importantLinks.map((link) => (
                <FooterLink key={link.name} {...link} />
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold border-b-2 border-[#17e2fe] pb-1.5 text-right text-gray-800 mb-4">
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5">
              {quickAccessLinks.map((link) => (
                <FooterLink key={link.name} {...link} />
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold border-b-2 border-[#17e2fe] pb-1.5 text-right text-gray-800 mb-4">
              اطلاعات تماس
            </h4>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2 justify-end">
                <span className="font-semibold">
                  ساعات پاسخگویی: ۹:۰۰ الی ۱۸:۰۰
                </span>
                <ClockIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
              </div>

              <div className="flex items-start gap-2 justify-end">
                <span>۰۲۱-۹۱۰۰۸۴۱۳</span>
                <SolidPhoneIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
              </div>

              <div className="flex items-start gap-2 justify-end">
                <span>
                  تهران، میدان ولی‌عصر، خیابان طالقانی، پلاک ۹
                </span>
                <SolidMapPinIcon className="w-4 h-4 text-[#17e2fe] shrink-0" />
              </div>
            </div>
          </div>

          {/* Licenses */}
          <div>
            <h4 className="text-sm sm:text-base font-semibold border-b-2 border-[#17e2fe] pb-1.5 text-right text-gray-800 mb-4">
              مجوزها
            </h4>

            <div className="flex flex-wrap gap-4 justify-end">
              <div className="w-20 h-24 bg-gray-50 border rounded-lg flex items-center justify-center text-xs text-gray-400">
                نماد اعتماد
              </div>
              <div className="w-20 h-24 bg-gray-50 border rounded-lg flex items-center justify-center text-xs text-gray-400">
                ساماندهی
              </div>
              <div className="w-20 h-24 bg-gray-50 border rounded-lg flex items-center justify-center text-xs text-gray-400">
                زرین‌پال
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 py-3 sm:py-4 text-center px-4">
        <p className="text-xs sm:text-sm text-gray-500">
          تمامی مطالب متعلق به سایت استوک سرور می‌باشد.
        </p>
      </div>
    </footer>
  );
}
