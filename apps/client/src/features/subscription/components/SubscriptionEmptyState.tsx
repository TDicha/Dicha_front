import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface SubscriptionEmptyStateProps {
  onStart: () => void;
}

export function SubscriptionEmptyState({
  onStart,
}: SubscriptionEmptyStateProps) {
  return (
    <div className="bg-[var(--surface-base)] px-[var(--page-x)] pb-10 pt-8">
      <EmptyState
        action={
          <PrimaryButton
            className="h-12 w-full rounded-none text-base shadow-none"
            onClick={onStart}
          >
            구독 시작하기
          </PrimaryButton>
        }
        description="정기 구독으로 신선한 원두를 더 합리적인 가격에 받아보세요."
        eyebrow="Subscription"
        title="구독 중인 상품이 없습니다"
      />
    </div>
  );
}
