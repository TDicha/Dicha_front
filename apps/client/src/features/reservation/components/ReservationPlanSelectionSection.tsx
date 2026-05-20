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
    <section className="px-[var(--page-x)] pb-6 pt-5">
      <h2 className="break-keep text-[clamp(1.65rem,7vw,1.95rem)] font-black tracking-[-0.05em] text-[var(--text-title)]">
        구독 플랜 선택
      </h2>
      <p className="mt-1 text-[0.92rem] text-[var(--text-muted-subtle)]">
        필요에 맞는 플랜을 고르세요
      </p>

      <div className="mt-2 inline-flex rounded-full bg-[var(--brand-accent)] px-3 py-1 text-[0.78rem] font-bold text-[var(--brand-primary)]">
        ⭐ 가장 인기
      </div>

      <div className="mt-1 space-y-3">
        {reservationPlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <article
              key={plan.id}
              className={[
                "overflow-hidden rounded-[1rem] bg-[var(--surface-base)] shadow-[0_3px_10px_var(--overlay-black-8)]",
                isSelected
                  ? "border-2 border-[var(--brand-accent)]"
                  : "border border-transparent",
              ].join(" ")}
            >
              <div className="grid grid-cols-[clamp(5.25rem,27vw,6.9rem)_minmax(0,1fr)]">
                <div
                  className="flex min-h-[clamp(8rem,34vw,9.5rem)] items-center justify-center"
                  style={{ backgroundColor: plan.accent }}
                >
                  <div className="text-[clamp(2.6rem,13vw,3.25rem)]">{plan.icon}</div>
                </div>

                <div className="min-w-0 px-3 py-4 min-[380px]:px-4">
                  {plan.badge ? (
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
                        plan.badgeTone === "gold"
                          ? "bg-[var(--state-accent)] text-[var(--text-inverse)]"
                          : "bg-[var(--surface-success)] text-[var(--text-inverse)]",
                      ].join(" ")}
                    >
                      {plan.badge}
                    </span>
                  ) : null}

                  <h3 className="mt-2 break-keep text-[clamp(1.35rem,6vw,1.8rem)] font-black tracking-[-0.05em] text-[var(--text-title)]">
                    {plan.title}
                  </h3>
                  <p className="mt-0.5 break-keep text-[clamp(1rem,4.8vw,1.2rem)] font-bold text-[var(--brand-primary)]">
                    {plan.quantity}
                  </p>
                  <p className="mt-0.5 text-[0.88rem] text-[var(--text-muted-subtle)]">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-end justify-between gap-2 min-[380px]:mt-7 min-[380px]:gap-3">
                    <p className="text-[clamp(1.45rem,7vw,2rem)] font-black tracking-[-0.05em] text-[var(--state-danger)]">
                      ₩{formatPrice(plan.price)}
                      <span className="ml-0.5 text-[0.95rem] font-normal text-[var(--text-muted-subtle)]">
                        /월
                      </span>
                    </p>
                    <button
                      className={[
                        "h-8 shrink-0 rounded-[0.65rem] px-3 text-[0.88rem] font-bold min-[380px]:px-4 min-[380px]:text-[0.92rem]",
                        isSelected
                          ? "bg-[var(--brand-secondary)] text-[var(--text-inverse)]"
                          : "bg-[var(--surface-green-pale)] text-[var(--brand-secondary)]",
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
