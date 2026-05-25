import { PrimaryButton } from "@/components/common/PrimaryButton";

interface SubscriptionEmptyStateProps {
  onStart: () => void;
}

export function SubscriptionEmptyState({ onStart }: SubscriptionEmptyStateProps) {
  return (
    <div className="bg-[var(--surface-base)] px-[var(--page-x)] pb-10 pt-4">
      <section className="px-1 pb-6 pt-10 text-center">
        <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[var(--surface-empty-icon)] text-[3rem]">
          📦
        </div>
        <h2 className="mt-8 text-[clamp(1.45rem,6vw,1.7rem)] font-bold text-[var(--text-heading)]">
          구독 중인 상품이 없습니다
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--text-muted-warm)]">
          정기 구독으로 신선한 원두를
          <br />더 합리적인 가격에 받아보세요!
        </p>
      </section>

      <PrimaryButton className="h-12 w-full text-base shadow-none" onClick={onStart}>
        구독 시작하기
      </PrimaryButton>
    </div>
  );
}
