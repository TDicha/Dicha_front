import { AppCard } from "@/components/common/AppCard";

const stats = [
  { label: "주문 횟수", value: "12" },
  { label: "저장 블렌드", value: "4" },
  { label: "멤버십", value: "Gold" },
] as const;

export function MyStatsSection() {
  return (
    <AppCard
      className="mx-[var(--page-x)] rounded-[1.55rem] py-2"
      variant="menu-board"
    >
      <p className="pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
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
    </AppCard>
  );
}
