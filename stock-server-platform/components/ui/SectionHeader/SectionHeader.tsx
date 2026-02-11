interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-4">
          {subtitle}
        </p>
      )}
      <div className="w-14 sm:w-16 h-0.5 rounded-full mx-auto bg-[var(--primary-hover)]" />
    </div>
  );
}
