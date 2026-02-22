import {
  UserGroupIcon,
  CubeIcon,
  ClockIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    value: "۵,۰۰۰+",
    label: "مشتری راضی",
    icon: UserGroupIcon,
  },
  {
    value: "۲,۰۰۰+",
    label: "پروژه موفق",
    icon: CubeIcon,
  },
  {
    value: "۲۰+",
    label: "سال تجربه",
    icon: ClockIcon,
  },
  {
    value: "۱۰۰٪",
    label: "ضمانت اصالت",
    icon: CheckBadgeIcon,
  },
];

export default function AboutStats() {
  return (
    <section aria-label="آمار و ارقام">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#17e2fe]/40"
            >
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#17e2fe]/10 flex items-center justify-center transition-colors group-hover:bg-[#17e2fe]/20">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0e7490]" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-slate-800 mt-2">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
