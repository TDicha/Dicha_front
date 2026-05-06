import {
  CalendarDays,
  ChevronRight,
  CreditCard,
  MapPin,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState } from "react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { getSubscriptionDetail } from "@/mock/subscriptionDetails";
import { mockSubscriptions } from "@/mock/subscriptions";
import { formatPrice } from "@/shared/utils/format";

const manageItemIcons = [CalendarDays, RotateCcw, CreditCard, MapPin] as const;

function getDeliveryDayLabel(dateLabel?: string) {
  if (!dateLabel) {
    return "";
  }

  const today = new Date();
  const deliveryDate = new Date(dateLabel.replace(/\./g, "-"));
  const dayMs = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil(
    (deliveryDate.getTime() - today.getTime()) / dayMs,
  );

  if (Number.isNaN(diffDays)) {
    return "";
  }

  if (diffDays === 0) {
    return "D-Day";
  }

  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
}

export function SubscriptionPage() {
  const activePlan = useMemo(
    () =>
      mockSubscriptions.find(
        (subscription) => subscription.statusLabel === "ACTIVE",
      ),
    [],
  );
  const subscriptionDetail = activePlan
    ? getSubscriptionDetail(activePlan.id)
    : undefined;
  const [selectedCycle, setSelectedCycle] = useState(
    subscriptionDetail?.selectedCycle ??
      subscriptionDetail?.cycleOptions[0] ??
      "",
  );
  const deliveryDayLabel = getDeliveryDayLabel(activePlan?.nextDeliveryLabel);

  if (
    !activePlan ||
    !subscriptionDetail ||
    subscriptionDetail.status === "empty"
  ) {
    return (
      <div className="bg-white px-5 pb-10 pt-4">
        <section className="px-1 pb-6 pt-10 text-center">
          <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[var(--palette-dfe8d8)] text-[3rem]">
            📦
          </div>
          <h2 className="mt-8 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            구독 중인 상품이 없습니다
          </h2>
          <p className="mt-4 text-[1.1rem] leading-7 text-[var(--palette-6d6a64)]">
            정기 구독으로 신선한 원두를
            <br />더 합리적인 가격에 받아보세요!
          </p>
        </section>

        <PrimaryButton className="h-14 w-full rounded-[1.15rem] text-[1.05rem] shadow-none">
          구독 시작하기
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="bg-[var(--palette-f7f5f0)] pb-10">
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
                <span className="text-[var(--palette-677168)]">
                  다음 배송일
                </span>
                <span className="font-bold text-[var(--palette-c89f4c)]">
                  {activePlan.nextDeliveryLabel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--palette-677168)]">
                  월 결제금액
                </span>
                <span className="text-[1.2rem] font-bold text-[var(--palette-173726)]">
                  ₩{formatPrice(activePlan.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[var(--palette-ebe6dd)] bg-white px-4 py-5">
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          구독 관리
        </h2>
        <div className="mt-5">
          {activePlan.perks.map((label, index) => {
            const Icon = manageItemIcons[index] ?? ChevronRight;

            return (
              <button
                key={label}
                className={[
                  "flex w-full items-center justify-between py-5 text-left",
                  index < activePlan.perks.length - 1
                    ? "border-b border-[var(--palette-ebe6dd)]"
                    : "",
                ].join(" ")}
                type="button"
              >
                <span className="flex items-center gap-4">
                  <Icon className="size-5 text-[var(--palette-738a9b)]" />
                  <span className="text-[1.15rem] font-semibold text-[var(--palette-171717)]">
                    {label}
                  </span>
                </span>
                <ChevronRight className="size-5 text-[var(--palette-c9c3b9)]" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-3 border-t border-b border-[var(--palette-ebe6dd)] bg-white px-4 py-5">
        <div className="flex items-center gap-5">
          <h2 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            구독 주기
          </h2>
          <div className="flex flex-1 rounded-full bg-[var(--palette-f3f2ef)] p-1">
            {subscriptionDetail.cycleOptions.map((option) => {
              const isSelected = selectedCycle === option;

              return (
                <button
                  key={option}
                  className={[
                    "flex-1 rounded-full px-3 py-2 text-[1rem] font-semibold transition",
                    isSelected
                      ? "bg-[var(--second-color)] text-white"
                      : "text-[var(--palette-7b776f)]",
                  ].join(" ")}
                  onClick={() => setSelectedCycle(option)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-[1rem] border border-[var(--palette-d7d0c5)] bg-white px-4 py-4 text-[1.15rem] font-semibold text-[var(--palette-67625c)]"
          type="button"
        >
          <Pause className="size-5 text-[var(--palette-7c97b1)]" />
          구독 일시정지 (최대 3개월)
        </button>
        <button
          className="mt-4 text-[1.2rem] font-semibold text-[var(--palette-c43a2f)]"
          type="button"
        >
          구독 해지
        </button>
        <p className="mt-1 text-[0.92rem] text-[var(--palette-a19c93)]">
          (해지 후 남은 기간 서비스 이용 가능)
        </p>
      </section>

      <section className="mt-1 border-t border-[var(--palette-ebe6dd)] bg-white px-4 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            배송 내역
          </h2>
          <button
            className="flex items-center gap-1 text-[1rem] font-semibold text-[var(--second-color)]"
            type="button"
          >
            전체보기
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {subscriptionDetail.deliveryHistory.map((history, index) => (
            <div
              key={`${history.date}-${history.name}`}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <span className="mt-2 size-3 rounded-full bg-[var(--second-color)]" />
                {index < subscriptionDetail.deliveryHistory.length - 1 ? (
                  <span className="mt-1 h-12 w-px bg-[var(--palette-d9d4ca)]" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.98rem] text-[var(--palette-9a958c)]">
                  {history.date}
                </p>
                <p className="mt-1 text-[1.18rem] font-semibold tracking-[-0.03em] text-[var(--palette-171717)]">
                  {history.name}
                </p>
              </div>
              <span className="rounded-full bg-[var(--palette-eff3ef)] px-3 py-1.5 text-[0.95rem] font-semibold text-[var(--palette-355b44)]">
                {history.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
