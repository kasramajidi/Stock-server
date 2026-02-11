const stats = [
  { value: "۵,۰۰۰+", label: "مشتری راضی" },
  { value: "۲,۰۰۰+", label: "پروژه موفق" },
  { value: "۲۰+", label: "سال تجربه" },
];

export default function AboutStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      {stats.map((item, i) => (
        <div
          key={i}
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-[var(--primary-hover)]/50 hover:shadow-md"
        >
          <div className="h-12 w-1 rounded-full bg-[var(--primary-hover)] shrink-0 transition-transform group-hover:h-14" />
          <div className="min-w-0">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-foreground">
              {item.value}
            </p>
            <p className="text-[13px] sm:text-sm text-muted-foreground mt-0.5">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
