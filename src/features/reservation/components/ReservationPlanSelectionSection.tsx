import { formatPrice } from "@/shared/utils/format";

import { reservationPlans, type ReservationPlanId } from "../reservationPlans";

interface ReservationPlanSelectionSectionProps {
  selectedPlanId: ReservationPlanId;
  onSelectPlan: (planId: ReservationPlanId) => void;
}

export function ReservationPlanSelectionSection({
  selectedPlanId,
  onSelectPlan,
}: ReservationPlanSelectionSectionProps) {
  return (
    <section className="px-4 pb-6 pt-5">
      <h2 className="text-[1.95rem] font-black tracking-[-0.05em] text-[var(--palette-121212)]">
        구독 플랜 선택
      </h2>
      <p className="mt-1 text-[0.92rem] text-[var(--palette-666666)]">
        필요에 맞는 플랜을 고르세요
      </p>

      <div className="mt-2 inline-flex rounded-full bg-[var(--accent-color)] px-3 py-1 text-[0.78rem] font-bold text-[var(--primary-color)]">
        ⭐ 가장 인기
      </div>

      <div className="mt-1 space-y-3">
        {reservationPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <article
              key={plan.id}
              className={[
                "overflow-hidden rounded-[1rem] bg-white shadow-[0_3px_10px_var(--rgba-0-0-0-008)]",
                isSelected
                  ? "border-2 border-[var(--accent-color)]"
                  : "border border-transparent",
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
                          ? "bg-[var(--palette-caa24a)] text-white"
                          : "bg-[var(--palette-4b8e73)] text-white",
                      ].join(" ")}
                    >
                      {plan.badge}
                    </span>
                  ) : null}

                  <h3 className="mt-2 text-[1.8rem] font-black tracking-[-0.05em] text-[var(--palette-121212)]">
                    {plan.title}
                  </h3>
                  <p className="mt-0.5 text-[1.2rem] font-bold text-[var(--primary-color)]">
                    {plan.quantity}
                  </p>
                  <p className="mt-0.5 text-[0.88rem] text-[var(--palette-666666)]">
                    {plan.description}
                  </p>

                  <div className="mt-7 flex items-end justify-between gap-3">
                    <p className="text-[2rem] font-black tracking-[-0.05em] text-[var(--danger-color)]">
                      ₩{formatPrice(plan.price)}
                      <span className="ml-0.5 text-[0.95rem] font-normal text-[var(--palette-666666)]">
                        /월
                      </span>
                    </p>
                    <button
                      className={[
                        "h-8 rounded-[0.65rem] px-4 text-[0.92rem] font-bold",
                        isSelected
                          ? "bg-[var(--second-color)] text-white"
                          : "bg-[var(--palette-e5ede1)] text-[var(--second-color)]",
                      ].join(" ")}
                      onClick={() => onSelectPlan(plan.id)}
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
  );
}
