import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import StarRating from "@/components/ui/StarRating/StarRating";

const testimonials = [
  { id: 1, name: "مونا لطفی", rating: 5, text: "خرید سرور و پشتیبانی عالی. تیم فنی خیلی کمک‌کننده بودن." },
  { id: 2, name: "سمانه محمودی", rating: 3, text: "قیمت‌ها مناسب و ارسال سریع بود. راضی هستم." },
  { id: 3, name: "سارا احمدی", rating: 5, text: "کیفیت قطعات عالی و مشاوره قبل از خرید خیلی مفید بود." },
  { id: 4, name: "فاطمه رضایی", rating: 4, text: "تحویل به موقع و بسته‌بندی تمیز. پیشنهاد می‌کنم." },
  { id: 5, name: "زهرا کریمی", rating: 5, text: "سال‌هاست از استوک سرور خرید می‌کنم. همیشه راضی بودم." },
  { id: 6, name: "مریم حسینی", rating: 4, text: "پشتیبانی فنی خوب و پاسخگویی سریع به سوالات." },
];

export default function AboutTestimonials() {
  return (
    <section>
      <SectionHeader title="نظرات مشتریان" subtitle="مشتریان درباره ما چه می‌گویند؟" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="relative rounded-xl border border-border bg-card p-5 sm:p-6 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="absolute right-0 top-0 h-full w-1 bg-[var(--primary-hover)]" />
            <p className="text-3xl sm:text-4xl font-serif text-[var(--primary-hover)]/20 leading-none mb-3 text-right">
              &ldquo;
            </p>
            <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed text-right mb-4">{t.text}</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-foreground">{t.name}</span>
              <StarRating rating={t.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
