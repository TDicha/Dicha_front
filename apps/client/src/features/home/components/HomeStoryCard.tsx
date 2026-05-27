import { AppCard } from "@/components/common/AppCard";

export function HomeStoryCard() {
  return (
    <section>
      <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--text-cafe-ink)]">
        DICHA story
      </h3>
      <AppCard
        className="mt-4 rounded-[1.7rem] px-5 py-5"
        padding="none"
        variant="menu-board"
      >
        <div className="mb-4 flex items-center gap-3 border-b border-[var(--border-menu-board)] pb-4">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[var(--border-menu-board)] text-[var(--text-cafe-ink)]">
            <span className="font-heading text-base font-bold leading-none">
              D
            </span>
            <span className="text-[0.45rem] font-bold tracking-[0.18em]">
              CAFE
            </span>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold tracking-[0.12em] text-[var(--text-cafe-ink)]">
              DICHA
            </p>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
              Special Blending Coffee
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[var(--text-cafe-ink)]">
              DICHA의 이야기
            </h3>
            <p className="mt-2 max-w-none break-keep text-sm leading-6 text-[var(--text-muted)]">
              달라홀스처럼 변하지 않는 품질로 당신만의 원두를 로스팅합니다.
              향으로 기억되는 한 잔을 전합니다.
            </p>
          </div>
        </div>
      </AppCard>
    </section>
  );
}
