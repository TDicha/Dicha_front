import { CalendarDays, CheckCheck, ChevronRight, CreditCard, MapPin, RotateCcw } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockSubscriptions } from "@/mock/subscriptions";
import { formatPrice } from "@/shared/utils/format";

export function SubscriptionPage() {
  const activePlan = mockSubscriptions[0];

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="rounded-[1.65rem]" variant="warm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
                {activePlan.name}
              </h1>
              {activePlan.statusLabel ? (
                <span className="rounded-full bg-[var(--color-primary-green)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white">
                  {activePlan.statusLabel}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {activePlan.beansPerMonth}
            </p>
          </div>
          <div className="rounded-full bg-white/80 px-3 py-2 text-sm font-semibold text-[var(--color-primary-green)]">
            D-7
          </div>
        </div>

        <div className="mt-4 rounded-[1.2rem] bg-white/74 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-[1rem] bg-[rgba(29,62,43,0.08)] text-2xl">
              ☕
            </div>
            <div>
              <p className="font-semibold text-[var(--color-primary-green)]">에티오피아 예가체프 G1</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">미디엄 로스트 · 200g × 2</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 border-t border-[rgba(17,24,39,0.06)] pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-muted)]">결제일</span>
              <span className="font-medium text-[var(--color-primary-green)]">
                {activePlan.billingDayLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-muted)]">다음 배송일</span>
              <span className="font-medium text-[var(--color-primary-green)]">
                {activePlan.nextDeliveryLabel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-muted)]">월 결제금액</span>
              <span className="font-semibold text-[var(--color-primary-green)]">
                ₩{formatPrice(activePlan.price)}
              </span>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard className="py-2">
        <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
          구독 관리
        </h2>
        {[
          { icon: CalendarDays, label: "배송 일정 변경" },
          { icon: RotateCcw, label: "상품 / 옵션 변경" },
          { icon: CreditCard, label: "결제 수단 변경" },
          { icon: MapPin, label: "배송지 변경" },
        ].map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            className={[
              "flex w-full items-center justify-between py-4 text-left",
              index < 3 ? "border-b border-[rgba(17,24,39,0.06)]" : "",
            ].join(" ")}
            type="button"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-primary-green)]">
              <Icon className="size-4" />
              {label}
            </span>
            <ChevronRight className="size-4 text-[var(--color-muted)]" />
          </button>
        ))}
      </AppCard>

      <AppCard>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            구독 주기
          </h2>
          <div className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
            매월
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-[1rem] bg-[rgba(29,62,43,0.04)] p-1.5">
          <button className="rounded-[0.9rem] py-2 text-sm font-medium text-[var(--color-primary-green)]" type="button">
            매주
          </button>
          <button className="rounded-[0.9rem] py-2 text-sm font-medium text-[var(--color-primary-green)]" type="button">
            격주
          </button>
          <button className="rounded-[0.9rem] bg-white py-2 text-sm font-semibold text-[var(--color-primary-green)] shadow-sm" type="button">
            매월
          </button>
        </div>
      </AppCard>

      <AppCard variant="muted">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white text-[var(--color-primary-green)]">
            <CheckCheck className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              배송 내역
            </h2>
            <p className="text-sm text-[var(--color-muted)]">최근 구독 배송을 확인하세요</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {[
            "2026.03.05 / 예가체프 G1 200g×2 / 배송완료",
            "2026.02.05 / 예가체프 G1 200g×2 / 배송완료",
            "2026.01.05 / 콜롬비아 수프리모 200g×2 / 배송완료",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1rem] bg-white px-4 py-3 text-sm text-[var(--color-primary-green)]"
            >
              {item}
            </div>
          ))}
        </div>
      </AppCard>

      <div className="space-y-3">
        <PrimaryButton className="w-full">구독 유지하기</PrimaryButton>
        <button
          className="w-full rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-muted)]"
          type="button"
        >
          구독 일시정지 / 해지
        </button>
      </div>
    </div>
  );
}
