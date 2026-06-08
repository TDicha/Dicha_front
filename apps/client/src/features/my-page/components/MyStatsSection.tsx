interface MyStatsSectionProps {
  currentOrderCount: number;
  subscriptionStatus: string;
  cancelClaimCount: number;
  isLoading?: boolean;
}

export function MyStatsSection({
  currentOrderCount,
  subscriptionStatus,
  cancelClaimCount,
  isLoading = false,
}: MyStatsSectionProps) {
  const stats = [
    { label: "현재주문", value: isLoading ? "-" : String(currentOrderCount) },
    { label: "구독", value: isLoading ? "-" : subscriptionStatus },
    { label: "취소·클레임", value: isLoading ? "-" : String(cancelClaimCount) },
  ] as const;

  return (
    <section className="px-5 py-5">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        My Activity
      </p>
      <h2 className="pb-3 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
        활동 요약
      </h2>
      <div className="grid grid-cols-3">
        {stats.map(({ label, value }, index) => (
          <div
            key={label}
            className={[
              "py-3 text-center",
              index > 0 ? "border-l border-[var(--border-tile-grout)]" : "",
            ].join(" ")}
          >
            <p className="font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
              {value}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
