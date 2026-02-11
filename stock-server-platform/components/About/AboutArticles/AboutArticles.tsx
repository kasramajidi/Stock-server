import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";

const articles = [
  { id: 1, title: "نکات مهم در خرید سرور و تجهیزات شبکه", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 2, title: "تفاوت رم سرور با رم معمولی", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 3, title: "راهنمای انتخاب هارد سرور", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
  { id: 4, title: "پاور سرور و نکات ایمنی", description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.", date: "۱۷ مهر ۱۴۰۲", image: "/Images/PromotionalBanners/Baner.png" },
];

export default function AboutArticles() {
  return (
    <section>
      <SectionHeader title="آخرین مقالات" subtitle="سرور و تجهیزات شبکه" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {articles.map((article) => (
          <Link key={article.id} href="/blog" className="group block bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#17e2fe]/30 transition-all">
            <div className="relative w-full aspect-4/3 overflow-hidden">
              <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" quality={85} sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              <span className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 text-[9px] min-[400px]:text-[10px] sm:text-xs text-white/90 bg-black/50 px-1.5 sm:px-2 py-0.5 rounded">{article.date}</span>
            </div>
            <div className="p-2.5 sm:p-3 md:p-4">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-1 sm:mb-1.5 line-clamp-2 text-right group-hover:text-[#17e2fe] transition-colors">{article.title}</h3>
              <p className="text-[10px] min-[400px]:text-xs sm:text-sm text-gray-500 line-clamp-2 text-right mb-2 sm:mb-3">{article.description}</p>
              <span className="inline-flex items-center gap-1 text-[10px] min-[400px]:text-xs sm:text-sm font-medium text-[#17e2fe]">
                ادامه مطلب
                <HiArrowRight className="text-xs sm:text-sm" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
