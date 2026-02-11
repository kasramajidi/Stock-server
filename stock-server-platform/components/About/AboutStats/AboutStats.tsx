const stats = [
  { value: "۵,۰۰۰", label: "مشتری راضی" },
  { value: "۲,۰۰۰", label: "پروژه موفق" },
  { value: "۲۰", label: "سال تجربه" },
];

export default function AboutStats() {
  return (
    <section className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {stats.map((item, i) => (
        <div key={i} className="flex-1 flex items-center gap-3 sm:gap-4 md:gap-5 bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 md:p-5 hover:border-[#17e2fe]/40 hover:shadow-md transition-all group">
          <div className="w-1 sm:w-1.5 h-10 sm:h-12 md:h-14 rounded-full bg-[#17e2fe] group-hover:bg-[#14c8e0] transition-colors shrink-0" />
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 tabular-nums">{item.value}</p>
            <p className="text-[10px] min-[400px]:text-xs sm:text-sm md:text-base text-gray-500 mt-0.5">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
