import { AppCard } from "@/components/common/AppCard";

interface ClassScheduleCardProps {
  slots: string[];
}

export function ClassScheduleCard({ slots }: ClassScheduleCardProps) {
  return (
    <AppCard>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            예약 일정
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            원하는 날짜와 클래스 시간을 선택하세요
          </p>
        </div>
        <div className="rounded-full bg-[var(--rgba-29-62-43-006)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
          4월 18일
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {slots.map((slot, index) => (
          <button
            key={slot}
            className={[
              "rounded-[1rem] border px-3 py-3 text-sm font-medium transition",
              index === 2
                ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                : "border-[var(--rgba-17-24-39-008)] bg-white text-[var(--color-primary-green)]",
            ].join(" ")}
            type="button"
          >
            {slot}
          </button>
        ))}
      </div>
    </AppCard>
  );
}
