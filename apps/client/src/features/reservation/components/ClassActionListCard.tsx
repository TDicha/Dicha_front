import { CalendarDays, ChevronRight, Clock3, MapPin } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

const classActions = [
  { icon: CalendarDays, label: "예약 내역 확인" },
  { icon: Clock3, label: "시간 변경 요청" },
  { icon: MapPin, label: "지점 위치 보기" },
] as const;

interface ClassActionListCardProps {
  onAction: (label: string) => void;
}

export function ClassActionListCard({ onAction }: ClassActionListCardProps) {
  return (
    <AppCard className="py-2">
      {classActions.map(({ icon: Icon, label }, index) => (
        <button
          key={label}
          className={[
            "flex w-full items-center justify-between py-4 text-left",
            index < classActions.length - 1
              ? "border-b border-[var(--border-ink-6)]"
              : "",
          ].join(" ")}
          onClick={() => onAction(label)}
          type="button"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-[var(--brand-primary)]">
            <Icon className="size-4" />
            {label}
          </span>
          <ChevronRight className="size-4 text-[var(--text-muted)]" />
        </button>
      ))}
    </AppCard>
  );
}
