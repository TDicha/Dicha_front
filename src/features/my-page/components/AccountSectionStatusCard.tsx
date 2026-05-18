import { AppCard } from "@/components/common/AppCard";

interface AccountSectionStatusCardProps {
  statusLabel: string;
}

export function AccountSectionStatusCard({
  statusLabel,
}: AccountSectionStatusCardProps) {
  return (
    <AppCard variant="warm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--text-muted)]">
            CURRENT STATUS
          </p>
          <h2 className="mt-2 font-heading text-lg font-semibold text-[var(--brand-primary)]">
            {statusLabel}
          </h2>
        </div>
        <span className="rounded-full bg-[var(--surface-base)] px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
          Mock UI
        </span>
      </div>
    </AppCard>
  );
}
