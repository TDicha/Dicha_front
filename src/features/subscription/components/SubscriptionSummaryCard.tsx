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
      <div className="rounded-[1.8rem] bg-[var(--palette-dfe8d6)] px-5 py-5 shadow-[0_8px_24px_var(--rgba-34-34-34-005)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-173726)]">
              {activePlan.name}
            </h1>
            <span className="rounded-full bg-[var(--second-color)] px-3 py-1 text-[0.85rem] font-bold text-white">
              {activePlan.statusLabel}
            </span>
          </div>
          {deliveryDayLabel ? (
            <div className="rounded-full bg-[var(--palette-c89f4c)] px-4 py-2 text-[1rem] font-bold text-[var(--palette-173726)]">
              {deliveryDayLabel}
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex items-start gap-4 rounded-[1rem] bg-[var(--rgba-255-255-255-042)] px-4 py-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-[0.85rem] bg-white">
            <div className="text-[2rem]">☕</div>
          </div>
          <div>
            <p className="text-[1.15rem] font-bold text-[var(--palette-173726)]">
              {subscriptionDetail.product.name}
            </p>
            <p className="mt-1 text-[1rem] text-[var(--palette-677168)]">
              {subscriptionDetail.product.optionLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-[var(--rgba-255-255-255-055)] pt-5">
          <div className="space-y-4 text-[1.05rem]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--palette-677168)]">결제일</span>
              <span className="font-bold text-[var(--palette-173726)]">
                {activePlan.billingDayLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--palette-677168)]">다음 배송일</span>
              <span className="font-bold text-[var(--palette-c89f4c)]">
                {activePlan.nextDeliveryLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--palette-677168)]">월 결제금액</span>
              <span className="text-[1.2rem] font-bold text-[var(--palette-173726)]">
                ₩{formatPrice(activePlan.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
