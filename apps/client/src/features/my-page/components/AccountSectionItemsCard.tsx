import { ChevronRight } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

interface AccountSectionItemsCardProps {
  items: readonly string[];
  onSelectItem: (item: string) => void;
}

export function AccountSectionItemsCard({
  items,
  onSelectItem,
}: AccountSectionItemsCardProps) {
  return (
    <AppCard className="py-2">
      <h2 className="py-3 font-heading text-lg font-semibold text-[var(--brand-primary)]">
        관리 항목
      </h2>
      {items.map((item, index) => (
        <button
          key={item}
          className={[
            "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--brand-primary)]",
            index < items.length - 1
              ? "border-b border-[var(--border-ink-6)]"
              : "",
          ].join(" ")}
          onClick={() => onSelectItem(item)}
          type="button"
        >
          <span>{item}</span>
          <ChevronRight className="size-4 text-[var(--text-muted)]" />
        </button>
      ))}
    </AppCard>
  );
}
