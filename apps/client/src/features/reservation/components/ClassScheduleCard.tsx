import { AppCard } from "@/components/common/AppCard";

interface ClassScheduleCardProps {
  slots: string[];
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

export function ClassScheduleCard({ slots, selectedSlot, onSelectSlot }: ClassScheduleCardProps) {
  return (
    <AppCard>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
            예약 일정
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            원하는 날짜와 클래스 시간을 선택하세요
          </p>
        </div>
        <div className="rounded-full bg-[var(--surface-brand-tint-6)] px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
          4월 18일
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            className={[
              "rounded-[1rem] border px-3 py-3 text-sm font-medium transition",
              selectedSlot === slot
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--text-inverse)]"
                : "border-[var(--border-ink-8)] bg-[var(--surface-base)] text-[var(--brand-primary)]",
            ].join(" ")}
            onClick={() => onSelectSlot(slot)}
            type="button"
          >
            {slot}
          </button>
        ))}
      </div>
    </AppCard>
  );
}
