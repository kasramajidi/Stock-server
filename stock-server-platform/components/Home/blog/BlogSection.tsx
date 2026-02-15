import Link from "next/link";
import BlogSlider from "./BlogSlider";

export default function BlogSection() {
  return (
    <section className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-800 border-b-2 border-[#00DDFF] pb-1">
          آخرین مطالب
        </h2>

        <Link
          href="/blog"
          className="text-sm text-[#00DDFF] hover:underline flex items-center gap-1"
        >
          مشاهده همه
          <span>›</span>
        </Link>
      </div>

      {/* Slider - فضای کناری برای دکمه‌های چپ/راست */}
      <div className="relative px-0 sm:px-12 md:px-16 lg:px-20">
        <BlogSlider />
      </div>
    </section>
  );
}
