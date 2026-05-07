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
    <div className="bg-[var(--palette-f7f5f1)] px-6 pb-10 pt-8">
      <section className="rounded-[1.9rem] bg-white px-6 py-10 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
          <CheckCircle2 className="size-12 text-[var(--second-color)]" />
        </div>
        <h1 className="mt-7 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          결제가 완료되었어요
        </h1>
        <p className="mt-3 text-[1.05rem] leading-7 text-[var(--palette-666666)]">
          주문이 정상적으로 접수되었습니다.
          <br />
          주문 조회에서 준비 상태를 바로 확인할 수 있어요.
        </p>
      </section>

      <section className="mt-5 rounded-[1.6rem] bg-white px-5 py-6">
        <div className="flex items-center justify-between border-b border-[var(--palette-ebe6dd)] pb-4">
          <span className="text-[1rem] text-[var(--palette-6d6a64)]">주문번호</span>
          <span className="text-[1rem] font-bold text-[var(--palette-171717)]">
            {completedOrder?.orderNo ?? "-"}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-[var(--palette-ebe6dd)] py-4">
          <span className="text-[1rem] text-[var(--palette-6d6a64)]">총 결제 금액</span>
          <span className="text-[1.55rem] font-bold text-[var(--palette-992b22)]">
            ₩{formatPrice(completedPricing?.total ?? fallbackTotal)}
          </span>
        </div>
        <div className="pt-4 text-[1rem] text-[var(--palette-555555)]">
          <p>결제 수단: {paymentLabel}</p>
          <p className="mt-2">배송지: 서울 성동구 연무장길 00, DICHA Studio 302호</p>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <PrimaryButton
          asChild
          className="h-14 rounded-[1.15rem] bg-white text-[var(--second-color)] shadow-none"
          variant="outline"
        >
          <Link to={ROUTES.home}>홈으로</Link>
        </PrimaryButton>
        <PrimaryButton className="h-14 rounded-[1.15rem] shadow-none" onClick={onGoOrders}>
          주문 조회
        </PrimaryButton>
      </div>
    </div>
  );
}
