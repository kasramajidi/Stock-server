import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import StarRating from "@/components/ui/StarRating/StarRating";

const testimonials = [
  { id: 1, name: "مونا لطفی", rating: 5, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله است." },
  { id: 2, name: "سمانه محمودی", rating: 3, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله است." },
  { id: 3, name: "سارا احمدی", rating: 5, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله است." },
  { id: 4, name: "فاطمه رضایی", rating: 4, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله است." },
  { id: 5, name: "زهرا کریمی", rating: 5, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله است." },
  { id: 6, name: "مریم حسینی", rating: 4, text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله است." },
];

export default function AboutTestimonials() {
  return (
    <section>
      <SectionHeader title="نظرات مشتریان" subtitle="مشتریان درباره ما چه می‌گویند؟" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {testimonials.map((t) => (
          <div key={t.id} className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow pr-4 sm:pr-5 pl-3 sm:pl-4 py-3 sm:py-4 md:py-5">
            <div className="absolute top-0 right-0 w-1 sm:w-1.5 h-full bg-[#17e2fe]" />
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#17e2fe]/30 leading-none mb-1.5 sm:mb-2 text-right">&ldquo;</p>
            <p className="text-gray-600 text-[11px] min-[400px]:text-xs sm:text-sm md:text-base leading-relaxed text-right mb-3 sm:mb-4">{t.text}</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800">{t.name}</span>
              <StarRating rating={t.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
