import { CalendarDays, ChevronRight, Clock3, MapPin } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

const classActions = [
  { icon: CalendarDays, label: "예약 내역 확인" },
  { icon: Clock3, label: "시간 변경 요청" },
  { icon: MapPin, label: "지점 위치 보기" },
] as const;

export function ClassActionListCard() {
  return (
    <AppCard className="py-2">
      {classActions.map(({ icon: Icon, label }, index) => (
        <button
          key={label}
          className={[
            "flex w-full items-center justify-between py-4 text-left",
            index < classActions.length - 1
              ? "border-b border-[var(--rgba-17-24-39-006)]"
              : "",
          ].join(" ")}
          type="button"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-primary-green)]">
            <Icon className="size-4" />
            {label}
          </span>
          <ChevronRight className="size-4 text-[var(--color-muted)]" />
        </button>
      ))}
    </AppCard>
  );
}
