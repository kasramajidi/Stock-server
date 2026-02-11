import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogData";

type Category = {
  key: string | null;
  label: string;
};

type BlogSidebarProps = {
  categories: Category[];
  posts: BlogPost[];
};

const getCategoryPostCount = (posts: BlogPost[], key: string | null) =>
  posts.filter((p) => p.category === key).length;

export function BlogSidebar({ categories, posts }: BlogSidebarProps) {
  return (
    <aside className="w-full space-y-4 lg:w-[280px] xl:w-[300px]">
      {/* باکس خلاصه دسته‌بندی‌ها */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">
          مرور سریع دسته‌بندی‌ها
        </h3>
        <p className="mb-3 text-[11px] text-gray-500">
          ببینید در هر دسته، چه موضوعاتی پوشش داده شده است.
        </p>
        <ul className="space-y-1.5 text-[11px] text-gray-700">
          {categories
            .filter((c) => c.key !== null)
            .map((cat) => (
              <li
                key={cat.label}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-2.5 py-1.5"
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-gray-500">
                  {getCategoryPostCount(posts, cat.key)} مطلب
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* باکس مطالب پیشنهادی */}
      <div className="rounded-2xl bg-[#050f1b] border border-[#163049] p-4 text-[11px] text-[#d7e9ff]">
        <h3 className="mb-2 text-sm font-semibold text-white">
          از این سه مطلب شروع کنید
        </h3>
        <p className="mb-3 text-[11px] text-[#9ab1c7]">
          اگر تازه می‌خواهید زیرساخت‌تان را استاندارد کنید، این سه مقاله نقطه
          شروع خوبی هستند.
        </p>
        <ul className="space-y-2">
          {posts.slice(0, 3).map((post) => (
            <li key={post.id} className="flex flex-col gap-0.5">
              <Link
                href={`/blog/${post.slug}`}
                className="text-right text-[11px] text-[#e8f3ff] hover:text-[#17e2fe]"
              >
                {post.title}
              </Link>
              <span className="text-[10px] text-[#8ba0b5]">
                {post.readTime} · {post.category}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* بنر کوچک انتهایی سایدبار */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="relative h-28 w-full">
          <Image
            src="/Images/Baner/Layer 5.png"
            alt="استوک سرور - مشاوره انتخاب سرور"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/10 to-transparent" />
          <div className="absolute right-3 top-3 space-y-1 text-[11px] text-white">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
              مشاوره انتخاب سرور
            </span>
            <p className="text-[10px] leading-5">
              اگر بین چند کانفیگ مردد هستید، مقالات این بخش کمک‌تان می‌کند
              انتخاب مطمئن‌تری داشته باشید.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

