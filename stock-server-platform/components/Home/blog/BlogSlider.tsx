"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";
  
const blogs = [
  "بررسی مفهوم Hot‑Swap و Hot‑Plug در سرور و استوریج",
  "NVMe در سرورها چیست و چه تفاوتی با SSD معمولی دارد؟",
  "دلایل کند شدن سرور اچ پی",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
  "برای شرکت‌ها نفره چه سرور HP مناسب است",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
  "معرفی انواع سرور HP ProLiant و کاربرد آن‌ها",
  "رید کنترلر سرور چیست و چه نقشی دارد؟",
  "مقایسه هارد SAS و SATA برای سرور",
  "نحوه ارتقای رم سرور HP",
  "پاور سرور و نکات مهم در انتخاب آن",
  "خنک‌کاری سرور و اهمیت آن در دیتاسنتر",
];

export default function BlogSlider() {
  return (
    <Carousel
      opts={{ align: "start", loop: false, containScroll: "trimSnaps" }}
      className="w-full"
    >
      <CarouselContent className="-ms-4">
        {blogs.map((title, index) => (
          <CarouselItem
            key={index}
            className="ps-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
          >
            <div className="flex justify-center w-full">
              <BlogCard title={title} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="right-auto left-0 sm:-left-12 md:-left-16 lg:-left-20 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
      <CarouselNext className="right-0 sm:-right-12 md:-right-16 lg:-right-20 border-gray-200 bg-white hover:bg-[#00DDFF] hover:text-white hover:border-[#00DDFF]" />
    </Carousel>
  );
}
