import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";

interface CartBottomCheckoutBarProps {
  selectedCount: number;
  total: number;
  onCheckout: () => void;
}

export function CartBottomCheckoutBar({
  selectedCount,
  total,
  onCheckout,
}: CartBottomCheckoutBarProps) {
  return (
    <div className="fixed-checkout-bar">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[var(--text-muted)]">선택 상품 {selectedCount}개</p>
        <p className="mt-1 truncate text-[clamp(1.15rem,5vw,1.5rem)] font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(total)}
        </p>
      </div>
      {selectedCount ? (
        <PrimaryButton
          className="h-12 min-w-0 truncate rounded-none bg-[var(--surface-chalkboard)] px-2.5 text-sm text-[var(--text-chalk)] shadow-none max-[360px]:text-xs"
          onClick={onCheckout}
        >
          ₩{formatPrice(total)} 결제하기
        </PrimaryButton>
      ) : (
        <PrimaryButton
          className="h-12 min-w-0 truncate rounded-none bg-[var(--surface-cafe-tile)] px-2.5 text-sm text-[var(--text-muted)] shadow-none max-[360px]:text-xs"
          disabled
        >
          상품 선택 필요
        </PrimaryButton>
      )}
    </div>
  );
}
