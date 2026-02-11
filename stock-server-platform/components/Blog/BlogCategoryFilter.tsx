type BlogCategory = {
  key: string | null;
  label: string;
};

type BlogCategoryFilterProps = {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onChange: (key: string | null) => void;
};

export function BlogCategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: BlogCategoryFilterProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white/95 shadow-sm border border-gray-200">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">
            فیلتر مطالب بر اساس موضوع
          </h2>
          <p className="mt-1 text-[11px] text-gray-500">
            دسته‌ای که بیشتر برای وضعیت فعلی زیرساخت‌تان مناسب است را انتخاب
            کنید.
          </p>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 sm:mt-0">
          <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="hidden sm:inline-block">
            پیشنهاد: از &quot;راهنمای خرید&quot; شروع کنید
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 px-3 py-2">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1 text-xs">
          {categories.map((cat) => {
            const isActive =
              selectedCategory === cat.key ||
              (cat.key === null && selectedCategory === null);
            return (
              <button
                key={cat.label}
                onClick={() => onChange(cat.key)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 transition text-[11px] sm:text-xs ${
                  isActive
                    ? "bg-[#17e2fe] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

