import { Pause } from "lucide-react";

export function SubscriptionDangerActions() {
  return (
    <section className="px-4 py-4">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-[1rem] border border-[var(--palette-d7d0c5)] bg-white px-4 py-4 text-[1.15rem] font-semibold text-[var(--palette-67625c)]"
        type="button"
      >
        <Pause className="size-5 text-[var(--palette-7c97b1)]" />
        구독 일시정지 (최대 3개월)
      </button>
      <button
        className="mt-4 text-[1.2rem] font-semibold text-[var(--palette-c43a2f)]"
        type="button"
      >
        구독 해지
      </button>
      <p className="mt-1 text-[0.92rem] text-[var(--palette-a19c93)]">
        (해지 후 남은 기간 서비스 이용 가능)
      </p>
    </section>
  );
}
