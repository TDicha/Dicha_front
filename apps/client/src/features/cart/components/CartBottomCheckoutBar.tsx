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
    <div className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[var(--app-max-width)] -translate-x-1/2 grid-cols-[minmax(0,1fr)_minmax(8.5rem,12rem)] items-center gap-3 border-t border-[var(--border-section)] bg-[var(--surface-base)] px-[var(--page-x)] pb-[var(--bottom-safe-padding)] pt-3 max-[360px]:gap-2">
      <div className="min-w-0 flex-1">
        <p className="text-[0.95rem] text-[var(--text-cart-muted)]">선택 상품 {selectedCount}개</p>
        <p className="mt-1 truncate text-[clamp(1.35rem,5vw,2rem)] font-bold tracking-[-0.04em] text-[var(--text-price-danger)]">
          ₩{formatPrice(total)}
        </p>
      </div>
      {selectedCount ? (
        <PrimaryButton
          className="h-14 min-w-0 truncate rounded-[1.15rem] px-3 text-[0.95rem] shadow-none max-[360px]:text-[0.88rem]"
          onClick={onCheckout}
        >
          ₩{formatPrice(total)} 결제하기
        </PrimaryButton>
      ) : (
        <PrimaryButton
          className="h-14 min-w-0 truncate rounded-[1.15rem] px-3 text-[0.95rem] shadow-none max-[360px]:text-[0.88rem]"
          disabled
        >
          상품 선택 필요
        </PrimaryButton>
      )}
    </div>
  );
}
