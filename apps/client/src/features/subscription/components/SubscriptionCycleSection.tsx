interface SubscriptionCycleSectionProps {
  cycleOptions: string[];
  selectedCycle: string;
  onSelectCycle: (cycle: string) => void;
}

export function SubscriptionCycleSection({
  cycleOptions,
  selectedCycle,
  onSelectCycle,
}: SubscriptionCycleSectionProps) {
  return (
    <section className="mt-3 border-t border-b border-[var(--border-list)] bg-[var(--surface-base)] px-[var(--page-x)] py-5">
      <div className="flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-center">
        <h2 className="shrink-0 text-xl font-bold text-[var(--text-heading)]">
          구독 주기
        </h2>
        <div className="flex flex-1 rounded-full bg-[var(--surface-chip)] p-1">
          {cycleOptions.map((option) => {
            const isSelected = selectedCycle === option;

            return (
              <button
                key={option}
                className={[
                "min-w-0 flex-1 rounded-full px-2 py-2 text-sm font-semibold transition",
                  isSelected
                    ? "bg-[var(--brand-secondary)] text-[var(--text-inverse)]"
                    : "text-[var(--text-list-count)]",
                ].join(" ")}
                onClick={() => onSelectCycle(option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
