import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blogData";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "دمطلب یافت نشد" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto w-[92%] max-w-5xl">
        <nav
          className="flex items-center gap-2 py-4 text-xs text-gray-400"
          aria-label="مسیر"
        >
          <Link href="/" className="hover:text-[#17e2fe] transition-colors">
          i  خانه
          </Link>
          <span aria-hidden>/</span>
          <Link href="/blog" className="hover:text-[#17e2fe] transition-colors">
            وبلاگ
          </Link>
          <span aria-hidden>/</span>
          <span className="text-gray-600 truncate max-w-[180px] sm:max-w-none" title={post.title}>
            {post.title}
          </span>
        </nav>
      </div>

      {/* Hero */}
      <header className="relative mx-auto w-[92%] max-w-5xl overflow-hidden rounded-3xl border border-[#152636] bg-gradient-to-l from-[#0b1b26] via-[#071017] to-[#04141c] shadow-xl">
        <div className="relative h-[280px] sm:h-[340px] md:h-[400px]">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover opacity-50"
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 md:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#17e2fe]/20 border border-[#17e2fe]/40 px-3 py-1 text-[11px] font-medium text-[#8fe3ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
              {post.category}
            </span>
            <h1 className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl lg:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-white/80">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">زمان مطالعه:</span>
                {post.readTime}
              </span>
              <span>{post.comments} دیدگاه</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 w-[92%] max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-8 sm:py-5">
                <p className="text-sm leading-8 text-gray-700 sm:text-base">
                  {post.summary}
                </p>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none p-5 sm:p-8">
                <div className="rounded-2xl border border-[#17e2fe]/20 bg-[#17e2fe]/5 p-5 sm:p-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-800">
                    خلاصه مطلب
                  </h3>
                  <p className="text-sm leading-7 text-gray-600">
                    در این مقاله به مباحثی مانند تعاریف فنی، مقایسه با راه‌حل‌های
                    جایگزین و پیشنهادهای عملی برای پیاده‌سازی در محیط سرور و
                    استوریج پرداخته شده است. مطالعه این مطلب برای مدیران شبکه،
                    ادمین سرور و تیم‌های فنی توصیه می‌شود.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-gray-50 p-5 sm:p-6 text-[13px] text-gray-500">
                  <p>
                    محتوای کامل این مطلب به زودی منتشر می‌شود. در همین دسته‌بندی
                    می‌توانید مطالب مشابه را بخوانید.
                  </p>
                </div>
              </div>
            </div>

            {/* Share & CTA */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>اشتراک‌گذاری:</span>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-[#17e2fe]/10 hover:text-[#17e2fe] transition-colors"
                  aria-label="اشتراک در تلگرام"
                >
                  📤
                </button>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-[#17e2fe]/10 hover:text-[#17e2fe] transition-colors"
                  aria-label="کپی لینک"
                >
                  🔗
                </button>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#17e2fe] bg-[#17e2fe]/10 px-5 py-2.5 text-sm font-semibold text-[#0b1e28] hover:bg-[#17e2fe]/20 transition-colors"
              >
                بازگشت به لیست وبلاگ
                <span aria-hidden>‹</span>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full space-y-6 lg:w-[280px] lg:shrink-0">
            <div className="rounded-2xl border border-[#163049] bg-[#050f1b] p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">
                این مطلب برای چه کسانی است؟
              </h3>
              <ul className="space-y-2 text-[12px] text-[#c5d6e6]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
                  مدیران شبکه و سرور
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
                  تیم‌های فنی و DevOps
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
                  خریداران سرور و استوریج
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                دسته‌بندی
              </h3>
              <p className="rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-700">
                {post.category}
              </p>
              <Link
                href="/blog"
                className="mt-3 block text-xs text-[#17e2fe] hover:underline"
              >
                همه مطالب این دسته
              </Link>
            </div>
          </aside>
        </div>

        {/* Related - Slider style */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                مطالب مرتبط
              </h2>
              <Link
                href="/blog"
                className="text-xs text-[#17e2fe] hover:underline"
              >
                مشاهده همه
              </Link>
            </div>
            <div
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="flex shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md w-[260px] sm:w-[280px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white">
                      {p.readTime}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800">
                      {p.title}
                    </p>
                    <span className="mt-2 block text-[11px] text-gray-500">
                      {p.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
