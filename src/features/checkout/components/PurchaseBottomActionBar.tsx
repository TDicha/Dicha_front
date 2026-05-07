import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseBottomActionBarProps {
  isPending: boolean;
  paymentLabel?: string;
  total: number;
  onPlaceOrder: () => void;
}

export function PurchaseBottomActionBar({
  isPending,
  paymentLabel,
  total,
  onPlaceOrder,
}: PurchaseBottomActionBarProps) {
  return (
    <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center gap-4 border-t border-[var(--palette-e7e2d9)] bg-white px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
      <div className="min-w-0 flex-1">
        <p className="text-[0.95rem] text-[var(--palette-6c6861)]">{paymentLabel}</p>
        <p className="mt-1 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-992b22)]">
          ₩{formatPrice(total)}
        </p>
      </div>
      <PrimaryButton
        className="h-16 min-w-[18rem] rounded-[1.35rem] px-6 text-[1.05rem] shadow-none"
        disabled={isPending}
        onClick={onPlaceOrder}
      >
        {isPending ? "주문 생성 중..." : "결제하기"}
      </PrimaryButton>
    </div>
  );
}
