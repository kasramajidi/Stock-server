import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";

const contactItems = [
  { icon: HiPhone, title: "شماره‌های تماس", lines: ["۰۹۱۲-۱۲۳۴۵۶۷", "۰۹۱۲-۹۸۷۶۵۴۳"] },
  { icon: HiMail, title: "آدرس ایمیل", lines: ["info@stock-server.ir", "support@stock-server.ir"] },
  { icon: HiLocationMarker, title: "نشانی", lines: ["تهران، خیابان ولیعصر", "کوچه فلان، پلاک X"] },
];

export default function ContactIntro() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <div className="absolute left-0 top-0 h-full w-1 bg-[var(--primary-hover)]" />
      <div className="p-6 sm:p-8 md:p-10">
        <SectionHeader
          title="تماس با ما"
          subtitle="ما اینجاییم تا شبانه‌روزی پاسخگوی شما باشیم"
        />
        <p className="text-center text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          برای سفارش، استعلام یا هرگونه سؤال با ما در ارتباط باشید.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl border border-border bg-muted/30 p-5 sm:p-6 text-center transition-all hover:border-[var(--primary-hover)]/50 hover:shadow-md hover:bg-muted/50"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-hover)]/10 text-[var(--primary-hover)] mb-4 transition-colors group-hover:bg-[var(--primary-hover)] group-hover:text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <div className="space-y-1 text-[13px] text-muted-foreground">
                  {item.lines.map((line, j) => (
                    <p key={j} className="break-all">{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
