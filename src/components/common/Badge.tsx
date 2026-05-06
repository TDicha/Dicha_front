import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/shared/types/models";

const badgeStyles: Record<ProductBadge, string> = {
  BEST: "bg-[var(--rgba-148-35-30-01)] text-[var(--color-primary-red)]",
  NEW: "bg-[var(--rgba-42-54-99-01)] text-[var(--color-primary-blue)]",
  PICK: "bg-[var(--rgba-195-159-84-018)] text-[color:var(--palette-7c5a1d)]",
};

export function Badge({ label }: { label: ProductBadge }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em]",
        badgeStyles[label],
      )}
    >
      {label}
    </span>
  );
}
