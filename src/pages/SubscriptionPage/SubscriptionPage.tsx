import { CalendarDays, ChevronRight, CreditCard, MapPin, Pause, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockSubscriptions } from "@/mock/subscriptions";
import { formatPrice } from "@/shared/utils/format";

const manageItems = [
  { icon: CalendarDays, label: "배송 일정 변경" },
  { icon: RotateCcw, label: "상품 / 옵션 변경" },
  { icon: CreditCard, label: "결제 수단 변경" },
  { icon: MapPin, label: "배송지 변경" },
] as const;

const deliveryHistory = [
  { date: "2026.03.05", name: "예가체프 G1 200g×2", status: "배송완료" },
  { date: "2026.02.05", name: "예가체프 G1 200g×2", status: "배송완료" },
  { date: "2026.01.05", name: "콜롬비아 수프리모 200g×2", status: "배송완료" },
  { date: "2025.12.05", name: "예가체프 G1 200g×2", status: "배송완료" },
] as const;

const cycleOptions = ["매주", "격주", "매월"] as const;

export function SubscriptionPage() {
  const [mode, setMode] = useState<"active" | "empty">("active");
  const [selectedCycle, setSelectedCycle] = useState<(typeof cycleOptions)[number]>("매월");
  const activePlan = useMemo(() => mockSubscriptions[0], []);

  if (mode === "empty") {
    return (
      <div className="bg-white px-5 pb-10 pt-4">
        <div className="flex justify-end">
          <button
            className="rounded-full bg-[#f2efe8] px-4 py-2 text-sm font-medium text-[#204a32]"
            onClick={() => setMode("active")}
            type="button"
          >
            활성 상태 보기
          </button>
        </div>

        <section className="px-1 pb-6 pt-10 text-center">
          <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[#dfe8d8] text-[3rem]">
            📦
          </div>
          <h2 className="mt-8 text-[2rem] font-bold tracking-[-0.04em] text-[#171717]">
            구독 중인 상품이 없습니다
          </h2>
          <p className="mt-4 text-[1.1rem] leading-7 text-[#6d6a64]">
            정기 구독으로 신선한 원두를
            <br />
            더 합리적인 가격에 받아보세요!
          </p>
        </section>

        <PrimaryButton className="h-14 w-full rounded-[1.15rem] text-[1.05rem] shadow-none">
          구독 시작하기
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f0] pb-10">
      <div className="px-4 pt-3">
        <div className="flex justify-end">
          <button
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#204a32]"
            onClick={() => setMode("empty")}
            type="button"
          >
            빈 상태 보기
          </button>
        </div>
      </div>

      <section className="px-4 pb-5 pt-4">
        <div className="rounded-[1.8rem] bg-[#dfe8d6] px-5 py-5 shadow-[0_8px_24px_rgba(34,34,34,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[#173726]">
                {activePlan.name}
              </h1>
              <span className="rounded-full bg-[#204a32] px-3 py-1 text-[0.85rem] font-bold text-white">
                {activePlan.statusLabel}
              </span>
            </div>
            <div className="rounded-full bg-[#c89f4c] px-4 py-2 text-[1rem] font-bold text-[#173726]">
              D-7
            </div>
          </div>

          <div className="mt-5 flex items-start gap-4 rounded-[1rem] bg-[rgba(255,255,255,0.42)] px-4 py-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-[0.85rem] bg-white">
              <div className="text-[2rem]">☕</div>
            </div>
            <div>
              <p className="text-[1.15rem] font-bold text-[#173726]">에티오피아 예가체프 G1</p>
              <p className="mt-1 text-[1rem] text-[#677168]">미디엄 로스트 · 200g × 2</p>
            </div>
          </div>

          <div className="mt-5 border-t border-[rgba(255,255,255,0.55)] pt-5">
            <div className="space-y-4 text-[1.05rem]">
              <div className="flex items-center justify-between">
                <span className="text-[#677168]">결제일</span>
                <span className="font-bold text-[#173726]">{activePlan.billingDayLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#677168]">다음 배송일</span>
                <span className="font-bold text-[#c89f4c]">{activePlan.nextDeliveryLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#677168]">월 결제금액</span>
                <span className="text-[1.2rem] font-bold text-[#173726]">
                  ₩{formatPrice(activePlan.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-[#ebe6dd] bg-white px-4 py-5">
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[#171717]">구독 관리</h2>
        <div className="mt-5">
          {manageItems.map(({ icon: Icon, label }, index) => (
            <button
              key={label}
              className={[
                "flex w-full items-center justify-between py-5 text-left",
                index < manageItems.length - 1 ? "border-b border-[#ebe6dd]" : "",
              ].join(" ")}
              type="button"
            >
              <span className="flex items-center gap-4">
                <Icon className="size-5 text-[#738a9b]" />
                <span className="text-[1.15rem] font-semibold text-[#171717]">{label}</span>
              </span>
              <ChevronRight className="size-5 text-[#c9c3b9]" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-3 border-t border-b border-[#ebe6dd] bg-white px-4 py-5">
        <div className="flex items-center gap-5">
          <h2 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[#171717]">구독 주기</h2>
          <div className="flex flex-1 rounded-full bg-[#f3f2ef] p-1">
            {cycleOptions.map((option) => {
              const isSelected = selectedCycle === option;

              return (
                <button
                  key={option}
                  className={[
                    "flex-1 rounded-full px-3 py-2 text-[1rem] font-semibold transition",
                    isSelected ? "bg-[#204a32] text-white" : "text-[#7b776f]",
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
          className="flex w-full items-center justify-center gap-2 rounded-[1rem] border border-[#d7d0c5] bg-white px-4 py-4 text-[1.15rem] font-semibold text-[#67625c]"
          type="button"
        >
          <Pause className="size-5 text-[#7c97b1]" />
          구독 일시정지 (최대 3개월)
        </button>
        <button className="mt-4 text-[1.2rem] font-semibold text-[#c43a2f]" type="button">
          구독 해지
        </button>
        <p className="mt-1 text-[0.92rem] text-[#a19c93]">(해지 후 남은 기간 서비스 이용 가능)</p>
      </section>

      <section className="mt-1 border-t border-[#ebe6dd] bg-white px-4 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[#171717]">배송 내역</h2>
          <button className="flex items-center gap-1 text-[1rem] font-semibold text-[#204a32]" type="button">
            전체보기
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {deliveryHistory.map((history, index) => (
            <div key={`${history.date}-${history.name}`} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="mt-2 size-3 rounded-full bg-[#204a32]" />
                {index < deliveryHistory.length - 1 ? (
                  <span className="mt-1 h-12 w-px bg-[#d9d4ca]" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.98rem] text-[#9a958c]">{history.date}</p>
                <p className="mt-1 text-[1.18rem] font-semibold tracking-[-0.03em] text-[#171717]">
                  {history.name}
                </p>
              </div>
              <span className="rounded-full bg-[#eff3ef] px-3 py-1.5 text-[0.95rem] font-semibold text-[#355b44]">
                {history.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
