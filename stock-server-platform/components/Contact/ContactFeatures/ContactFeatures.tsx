import { HiCube, HiUser, HiTruck, HiShoppingCart } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";

const features = [
  { icon: HiShoppingCart, title: "قیمت مناسب", desc: "خرید به صرفه و اقتصادی" },
  { icon: HiTruck, title: "ارسال آسان", desc: "ارسال سریع به سراسر کشور" },
  { icon: HiUser, title: "ایجاد حساب", desc: "حساب کاربری اختصاصی" },
  { icon: HiCube, title: "محصولات اصل", desc: "تنوع، کیفیت و گارانتی" },
];

export default function ContactFeatures() {
  return (
    <section>
      <SectionHeader
        title="چرا استوک سرور؟"
        subtitle="قیمت مناسب، ارسال سریع، محصولات اصل"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-[var(--primary-hover)]/40"
            >
              <div className="h-1 w-full bg-[var(--primary-hover)] transition-all group-hover:h-1.5" />
              <div className="p-5 sm:p-6 flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-hover)]/10 text-[var(--primary-hover)] transition-colors group-hover:bg-[var(--primary-hover)] group-hover:text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
