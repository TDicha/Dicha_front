import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/shared/types/models";

const badgeStyles: Record<ProductBadge, string> = {
  BEST: "bg-[var(--surface-danger-tint-10)] text-[var(--state-danger)]",
  NEW: "bg-[var(--shadow-blue-alpha-10)] text-[var(--state-info)]",
  PICK: "bg-[var(--surface-accent-glow-soft)] text-[color:var(--text-warning-dark)]",
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
