interface InfoListRowProps {
  label: string;
  value: string;
}

export function InfoListRow({ label, value }: InfoListRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-line)] py-3 text-sm">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className="font-medium text-[var(--color-primary-green)]">{value}</span>
    </div>
  );
}
