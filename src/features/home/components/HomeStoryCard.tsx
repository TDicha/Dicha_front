import { AppCard } from "@/components/common/AppCard";

export function HomeStoryCard() {
  return (
    <AppCard className="rounded-[1.6rem] px-5 py-5" padding="none" variant="warm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
            DICHA의 이야기
          </h3>
          <p className="mt-2 max-w-[13rem] text-sm leading-6 text-[var(--color-muted)]">
            달라홀스처럼 변하지 않는 품질로 당신만의 원두를 로스팅합니다. 향으로 기억되는 한 잔을 전합니다.
          </p>
        </div>
        <div className="flex size-[4.9rem] shrink-0 items-center justify-center rounded-full bg-[var(--rgba-29-62-43-008)]">
          <span className="text-[2rem]">🐴</span>
        </div>
      </div>
    </AppCard>
  );
}
