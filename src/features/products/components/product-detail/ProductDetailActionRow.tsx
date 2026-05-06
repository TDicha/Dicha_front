import { ChevronRight } from "lucide-react";

interface ProductDetailActionRowProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export function ProductDetailActionRow({ label, value, onClick }: ProductDetailActionRowProps) {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-[var(--line-color)] py-4 text-left last:border-b-0"
      onClick={onClick}
      type="button"
    >
      <span className="text-[0.95rem] font-medium text-[var(--palette-121212)]">{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-[0.92rem] font-semibold text-[var(--primary-color)]">{value}</span>
        <ChevronRight className="size-4 text-[var(--palette-7a746d)]" />
      </span>
    </button>
  );
}
