import { ChevronRight } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

interface AccountSectionItemsCardProps {
  items: readonly string[];
}

export function AccountSectionItemsCard({
  items,
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
          type="button"
        >
          <span>{item}</span>
          <ChevronRight className="size-4 text-[var(--text-muted)]" />
        </button>
      ))}
    </AppCard>
  );
}
