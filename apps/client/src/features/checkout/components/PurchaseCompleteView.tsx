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
  shippingLabel?: string;
  onGoOrders: () => void;
}

export function PurchaseCompleteView({
  completedOrder,
  completedPricing,
  fallbackTotal,
  paymentLabel,
  shippingLabel,
  onGoOrders,
}: PurchaseCompleteViewProps) {
  return (
    <div className="cafe-tile-bg min-h-full pb-10 pt-2">
      <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-10 text-center">
        <div className="mx-auto flex size-24 items-center justify-center bg-[var(--surface-chalkboard-highlight)]">
          <CheckCircle2 className="size-12 text-[var(--text-chalk)]" />
        </div>
        <p className="mt-7 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-chalk-muted)]">
          Order Complete
        </p>
        <h1 className="mt-2 break-keep text-[clamp(1.4rem,6vw,1.65rem)] font-bold text-[var(--text-chalk)]">
          결제가 완료되었어요
        </h1>
        <p className="mt-3 text-[1.05rem] leading-7 text-[var(--text-chalk-muted)]">
          주문이 정상적으로 접수되었습니다.
          <br />
          주문 조회에서 준비 상태를 바로 확인할 수 있어요.
        </p>
      </section>

      <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
        <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Receipt
        </p>
        <div className="flex items-center justify-between gap-3 bg-[var(--surface-cafe-tile)] px-3 py-4">
          <span className="text-[1rem] text-[var(--text-muted-warm)]">주문번호</span>
          <span className="min-w-0 truncate text-[1rem] font-bold text-[var(--text-cafe-ink)]">
            {completedOrder?.orderNo ?? "-"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 bg-[var(--surface-cafe-tile)] px-3 py-4">
          <span className="text-[1rem] text-[var(--text-muted-warm)]">총 결제 금액</span>
          <span className="shrink-0 text-[clamp(1.35rem,5.8vw,1.55rem)] font-bold text-[var(--text-cafe-ink)]">
            ₩{formatPrice(completedPricing?.total ?? fallbackTotal)}
          </span>
        </div>
        <div className="pt-4 text-[1rem] text-[var(--text-cafe-ink)]">
          <p>결제 수단: {paymentLabel}</p>
          <p className="mt-2">배송지: {shippingLabel ?? "-"}</p>
        </div>
      </section>

      <div className="mt-2 grid grid-cols-2 gap-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
        <PrimaryButton
          asChild
          className="h-12 rounded-none bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)] shadow-none"
        >
          <Link to={ROUTES.home}>홈으로</Link>
        </PrimaryButton>
        <PrimaryButton
          className="h-12 rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
          onClick={onGoOrders}
        >
          주문 조회
        </PrimaryButton>
      </div>
    </div>
  );
}
