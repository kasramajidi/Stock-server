const testimonials = [
  {
    id: 1,
    name: "مونا لطفی",
    text: "خرید سرور و پشتیبانی عالی. تیم فنی خیلی کمک‌کننده بودن و تا راه‌اندازی کامل همراه بودن.",
  },
  {
    id: 2,
    name: "سمانه محمودی",
    text: "قیمت‌ها مناسب و ارسال سریع بود. راضی هستم و برای خریدهای بعدی حتماً همینجا می‌آیم.",
  },
  {
    id: 3,
    name: "سارا احمدی",
    text: "کیفیت قطعات عالی و مشاوره قبل از خرید خیلی مفید بود. توصیه می‌کنم.",
  },
  {
    id: 4,
    name: "فاطمه رضایی",
    text: "تحویل به موقع و بسته‌بندی تمیز. پشتیبانی هم پاسخگو بود. پیشنهاد می‌کنم.",
  },
  {
    id: 5,
    name: "زهرا کریمی",
    text: "سال‌هاست از استوک سرور خرید می‌کنم. همیشه راضی بودم و به دیگران هم معرفی کردم.",
  },
  {
    id: 6,
    name: "مریم حسینی",
    text: "پشتیبانی فنی خوب و پاسخگویی سریع به سوالات. خوشحالم که اینجا خریدم.",
  },
];

export default function AboutTestimonials() {
  return (
    <section aria-labelledby="testimonials-heading">
      <div className="text-center mb-10 sm:mb-12">
        <h2 id="testimonials-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          نظرات مشتریان
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          مشتریان ما دربارهٔ تجربهٔ خرید و پشتیبانی چه می‌گویند.
        </p>
        <div className="w-16 h-1 rounded-full bg-[#17e2fe] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((t) => (
          <blockquote
            key={t.id}
            className="relative rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="absolute top-4 right-4 text-4xl sm:text-5xl font-serif text-[#17e2fe]/20 leading-none select-none">
              &ldquo;
            </span>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-right pr-8 sm:pr-10">
              {t.text}
            </p>
            <footer className="mt-4 pt-4 border-t border-slate-100 text-right">
              <cite className="text-sm font-bold text-slate-800 not-italic">{t.name}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
