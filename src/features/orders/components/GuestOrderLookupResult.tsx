import type { Order } from "@/features/orders/types";
import { formatPrice } from "@/shared/utils/format";

interface GuestOrderLookupResultProps {
  isSuccess: boolean;
  order?: Order | null;
}

export function GuestOrderLookupResult({ isSuccess, order }: GuestOrderLookupResultProps) {
  if (!isSuccess) {
    return null;
  }

  if (!order) {
    return (
      <p className="mt-5 text-center text-sm text-[var(--color-primary-red)]">
        일치하는 비회원 주문을 찾지 못했어요.
      </p>
    );
  }

  return (
    <div className="mt-6 rounded-[1.1rem] bg-[var(--palette-f7f5f0)] px-4 py-4">
      <p className="text-sm text-[var(--palette-6d6a64)]">주문번호</p>
      <p className="mt-1 font-bold text-[var(--palette-171717)]">{order.orderNo}</p>
      <p className="mt-4 text-sm text-[var(--palette-6d6a64)]">결제 금액</p>
      <p className="mt-1 text-[1.25rem] font-bold text-[var(--palette-992b22)]">
        ₩{formatPrice(order.totalAmount)}
      </p>
    </div>
  );
}
