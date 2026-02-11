import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";

const contactItems = [
  { icon: HiPhone, title: "شماره‌های تماس", lines: ["۰۹۱۲-۱۲۳۴۵۶۷", "۰۹۱۲-۹۸۷۶۵۴۳"] },
  { icon: HiMail, title: "آدرس ایمیل", lines: ["info@stock-server.ir", "support@stock-server.ir"] },
  { icon: HiLocationMarker, title: "نشانی", lines: ["تهران، خیابان ولیعصر", "کوچه فلان، پلاک X"] },
];

export default function ContactIntro() {
  return (
    <section>
      <SectionHeader title="تماس با ما" subtitle="ما اینجاییم تا شبانه‌روزی پاسخگوی شما باشیم" />
      <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ. برای سفارش، استعلام یا هرگونه سؤال با ما در ارتباط باشید.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
        {contactItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-center text-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 hover:border-[#17e2fe]/40 hover:shadow-md transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#17e2fe] group-hover:bg-[#14c8e0] flex items-center justify-center mb-2 sm:mb-3 transition-colors shrink-0">
                <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-1.5 sm:mb-2">{item.title}</h3>
              <div className="space-y-0.5 text-gray-600 text-[10px] min-[400px]:text-xs sm:text-sm">
                {item.lines.map((line, j) => (
                  <p key={j} className="break-all">{line}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
