"use client";

import Image from "next/image";
import { useState } from "react";

const HERO_IMAGE_SRC = "https://res.cloudinary.com/dkvbdk078/image/upload/v1770205224/ChatGPT_Image_Jan_24_2026_04_07_27_PM_a8mjdh.png";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Fallback: پس‌زمینه تیره تا روی هاست اگر تصویر لود نشد متن خوانا بماند */}
        <div className="absolute inset-0 bg-gray-700" aria-hidden />
        {!imageError && (
          <Image
            src={HERO_IMAGE_SRC}
            alt="نقد کردن درآمدهای ارزی - ريتكس"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5))",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center lg:text-right space-y-4 text-white w-full max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            نقد کردن درآمدهای ارزی
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            با RAITX، درآمدهای ارزی خود را به راحتی و با بهترین نرخ
            تبدیل کنید. ما با سال‌ها تجربه در زمینه پرداخت‌های بین‌المللی،
            خدمات متنوعی از جمله نقد کردن پی‌پال، پرداخت هزینه‌های سفارت، خرید
            بلیت هواپیما و هتل، و ثبت نام آزمون‌های بین‌المللی را ارائه
            می‌دهیم. امنیت و سرعت در انجام تراکنش‌ها، اولویت اصلی ماست.
          </p>
        </div>
      </div>
    </section>
  );
}
