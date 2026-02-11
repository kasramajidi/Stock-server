import Image from "next/image";
import type { BlogPost } from "@/lib/blogData";

type BlogHeroProps = {
  featured: BlogPost[];
};

export function BlogHero({ featured }: BlogHeroProps) {
  const [first, second] = featured;

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-l from-[#0b1b26] via-[#071017] to-[#04141c] border border-[#152636] shadow-sm">
      <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-8">
        {/* متن هدر */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#122433]/60 px-3 py-1 text-[11px] text-[#8fe3ff] border border-[#1f3a4d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
            وبلاگ تخصصی استوک سرور
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed text-white">
            راهنمای خرید، عیب‌یابی و بهینه‌سازی{" "}
            <span className="text-[#17e2fe]">سرور و تجهیزات شبکه</span>
          </h1>
          <p className="text-xs sm:text-sm leading-7 text-[#c4d4e0] max-w-2xl">
            در وبلاگ استوک سرور، مطالب کاملاً عملی برای انتخاب سرور، پیکربندی
            صحیح، مجازی‌سازی، بکاپ‌گیری و نگه‌داری زیرساخت‌تان پیدا می‌کنید؛
            بدون حرف‌های تئوری خسته‌کننده.
          </p>

          {/* سرچ و چک‌پویینت‌ها (فقط نمایشی) */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="جستجوی سریع بین مطالب (مثلاً: RAID, NVMe, مجازی‌سازی)"
                className="w-full rounded-2xl border border-[#1e3344] bg-[#050e16]/70 px-4 py-2.5 pr-10 text-xs sm:text-sm text-[#e6f2ff] placeholder:text-[#6b8597] focus:border-[#17e2fe] focus:outline-none focus:ring-1 focus:ring-[#17e2fe]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#6b8597]">
                🔍
              </span>
            </div>

            <div className="flex gap-2 text-[11px] sm:text-xs text-[#9bb1c3]">
              <span className="flex items-center gap-1 rounded-full bg-[#081520]/80 px-3 py-1.5 border border-[#1b3040]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                مقالات کاربردی
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-[#081520]/80 px-3 py-1.5 border border-[#1b3040] sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#17e2fe]" />
                مناسب مدیران شبکه و سیستم
              </span>
            </div>
          </div>
        </div>

        {/* کارت تصویر و آمار کلی وبلاگ */}
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-[#050d16]/70 p-3 sm:p-4 border border-[#17283a] lg:w-[320px]">
          <div className="relative h-32 w-full overflow-hidden rounded-xl sm:h-36">
            <Image
              src="/Images/Baner/Layer 5.png"
              alt="استوک سرور - راهنمای انتخاب و خرید سرور"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-2 right-3 space-y-1 text-xs text-white">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[10px]">
                به‌روزرسانی هفتگی
              </span>
              <p className="text-[11px] leading-5">
                بهترین مطالب برای انتخاب و نگه‌داری سرورهای HP
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-[#c8d8e5]">
            <div className="rounded-xl bg-[#071320]/90 px-2 py-2 border border-[#132437]">
              <div className="text-sm font-semibold text-[#17e2fe]">
                {featured.length}+
              </div>
              <div className="mt-0.5">مطلب ویژه</div>
            </div>
            <div className="rounded-xl bg-[#071320]/90 px-2 py-2 border border-[#132437]">
              <div className="text-sm font-semibold text-emerald-400">۴</div>
              <div className="mt-0.5">دسته‌بندی اصلی</div>
            </div>
            <div className="rounded-xl bg-[#071320]/90 px-2 py-2 border border-[#132437]">
              <div className="text-sm font-semibold text-orange-300">۱۰+</div>
              <div className="mt-0.5">ایده پیاده‌سازی</div>
            </div>
          </div>

          {first && second && (
            <div className="mt-1 space-y-1.5 rounded-xl bg-[#040b12]/70 p-2 text-[11px] text-[#c5d6e6] border border-[#182635]">
              <p className="text-[10px] text-[#7f97ad] mb-1">
                آخرین پیشنهادهای مطالعه:
              </p>
              <p className="line-clamp-1">• {first.title}</p>
              <p className="line-clamp-1">• {second.title}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

