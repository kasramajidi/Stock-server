import Image from "next/image";
import Link from "next/link";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import { HiArrowLeft } from "react-icons/hi";

interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  slug: string;
}

interface LatestArticlesSectionProps {
  articles: Article[];
}

export default function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  return (
    <>
      <section className="flex flex-col items-center justify-center mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span className="text-[10px] sm:text-xs text-orange-600 font-medium">مقالات</span>
          </div>
        </div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6 md:mb-8" style={{ color: '#1a3760' }}>
          آخرین اخبار سایت
        </h2>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col sm:flex-row hover:cursor-pointer transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 h-full bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-gray-100"
          >
            <div className="w-full sm:w-[36%] md:w-[38%] relative h-[180px] xs:h-[200px] sm:h-[160px] md:h-[180px] lg:h-[200px] shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none object-cover object-center"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 36vw"
                unoptimized={shouldUnoptimizeImage(article.image)}
              />
            </div>
            <div className="w-full sm:w-[64%] md:w-[62%] p-3 sm:p-3.5 md:p-4 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-gray-600 mb-1.5 sm:mb-2">{article.date}</p>
                <span className="text-xs xs:text-sm sm:text-base md:text-[15px] lg:text-base my-1.5 sm:my-2 md:my-3 block line-clamp-2 hover:text-[#ff5538] transition-colors font-medium" style={{ color: '#1a3760' }}>
                  {article.title}
                </span>
                <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-gray-500 leading-4 sm:leading-5 md:leading-6 line-clamp-2 sm:line-clamp-3 text-right mt-1.5 sm:mt-2">
                  {article.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 mt-2 sm:mt-3 md:mt-4 text-[10px] xs:text-[11px] sm:text-xs text-[#ff5538] hover:gap-2 transition-all font-medium">
                <span>مشاهده بیشتر</span>
                <HiArrowLeft className="text-[10px] xs:text-xs rotate-180" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

