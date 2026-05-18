import { PrimaryButton } from "@/components/common/PrimaryButton";

export function SubscriptionEmptyState() {
  return (
    <div className="bg-[var(--surface-base)] px-5 pb-10 pt-4">
      <section className="px-1 pb-6 pt-10 text-center">
        <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[var(--surface-empty-icon)] text-[3rem]">
          📦
        </div>
        <h2 className="mt-8 text-[2rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          구독 중인 상품이 없습니다
        </h2>
        <p className="mt-4 text-[1.1rem] leading-7 text-[var(--text-muted-warm)]">
          정기 구독으로 신선한 원두를
          <br />더 합리적인 가격에 받아보세요!
        </p>
      </section>

      <PrimaryButton className="h-14 w-full rounded-[1.15rem] text-[1.05rem] shadow-none">
        구독 시작하기
      </PrimaryButton>
    </div>
  );
}
