import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

const articles = [
  {
    id: 1,
    title: "نکات مهم در خرید سرور و تجهیزات شبکه",
    description: "راهنمای عملی برای انتخاب سرور و قطعات مناسب.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/PromotionalBanners/Baner.png",
  },
  {
    id: 2,
    title: "تفاوت رم سرور با رم معمولی",
    description: "چرا رم سرور برای دیتاسنتر و سرورها ضروری است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/PromotionalBanners/Baner.png",
  },
  {
    id: 3,
    title: "راهنمای انتخاب هارد سرور",
    description: "SSD، NVMe و HDD؛ کدام برای کار شما مناسب‌تر است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/PromotionalBanners/Baner.png",
  },
  {
    id: 4,
    title: "پاور سرور و نکات ایمنی",
    description: "انتخاب پاور با رنج مناسب و رعایت ایمنی.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/PromotionalBanners/Baner.png",
  },
];

export default function AboutArticles() {
  return (
    <section aria-labelledby="articles-heading">
      <div className="text-center mb-10 sm:mb-12">
        <h2 id="articles-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          آخرین مقالات
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          راهنماها و مطالب مفید دربارهٔ سرور و تجهیزات شبکه.
        </p>
        <div className="w-16 h-1 rounded-full bg-[#17e2fe] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href="/blog"
            className="group block rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#17e2fe]/30"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] text-white/95 backdrop-blur-sm">
                {article.date}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-1.5 line-clamp-2 text-right group-hover:text-[#0e7490] transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 text-right mb-3">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e7490]">
                ادامه مطلب
                <HiArrowLeft className="text-sm rotate-180" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
