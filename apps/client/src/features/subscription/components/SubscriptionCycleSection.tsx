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
    <section className="mt-3 border-t border-b border-[var(--border-list)] bg-[var(--surface-base)] px-4 py-5">
      <div className="flex items-center gap-5">
        <h2 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          구독 주기
        </h2>
        <div className="flex flex-1 rounded-full bg-[var(--surface-chip)] p-1">
          {cycleOptions.map((option) => {
            const isSelected = selectedCycle === option;

            return (
              <button
                key={option}
                className={[
                  "flex-1 rounded-full px-3 py-2 text-[1rem] font-semibold transition",
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
