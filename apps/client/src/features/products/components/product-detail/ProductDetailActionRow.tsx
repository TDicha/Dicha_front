import { ChevronRight } from "lucide-react";

interface ProductDetailActionRowProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export function ProductDetailActionRow({
  label,
  value,
  onClick,
}: ProductDetailActionRowProps) {
  return (
    <button
      className="flex w-full items-center justify-between py-4 text-left"
      onClick={onClick}
      type="button"
    >
      <span className="text-[0.92rem] font-medium text-[var(--text-cafe-ink)]">
        {label}
      </span>
      <span className="flex items-center gap-3">
        <span className="text-[0.88rem] font-semibold text-[var(--text-cafe-ink)]">
          {value}
        </span>
        <ChevronRight className="size-4 text-[var(--text-cafe-ink)]" />
      </span>
    </button>
  );
}
