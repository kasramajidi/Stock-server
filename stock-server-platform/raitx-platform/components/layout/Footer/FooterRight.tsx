"use client";

import Image from "next/image";

export default function FooterRight() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-72 h-32 sm:w-80 sm:h-36 md:w-96 md:h-40 lg:w-[420px] lg:h-48">
        <Image
          src="/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png"
          alt="لوگو شرکت"
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 420px"
          quality={92}
        />
      </div>

      <div className="text-center space-y-1 hidden md:block">
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          ريتكس (RAITX) — خدمات ارزی و پرداخت ارزی
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          تلفن: <a href="tel:02191320700" className="hover:text-white">۰۲۱-۹۱۳۲۰۷۰۰</a> | ایمیل: <a href="mailto:support@mrpremiumhub.org" className="hover:text-white">support@mrpremiumhub.org</a>
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          آدرس: تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم
        </p>
      </div>
    </div>
  );
}

