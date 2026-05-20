interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-1">
      <h2 className="font-heading text-xl font-semibold text-[var(--brand-primary)]">
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-[var(--text-muted)]">{subtitle}</p> : null}
    </div>
  );
}
