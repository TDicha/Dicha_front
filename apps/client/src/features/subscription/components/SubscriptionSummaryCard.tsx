import type { SubscriptionDetail } from "@/mock/subscriptionDetails";
import type { SubscriptionPlan } from "@/shared/types/models";
import { formatPrice } from "@/shared/utils/format";

interface SubscriptionSummaryCardProps {
  activePlan: SubscriptionPlan;
  deliveryDayLabel: string;
  subscriptionDetail: SubscriptionDetail;
}

export function SubscriptionSummaryCard({
  activePlan,
  deliveryDayLabel,
  subscriptionDetail,
}: SubscriptionSummaryCardProps) {
  return (
    <section className="px-4 pb-5 pt-4">
      <div className="rounded-[1.8rem] bg-[var(--surface-green-card)] px-5 py-5 shadow-[0_8px_24px_var(--shadow-neutral-alpha-5)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[var(--text-brand-deep)]">
              {activePlan.name}
            </h1>
            <span className="rounded-full bg-[var(--brand-secondary)] px-3 py-1 text-[0.85rem] font-bold text-[var(--text-inverse)]">
              {activePlan.statusLabel}
            </span>
          </div>
          {deliveryDayLabel ? (
            <div className="rounded-full bg-[var(--surface-accent-solid)] px-4 py-2 text-[1rem] font-bold text-[var(--text-brand-deep)]">
              {deliveryDayLabel}
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex items-start gap-4 rounded-[1rem] bg-[var(--overlay-white-28)] px-4 py-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-[0.85rem] bg-[var(--surface-base)]">
            <div className="text-[2rem]">☕</div>
          </div>
          <div>
            <p className="text-[1.15rem] font-bold text-[var(--text-brand-deep)]">
              {subscriptionDetail.product.name}
            </p>
            <p className="mt-1 text-[1rem] text-[var(--text-subscription-muted)]">
              {subscriptionDetail.product.optionLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-[var(--overlay-white-55)] pt-5">
          <div className="space-y-4 text-[1.05rem]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-subscription-muted)]">결제일</span>
              <span className="font-bold text-[var(--text-brand-deep)]">
                {activePlan.billingDayLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-subscription-muted)]">다음 배송일</span>
              <span className="font-bold text-[var(--surface-accent-solid)]">
                {activePlan.nextDeliveryLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-subscription-muted)]">월 결제금액</span>
              <span className="text-[1.2rem] font-bold text-[var(--text-brand-deep)]">
                ₩{formatPrice(activePlan.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
