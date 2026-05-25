import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { CartPricingSummary } from "@/features/cart/cartPricing";
import type { Order } from "@/features/orders";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseCompleteViewProps {
  completedOrder: Order | null;
  completedPricing: CartPricingSummary | null;
  fallbackTotal: number;
  paymentLabel?: string;
  onGoOrders: () => void;
}

export function PurchaseCompleteView({
  completedOrder,
  completedPricing,
  fallbackTotal,
  paymentLabel,
  onGoOrders,
}: PurchaseCompleteViewProps) {
  return (
    <div className="bg-[var(--surface-page-alt)] px-[var(--page-x)] pb-10 pt-8">
      <section className="rounded-[var(--radius-card)] bg-[var(--surface-base)] px-[var(--page-x)] py-10 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[var(--surface-icon-green)]">
          <CheckCircle2 className="size-12 text-[var(--brand-secondary)]" />
        </div>
        <h1 className="mt-7 break-keep text-[clamp(1.4rem,6vw,1.65rem)] font-bold text-[var(--text-heading)]">
          결제가 완료되었어요
        </h1>
        <p className="mt-3 text-[1.05rem] leading-7 text-[var(--text-muted-subtle)]">
          주문이 정상적으로 접수되었습니다.
          <br />
          주문 조회에서 준비 상태를 바로 확인할 수 있어요.
        </p>
      </section>

      <section className="mt-5 rounded-[var(--radius-card)] bg-[var(--surface-base)] px-[var(--page-x)] py-6">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-list)] pb-4">
          <span className="text-[1rem] text-[var(--text-muted-warm)]">주문번호</span>
          <span className="min-w-0 truncate text-[1rem] font-bold text-[var(--text-heading)]">
            {completedOrder?.orderNo ?? "-"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-list)] py-4">
          <span className="text-[1rem] text-[var(--text-muted-warm)]">총 결제 금액</span>
          <span className="shrink-0 text-[clamp(1.35rem,5.8vw,1.55rem)] font-bold text-[var(--text-price-danger)]">
            ₩{formatPrice(completedPricing?.total ?? fallbackTotal)}
          </span>
        </div>
        <div className="pt-4 text-[1rem] text-[var(--text-neutral-700)]">
          <p>결제 수단: {paymentLabel}</p>
          <p className="mt-2">배송지: 서울 성동구 연무장길 00, DICHA Studio 302호</p>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <PrimaryButton
          asChild
          className="h-12 bg-[var(--surface-base)] text-[var(--brand-secondary)] shadow-none"
          variant="outline"
        >
          <Link to={ROUTES.home}>홈으로</Link>
        </PrimaryButton>
        <PrimaryButton className="h-12 shadow-none" onClick={onGoOrders}>
          주문 조회
        </PrimaryButton>
      </div>
    </div>
  );
}
