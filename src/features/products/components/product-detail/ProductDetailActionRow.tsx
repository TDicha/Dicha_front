import { ChevronRight } from "lucide-react";

interface ProductDetailActionRowProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export function ProductDetailActionRow({ label, value, onClick }: ProductDetailActionRowProps) {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-[var(--border-muted)] py-4 text-left last:border-b-0"
      onClick={onClick}
      type="button"
    >
      <span className="text-[0.95rem] font-medium text-[var(--text-title)]">{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-[0.92rem] font-semibold text-[var(--brand-primary)]">{value}</span>
        <ChevronRight className="size-4 text-[var(--icon-muted)]" />
      </span>
    </button>
  );
}
