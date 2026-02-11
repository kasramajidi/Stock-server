import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogData";

type BlogListProps = {
  posts: BlogPost[];
  currentPage: number;
};

export function BlogList({ posts, currentPage }: BlogListProps) {
  return (
    <div className="flex-1 space-y-4">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition hover:-translate-y-[2px] hover:shadow-md"
        >
          <div className="flex flex-col md:flex-row">
            {/* تصویر */}
            <Link
              href={`/blog/${post.slug}`}
              className="relative h-40 w-full md:h-40 md:w-1/3 lg:w-1/4"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[10px] text-white">
                {post.readTime}
              </div>
              {index === 0 && currentPage === 0 && (
                <div className="absolute bottom-2 right-2 rounded-full bg-[#17e2fe] px-2 py-0.5 text-[10px] font-semibold text-[#041019]">
                  پیشنهاد ویژه
                </div>
              )}
            </Link>

            {/* متن و متا */}
            <div className="flex flex-1 flex-col justify-between p-4 md:p-4">
              <header className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5">
                    {post.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{post.comments} دیدگاه</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-sm sm:text-base font-semibold leading-7 text-gray-900 hover:text-[#17e2fe]"
                >
                  {post.title}
                </Link>
              </header>

              <p className="mt-2 text-[11px] sm:text-xs leading-7 text-gray-600">
                {post.summary}
              </p>

              <footer className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                <span>
                  مناسب برای{" "}
                  <span className="font-semibold text-gray-800">
                    مدیران شبکه، ادمین سرور و CTO
                  </span>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#17e2fe] px-3 py-1 text-[11px] text-[#0b1e28] bg-[#17e2fe]/5 hover:bg-[#17e2fe]/10"
                >
                  ادامه مطالعه
                  <span>›</span>
                </Link>
              </footer>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

