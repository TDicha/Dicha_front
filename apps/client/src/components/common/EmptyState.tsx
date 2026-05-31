import type { ReactNode } from "react";

import { AppCard, type AppCardProps } from "@/components/common/AppCard";
import { BrandWatermark } from "@/components/common/BrandWatermark";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  eyebrow?: string;
  variant?: AppCardProps["variant"];
}

export function EmptyState({
  title,
  description,
  action,
  className,
  eyebrow = "Empty",
  variant = "default",
}: EmptyStateProps) {
  return (
    <AppCard className={className} padding="lg" variant={variant}>
      <div className="relative overflow-hidden py-2 text-center">
        <BrandWatermark className="absolute left-1/2 top-1/2 z-0 size-44 -translate-x-1/2 -translate-y-1/2 opacity-[0.055] mix-blend-multiply" />
        <p className="relative z-10 text-xs uppercase tracking-[0.28em] text-[var(--brand-accent)]">
          {eyebrow}
        </p>
        <h3 className="relative z-10 mt-2 font-heading text-lg font-semibold text-[var(--brand-primary)]">
          {title}
        </h3>
        <p className="relative z-10 mt-2 text-sm leading-6 text-[var(--text-muted)]">
          {description}
        </p>
        {action ? <div className="relative z-10 mt-5">{action}</div> : null}
      </div>
    </AppCard>
  );
}
