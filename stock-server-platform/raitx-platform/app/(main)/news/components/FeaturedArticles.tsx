import Image from "next/image";
import Link from "next/link";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";

interface FeaturedArticle {
  id: number;
  title: string;
  category: string;
  comments: number;
  image: string;
  link: string;
  slug: string;
}

interface FeaturedArticlesProps {
  articles: FeaturedArticle[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6 w-full">
        {articles.slice(0, 2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="group flex flex-col items-center justify-end py-3 sm:py-4 md:py-5 sm:w-[calc((100%-0.75rem)/2)] w-full h-[140px] xs:h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-xl bg-gradient-to-br from-orange-300 to-orange-400 relative overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-300">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized={shouldUnoptimizeImage(article.image)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none rounded-xl" />
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-3 sm:px-4 md:px-5 pb-1">
              <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] xs:text-xs sm:text-sm mb-2 text-white/90">
                <span className="whitespace-nowrap">{article.category}</span>
                <span className="text-white/60">•</span>
                <span className="whitespace-nowrap">{article.comments} دیدگاه</span>
              </div>
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white text-center line-clamp-2 px-1 leading-snug drop-shadow-sm group-hover:text-white/95">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 md:gap-5">
        {articles.slice(2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="group flex flex-col items-center justify-end py-3 sm:py-4 md:py-5 sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-2rem)/3)] w-full h-[140px] xs:h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-xl bg-gradient-to-br from-orange-300 to-orange-400 relative overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-300">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized={shouldUnoptimizeImage(article.image)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none rounded-xl" />
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-3 sm:px-4 md:px-5 pb-1">
              <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] xs:text-xs sm:text-sm mb-2 text-white/90">
                <span className="whitespace-nowrap">{article.category}</span>
                <span className="text-white/60">•</span>
                <span className="whitespace-nowrap">{article.comments} دیدگاه</span>
              </div>
              <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white text-center line-clamp-2 px-1 leading-snug drop-shadow-sm group-hover:text-white/95">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

