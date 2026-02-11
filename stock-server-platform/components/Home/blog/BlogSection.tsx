import Link from "next/link";
import BlogSlider from "./BlogSlider";

export default function BlogSection() {
  return (
    <section className="bg-white mx-3 sm:mx-[30px] md:mx-[50px] my-10 rounded-xl shadow p-4 sm:p-6">

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

      {/* Slider */}
      <BlogSlider />
    </section>
  );
}
