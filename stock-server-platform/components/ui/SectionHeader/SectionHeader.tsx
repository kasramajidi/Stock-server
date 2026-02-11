interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-6 sm:mb-8 md:mb-10">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{title}</h2>
      {subtitle && <p className="text-xs sm:text-sm md:text-base text-gray-500">{subtitle}</p>}
      <div className="w-12 sm:w-14 h-0.5 sm:h-1 bg-[#17e2fe] rounded-full mx-auto mt-3 sm:mt-4" />
    </div>
  );
}
