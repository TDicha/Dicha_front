import { useState } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const plans = [
  {
    id: "home",
    badge: "BEST",
    badgeTone: "gold",
    title: "홈 구독",
    quantity: "200g × 2팩",
    description: "1~2인 가정용 / 월 2회 배송",
    price: 52000,
    icon: "🏠",
    accent: "#d9e6d8",
    featured: true,
  },
  {
    id: "office",
    badge: "",
    badgeTone: "none",
    title: "오피스 구독",
    quantity: "1kg × 4팩",
    description: "사무실 · 카페용 / 월 4회 배송",
    price: 200000,
    icon: "🏢",
    accent: "#f3efe7",
    featured: false,
  },
  {
    id: "simple",
    badge: "NEW",
    badgeTone: "green",
    title: "간편 구독",
    quantity: "드립백 30개입",
    description: "언제 어디서나 간편하게",
    price: 38000,
    icon: "🧧",
    accent: "#f6ebca",
    featured: false,
  },
] as const;

export function ReservationPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<(typeof plans)[number]["id"]>("home");

  return (
    <div className="bg-[#f4f2eb] pb-8">
      <section className="relative overflow-hidden bg-[#1d3e2b] px-5 pb-7 pt-4 text-white">
        <div className="absolute right-[-2.75rem] top-[3.5rem] size-[15.5rem] rounded-full bg-[rgba(68,108,76,0.28)]" />
        <div className="absolute right-[1.25rem] top-[6.5rem] size-[10.25rem] rounded-full bg-[rgba(96,128,100,0.22)]" />
        <div className="absolute bottom-0 left-0 h-8 w-full bg-[rgba(10,20,13,0.24)]" />

        <p className="relative text-center text-[1.45rem] font-black tracking-[-0.03em]">커피 구독</p>

        <div className="relative mt-8 inline-flex rounded-full bg-[#c39f54] px-3.5 py-1.5 text-[0.8rem] font-bold text-[#1d3e2b]">
          🎉 첫 구독 20% 할인
        </div>

        <div className="relative mt-5 flex items-start justify-between gap-3">
          <div className="max-w-[13.75rem]">
            <h1 className="text-[2.8rem] font-black leading-[1.18] tracking-[-0.07em]">
              나만의 커피,
              <br />
              정기적으로
            </h1>
            <p className="mt-5 text-[0.92rem] text-white/80">
              원두 선택부터 로스팅까지 DICHA가 책임집니다
            </p>
          </div>
          <div className="relative mt-4 flex h-[8.75rem] w-[8.75rem] shrink-0 items-center justify-center">
            <div className="text-[5.6rem]">☕</div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 pt-5">
        <h2 className="text-[1.95rem] font-black tracking-[-0.05em] text-[#121212]">구독 플랜 선택</h2>
        <p className="mt-1 text-[0.92rem] text-[#666666]">필요에 맞는 플랜을 고르세요</p>

        <div className="mt-2 inline-flex rounded-full bg-[#c39f54] px-3 py-1 text-[0.78rem] font-bold text-[#1d3e2b]">
          ⭐ 가장 인기
        </div>

        <div className="mt-1 space-y-3">
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;

            return (
              <article
                key={plan.id}
                className={[
                  "overflow-hidden rounded-[1rem] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.08)]",
                  isSelected ? "border-2 border-[#c39f54]" : "border border-transparent",
                ].join(" ")}
              >
                <div className="grid grid-cols-[6.9rem_1fr]">
                  <div
                    className="flex min-h-[9.5rem] items-center justify-center"
                    style={{ backgroundColor: plan.accent }}
                  >
                    <div className="text-[3.25rem]">{plan.icon}</div>
                  </div>

                  <div className="px-4 py-4">
                    {plan.badge ? (
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
                          plan.badgeTone === "gold"
                            ? "bg-[#caa24a] text-white"
                            : "bg-[#4b8e73] text-white",
                        ].join(" ")}
                      >
                        {plan.badge}
                      </span>
                    ) : null}

                    <h3 className="mt-2 text-[1.8rem] font-black tracking-[-0.05em] text-[#121212]">
                      {plan.title}
                    </h3>
                    <p className="mt-0.5 text-[1.2rem] font-bold text-[#1d3e2b]">{plan.quantity}</p>
                    <p className="mt-0.5 text-[0.88rem] text-[#666666]">{plan.description}</p>

                    <div className="mt-7 flex items-end justify-between gap-3">
                      <p className="text-[2rem] font-black tracking-[-0.05em] text-[#94231e]">
                        ₩{formatPrice(plan.price)}
                        <span className="ml-0.5 text-[0.95rem] font-normal text-[#666666]">/월</span>
                      </p>
                      <button
                        className={[
                          "h-8 rounded-[0.65rem] px-4 text-[0.92rem] font-bold",
                          isSelected
                            ? "bg-[#204a32] text-white"
                            : "bg-[#e5ede1] text-[#204a32]",
                        ].join(" ")}
                        onClick={() => setSelectedPlanId(plan.id)}
                        type="button"
                      >
                        구독하기
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-8">
        <h2 className="text-[1.55rem] font-bold tracking-[-0.04em] text-[#121212]">
          직접 커피를 만들어 보는건 어떨까요?
        </h2>
        <PrimaryButton asChild className="mt-6 h-12 w-full rounded-[0.95rem] text-[1rem] shadow-none">
          <Link to={ROUTES.reservationClass}>클래스 신청하기</Link>
        </PrimaryButton>
      </section>
    </div>
  );
}
