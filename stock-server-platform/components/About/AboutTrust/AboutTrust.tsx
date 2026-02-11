export default function AboutTrust() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-lg">
      <div className="absolute left-0 top-0 h-full w-1 bg-[var(--primary-hover)]" />
      <div className="pr-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2 text-center sm:text-right">
          هر آنچه داریم از اعتماد شماست
        </h2>
        <div className="w-14 h-0.5 rounded-full bg-[var(--primary-hover)] mb-6 mx-auto sm:ms-0 sm:me-auto" />
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center sm:text-right max-w-3xl mx-auto sm:ms-0 sm:me-auto">
          کیفیت، شفافیت و پشتیبانی پس از فروش سه اصل ماست. با هر خریدی، تیم فنی برای راه‌اندازی و نگه‌داری در کنار شماست.
        </p>
      </div>
    </section>
  );
}
