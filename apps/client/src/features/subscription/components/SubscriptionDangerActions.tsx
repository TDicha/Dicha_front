import { Pause } from "lucide-react";

interface SubscriptionDangerActionsProps {
  onAction: (label: string) => void;
}

export function SubscriptionDangerActions({ onAction }: SubscriptionDangerActionsProps) {
  return (
    <section className="px-[var(--page-x)] py-4">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--border-warm)] bg-[var(--surface-base)] px-4 py-4 text-base font-semibold text-[var(--text-action-muted)]"
        onClick={() => onAction("구독 일시정지")}
        type="button"
      >
        <Pause className="size-5 text-[var(--icon-info-muted)]" />
        구독 일시정지 (최대 3개월)
      </button>
      <button
        className="mt-4 text-base font-semibold text-[var(--state-danger-solid)]"
        onClick={() => onAction("구독 해지")}
        type="button"
      >
        구독 해지
      </button>
      <p className="mt-1 text-[0.92rem] text-[var(--text-danger-muted)]">
        (해지 후 남은 기간 서비스 이용 가능)
      </p>
    </section>
  );
}
