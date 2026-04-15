import type { ReactNode } from "react";

import { AppCard } from "@/components/common/AppCard";

interface StatCardProps {
  value: ReactNode;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <AppCard className="rounded-[1.2rem] px-3 py-4 text-center" padding="none" variant="muted">
      <p className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--color-muted)]">{label}</p>
    </AppCard>
  );
}
