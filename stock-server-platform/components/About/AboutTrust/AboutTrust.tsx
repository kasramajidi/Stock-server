import {
  ShieldCheckIcon,
  EyeIcon,
  LifebuoyIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    title: "کیفیت",
    description: "فقط محصولات با کیفیت و دارای گارانتی معتبر؛ تست و کنترل قبل از تحویل.",
    icon: ShieldCheckIcon,
  },
  {
    title: "شفافیت",
    description: "قیمت‌گذاری شفاف، مشخصات دقیق و بدون هزینهٔ پنهان در هر مرحله از خرید.",
    icon: EyeIcon,
  },
  {
    title: "پشتیبانی",
    description: "تیم فنی برای راه‌اندازی، نگه‌داری و پاسخگویی به سوالات شما در کنارتان است.",
    icon: LifebuoyIcon,
  },
  {
    title: "اعتماد",
    description: "اعتماد شما سرمایهٔ ماست؛ با هر خریدی تلاش می‌کنیم این اعتماد حفظ و تقویت شود.",
    icon: HandRaisedIcon,
  },
];

export default function AboutTrust() {
  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          ارزش‌های ما
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          هر آنچه داریم از اعتماد شماست؛ کیفیت، شفافیت و پشتیبانی سه اصل کار ماست.
        </p>
        <div className="w-16 h-1 rounded-full bg-[#17e2fe] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {values.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group relative rounded-xl border border-slate-100 bg-slate-50/50 p-5 sm:p-6 transition-all hover:bg-white hover:shadow-md hover:border-[#17e2fe]/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#17e2fe]/10 flex items-center justify-center mb-4 group-hover:bg-[#17e2fe]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#0e7490]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
