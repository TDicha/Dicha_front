import {
  CalendarDays,
  ChevronRight,
  CreditCard,
  MapPin,
  RotateCcw,
} from "lucide-react";

const manageItemIcons = [CalendarDays, RotateCcw, CreditCard, MapPin] as const;

interface SubscriptionManageSectionProps {
  perks: string[];
}

export function SubscriptionManageSection({
  perks,
}: SubscriptionManageSectionProps) {
  return (
    <section className="border-t border-b border-[var(--palette-ebe6dd)] bg-white px-4 py-5">
      <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
        구독 관리
      </h2>
      <div className="mt-5">
        {perks.map((label, index) => {
          const Icon = manageItemIcons[index] ?? ChevronRight;

          return (
            <button
              key={label}
              className={[
                "flex w-full items-center justify-between py-5 text-left",
                index < perks.length - 1
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
  );
}
