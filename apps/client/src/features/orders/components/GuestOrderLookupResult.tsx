import type { Order } from "@/features/orders/types";
import { formatPrice } from "@/shared/utils/format";

interface GuestOrderLookupResultProps {
  isCanceling?: boolean;
  isSuccess: boolean;
  onCancel?: () => void;
  order?: Order | null;
}

export function GuestOrderLookupResult({
  isCanceling = false,
  isSuccess,
  onCancel,
  order,
}: GuestOrderLookupResultProps) {
  if (!isSuccess) {
    return null;
  }

  if (!order) {
    return (
      <p className="mt-5 text-center text-sm text-[var(--state-danger)]">
        일치하는 비회원 주문을 찾지 못했어요.
      </p>
    );
  }

  return (
    <div className="mt-6 rounded-[1.1rem] bg-[var(--surface-page)] px-4 py-4">
      <p className="text-sm text-[var(--text-muted-warm)]">주문번호</p>
      <p className="mt-1 font-bold text-[var(--text-heading)]">{order.orderNo}</p>
      <p className="mt-4 text-sm text-[var(--text-muted-warm)]">결제 금액</p>
      <p className="mt-1 text-[1.25rem] font-bold text-[var(--text-price-danger)]">
        ₩{formatPrice(order.totalAmount)}
      </p>
      {order.status === "order_created" || order.status === "payment_completed" ? (
        <button
          className="mt-4 h-11 w-full rounded-[0.85rem] bg-[var(--surface-danger-soft)] text-sm font-semibold text-[var(--state-danger)]"
          disabled={isCanceling}
          onClick={onCancel}
          type="button"
        >
          {isCanceling ? "취소 중" : "비회원 주문 취소"}
        </button>
      ) : null}
    </div>
  );
}
