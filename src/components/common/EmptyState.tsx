import type { ReactNode } from "react";

import { AppCard } from "@/components/common/AppCard";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <AppCard className="py-7 text-center" padding="lg">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-gold)]">
        Empty
      </p>
      <h3 className="mt-2 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </AppCard>
  );
}
