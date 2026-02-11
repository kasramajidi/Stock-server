"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "مونا لطفی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 5,
    text: "نقد درآمد پی‌پال و پرداخت ارزی را از ريتكس انجام دادم. سریع و بدون دردسر بود. پشتیبانی هم همیشه پاسخگو.",
  },
  {
    id: 2,
    name: "سمانه محمودی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 5,
    text: "پرداخت هزینه ویزا و سفارت را از اینجا انجام دادم. نرخ مناسب و تحویل به موقع. توصیه می‌کنم.",
  },
  {
    id: 3,
    name: "سارا احمدی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 5,
    text: "برای ثبت نام آزمون بین‌المللی و خرید بلیت هواپیما از ريتكس استفاده کردم. راضی هستم.",
  },
  {
    id: 4,
    name: "فاطمه رضایی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 4,
    text: "خدمات ارزی و پرداخت با مسترکارت را با اطمینان از این سایت انجام می‌دهم. امن و سریع.",
  },
  {
    id: 5,
    name: "زهرا کریمی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 5,
    text: "بهترین نرخ برای نقد کردن درآمد ارزی. پشتیبانی ۲۴ ساعته واقعاً کمک‌کننده است.",
  },
  {
    id: 6,
    name: "مریم حسینی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 4,
    text: "کارت اعتباری و پرداخت ارزی را از ريتكس گرفتم. فرایند ساده و شفاف بود.",
  },
  {
    id: 7,
    name: "نرگس محمدی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 5,
    text: "سال‌هاست برای پرداخت‌های بین‌المللی از RAITX استفاده می‌کنم. همیشه راضی بوده‌ام.",
  },
  {
    id: 8,
    name: "لیلا رستمی",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    rating: 4,
    text: "پرداخت هتل و بلیت هواپیما را از اینجا انجام دادم. توصیه می‌کنم برای سفر و خدمات ارزی.",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          containScroll: "trimSnaps",
          direction: "rtl",
        }}
        className="w-full"
        dir="rtl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-center text-center">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-center" style={{ color: '#1a3760' }}>
              نظرات مشتریان ما
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 text-center" style={{ color: '#ff5538' }}>
              مشتریان درباره ما چه می گویند؟
            </h3>
            <p className="text-center text-gray-600 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 md:leading-7 mb-4 sm:mb-6">
              مشتریان ريتكس از سرعت، امنیت و پشتیبانی خدمات ارزی و پرداخت ارزی ما راضی هستند.
            </p>
            <div className="flex items-center justify-center gap-2 mt-auto">
              <CarouselNext className="relative right-0 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 bg-[#ff5538] text-white border-none hover:bg-[#ff5538]/90 rounded-full" />
              <CarouselPrevious className="relative right-0 top-0 translate-y-0 h-8 w-8 sm:h-10 sm:w-10 bg-[#ff5538] text-white border-none hover:bg-[#ff5538]/90 rounded-full" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <CarouselContent className="ml-0" dir="rtl">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-0 basis-full md:basis-1/2 pr-2 md:pr-3 shrink-0">
                  <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex flex-col items-center">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 sm:mb-3">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover object-center"
                          quality={90}
                          sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
                        />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 text-center w-full">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center justify-center gap-0.5 mb-2 sm:mb-3 w-full">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-3 h-3 sm:w-4 sm:h-4">
                            <svg
                              viewBox="0 0 24 24"
                              fill={star <= testimonial.rating ? "currentColor" : "none"}
                              stroke={star > testimonial.rating ? "currentColor" : "none"}
                              strokeWidth="2"
                              className={star <= testimonial.rating ? "text-[#ff5538]" : "text-gray-300"}
                            >
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center leading-5 sm:leading-6">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

