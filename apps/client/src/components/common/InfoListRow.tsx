interface InfoListRowProps {
  label: string;
  value: string;
}

export function InfoListRow({ label, value }: InfoListRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border-default)] py-3 text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-medium text-[var(--brand-primary)]">{value}</span>
    </div>
  );
}
