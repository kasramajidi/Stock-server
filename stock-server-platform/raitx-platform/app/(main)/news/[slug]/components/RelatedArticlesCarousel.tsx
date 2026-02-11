import Image from "next/image";
import Link from "next/link";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import { HiLocationMarker } from "react-icons/hi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArticleDetail } from "../../lib/articles-api";

interface RelatedArticlesCarouselProps {
  articles: ArticleDetail[];
}

export default function RelatedArticlesCarousel({ articles }: RelatedArticlesCarouselProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-md shadow-cyan-100 w-full border border-r-gray-200 p-4" dir="rtl">
      <h5 className="text-[13px] font-semibold mb-4">مقالات مرتبط</h5>
      <Carousel
        opts={{
          align: "start",
          loop: false,
          direction: "rtl",
        }}
        orientation="horizontal"
        className="w-full"
      >
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem key={article.id}>
              <Link
                href={`/news/${encodeURIComponent(article.slug)}`}
                className="block group"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="relative h-[130px] w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 22vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={shouldUnoptimizeImage(article.image)}
                    />
                  </div>
                  <div className="p-3">
                    <h6 className="text-xs font-semibold line-clamp-2 mb-2 group-hover:text-[#5E71FF] transition-colors leading-tight">
                      {article.title}
                    </h6>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <HiLocationMarker className="text-[10px]" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

