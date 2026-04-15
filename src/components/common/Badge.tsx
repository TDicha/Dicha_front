import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/shared/types/models";

const badgeStyles: Record<ProductBadge, string> = {
  BEST: "bg-[rgba(148,35,30,0.1)] text-[var(--color-primary-red)]",
  NEW: "bg-[rgba(42,54,99,0.1)] text-[var(--color-primary-blue)]",
  PICK: "bg-[rgba(195,159,84,0.18)] text-[color:#7c5a1d]",
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
