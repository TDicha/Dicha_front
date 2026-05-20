import { ChevronRight } from "lucide-react";

import type { SubscriptionDeliveryHistory } from "@/mock/subscriptionDetails";

interface SubscriptionDeliveryHistorySectionProps {
  deliveryHistory: SubscriptionDeliveryHistory[];
}

export function SubscriptionDeliveryHistorySection({
  deliveryHistory,
}: SubscriptionDeliveryHistorySectionProps) {
  return (
    <section className="mt-1 border-t border-[var(--border-list)] bg-[var(--surface-base)] px-4 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          배송 내역
        </h2>
        <button
          className="flex items-center gap-1 text-[1rem] font-semibold text-[var(--brand-secondary)]"
          type="button"
        >
          전체보기
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {deliveryHistory.map((history, index) => (
          <div
            key={`${history.date}-${history.name}`}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col items-center">
              <span className="mt-2 size-3 rounded-full bg-[var(--brand-secondary)]" />
              {index < deliveryHistory.length - 1 ? (
                <span className="mt-1 h-12 w-px bg-[var(--border-timeline)]" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[0.98rem] text-[var(--text-timeline-muted)]">
                {history.date}
              </p>
              <p className="mt-1 text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--text-heading)]">
                {history.name}
              </p>
            </div>
            <span className="rounded-full bg-[var(--surface-tag-green)] px-3 py-1.5 text-[0.95rem] font-semibold text-[var(--text-success-muted)]">
              {history.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
