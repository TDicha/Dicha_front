import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseBottomActionBarProps {
  disabled?: boolean;
  isPending: boolean;
  paymentLabel?: string;
  total: number;
  onPlaceOrder: () => void;
}

export function PurchaseBottomActionBar({
  disabled = false,
  isPending,
  paymentLabel,
  total,
  onPlaceOrder,
}: PurchaseBottomActionBarProps) {
  return (
    <div className="fixed-checkout-bar">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[var(--text-muted)]">{paymentLabel}</p>
        <p className="mt-1 truncate text-[clamp(1.15rem,5vw,1.5rem)] font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(total)}
        </p>
      </div>
      <PrimaryButton
        className="h-12 min-w-0 truncate rounded-none bg-[var(--surface-chalkboard)] px-2.5 text-sm text-[var(--text-chalk)] shadow-none max-[360px]:text-xs"
        disabled={disabled || isPending}
        onClick={onPlaceOrder}
      >
        {isPending ? "주문 생성 중..." : "결제하기"}
      </PrimaryButton>
    </div>
  );
}
