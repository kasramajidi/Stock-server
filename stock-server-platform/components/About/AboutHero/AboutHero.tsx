import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
      <div className="relative h-[220px] min-[400px]:h-[260px] sm:h-[300px] md:h-[360px]">
        <Image
          src="/Images/Baner/Layer 5.png"
          alt="درباره استوک سرور"
          fill
          className="object-cover object-center"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
            فروش سرور و تجهیزات شبکه
          </span>
          <h1 className="mt-4 text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            همه‌چیز درباره استوک سرور
          </h1>
        </div>
      </div>
      <div className="relative -mt-6 mx-4 sm:mx-6 md:mx-8 rounded-xl border border-border bg-card p-5 sm:p-6 md:p-8 shadow-lg">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center sm:text-right max-w-3xl mx-auto sm:ms-auto sm:me-0 mb-6">
          استوک سرور سال‌هاست در حوزه فروش سرور و قطعات سرور فعالیت می‌کند. با تیم پشتیبانی و مشاوره فنی در خدمت شما هستیم.
        </p>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-hover)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-dark)]"
          >
            تماس با ما
          </Link>
          <span className="inline-flex items-center justify-center rounded-xl border-2 border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-[var(--primary-hover)] hover:text-[var(--primary-hover)]">
            ویدئو معرفی (به زودی)
          </span>
        </div>
      </div>
    </section>
  );
}
