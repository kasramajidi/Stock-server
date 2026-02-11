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
      <SectionHeader title="چرا استوک سرور؟" subtitle="قیمت مناسب، ارسال سریع، محصولات اصل" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-[#17e2fe]/30 transition-all group flex flex-col items-center justify-center text-center">
              <div className="h-1 sm:h-1.5 w-full bg-[#17e2fe] group-hover:bg-[#14c8e0] transition-colors" />
              <div className="p-3 sm:p-4 md:p-5 flex flex-col items-center text-center w-full">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#17e2fe]/20 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-[#17e2fe]/30 transition-colors">
                  <Icon className="text-[#17e2fe] w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-[10px] min-[400px]:text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
