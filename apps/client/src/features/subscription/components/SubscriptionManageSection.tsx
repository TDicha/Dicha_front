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
  onAction: (label: string) => void;
}

export function SubscriptionManageSection({
  perks,
  onAction,
}: SubscriptionManageSectionProps) {
  return (
    <section className="border-t border-b border-[var(--border-list)] bg-[var(--surface-base)] px-[var(--page-x)] py-5">
      <h2 className="text-xl font-bold text-[var(--text-heading)]">
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
                  ? "border-b border-[var(--border-list)]"
                  : "",
              ].join(" ")}
              onClick={() => onAction(label)}
              type="button"
            >
              <span className="flex items-center gap-4">
                <Icon className="size-5 text-[var(--icon-muted-blue)]" />
                <span className="text-base font-semibold text-[var(--text-heading)]">
                  {label}
                </span>
              </span>
              <ChevronRight className="size-5 text-[var(--icon-warm-muted)]" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
