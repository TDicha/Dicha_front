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
      <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
        관리 항목
      </h2>
      {items.map((item, index) => (
        <button
          key={item}
          className={[
            "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--color-primary-green)]",
            index < items.length - 1
              ? "border-b border-[var(--rgba-17-24-39-006)]"
              : "",
          ].join(" ")}
          type="button"
        >
          <span>{item}</span>
          <ChevronRight className="size-4 text-[var(--color-muted)]" />
        </button>
      ))}
    </AppCard>
  );
}
