import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
      <div className="relative h-[240px] min-[400px]:h-[280px] sm:h-[320px] md:h-[380px]">
        <Image
          src="/Images/Baner/Layer 5.png"
          alt="درباره استوک سرور"
          fill
          className="object-cover object-center"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm">
            شرکت ماهان شبکه ایرانیان
          </span>
          <h1 className="mt-4 text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold tracking-tight text-white drop-shadow-lg">
            درباره استوک سرور
          </h1>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">
            فروش سرور استوک HP و HPE، قطعات سرور و تجهیزات شبکه با گارانتی و پشتیبانی فنی
          </p>
        </div>
      </div>

      <div className="relative -mt-8 sm:-mt-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-lg">
        <div className="max-w-3xl mx-auto text-center sm:text-right">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            <strong className="text-slate-800">استوک سرور</strong> با سال‌ها تجربه در حوزهٔ سرور و تجهیزات شبکه،
            ارائه‌دهندهٔ سرور استوک HP و HPE، رم، هارد، CPU، پاور و سایر قطعات با گارانتی معتبر است.
            تیم پشتیبانی و مشاورهٔ فنی ما آمادهٔ پاسخگویی و همراهی شما در انتخاب و راه‌اندازی تجهیزات است.
          </p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#0e7490] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0c5f73] hover:shadow-lg"
            >
              تماس با ما
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-[#17e2fe] hover:text-[#0e7490]"
            >
              مشاهده فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
