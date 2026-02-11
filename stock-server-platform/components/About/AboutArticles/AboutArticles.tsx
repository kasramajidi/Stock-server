import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";

const articles = [
  { id: 1, title: "نکات مهم در خرید سرور و تجهیزات شبکه", description: "راهنمای عملی برای انتخاب سرور و قطعات مناسب.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 2, title: "تفاوت رم سرور با رم معمولی", description: "چرا رم سرور برای دیتاسنتر و سرورها ضروری است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 3, title: "راهنمای انتخاب هارد سرور", description: "SSD، NVMe و HDD؛ کدام برای کار شما مناسب‌تر است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 4, title: "پاور سرور و نکات ایمنی", description: "انتخاب پاور با رنج مناسب و رعایت ایمنی.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
];

export default function AboutArticles() {
  return (
    <section>
      <SectionHeader title="آخرین مقالات" subtitle="سرور و تجهیزات شبکه" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {articles.map((article) => (
          <Link
            key={article.id}
            href="/blog"
            className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-[var(--primary-hover)]/40 transition-all"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white/90">
                {article.date}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-foreground mb-1.5 line-clamp-2 text-right group-hover:text-[var(--primary-hover)] transition-colors">
                {article.title}
              </h3>
              <p className="text-[12px] text-muted-foreground line-clamp-2 text-right mb-3">{article.description}</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--primary-hover)]">
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
