import { useMemo } from "react";

import { useCheckoutStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import { calculateCartPricing } from "@/features/cart/cartPricing";
import {
  PurchaseBottomActionBar,
  PurchaseEmptyState,
  PurchaseHeaderSection,
  PurchaseItemsSection,
  PurchasePricingSection,
} from "@/features/checkout";

export function PurchasePage() {
  const draft = useCheckoutStore((state) => state.draft);
  const items = useMemo(() => draft?.items ?? [], [draft]);

  const { subtotal, couponDiscount, shippingFee, total } = useMemo(
    () => calculateCartPricing(items),
    [items],
  );

  if (!items.length) {
    return <PurchaseEmptyState />;
  }

  return (
    <div className="cafe-tile-bg min-h-full pb-[var(--fixed-action-page-padding)]">
      <PurchaseHeaderSection />
      <section className="mt-2 px-[var(--page-x)]">
        <EmptyState
          description="배송지 입력과 저장 기능을 준비 중입니다."
          eyebrow="Preparing"
          title="배송지 설정은 구현 중입니다"
          variant="menu-board"
        />
      </section>
      <section className="mt-2 px-[var(--page-x)]">
        <EmptyState
          description="결제 수단 선택과 결제 승인 기능을 준비 중입니다."
          eyebrow="Preparing"
          title="결제 기능은 구현 중입니다"
          variant="menu-board"
        />
      </section>
      <PurchaseItemsSection items={items} />
      <PurchasePricingSection pricing={{ subtotal, couponDiscount, shippingFee, total }} />
      <PurchaseBottomActionBar
        disabled
        isPending={false}
        onPlaceOrder={() => undefined}
        paymentLabel="배송지/결제 기능 준비 중"
        total={total}
      />
    </div>
  );
}
