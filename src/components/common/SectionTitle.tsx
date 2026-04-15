interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-1">
      <h2 className="font-heading text-xl font-semibold text-[var(--color-primary-green)]">
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-[var(--color-muted)]">{subtitle}</p> : null}
    </div>
  );
}
