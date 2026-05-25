import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";
import { createPortal } from "react-dom";

interface ProductBottomActionBarProps {
  selectedSummary: string;
  totalPrice: number;
  onAddToCart: () => void;
  onPurchase: () => void;
}

export function ProductBottomActionBar({
  selectedSummary,
  totalPrice,
  onAddToCart,
  onPurchase,
}: ProductBottomActionBarProps) {
  const actionBar = (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[var(--app-max-width)] -translate-x-1/2 border-t border-[var(--border-muted)] bg-[var(--surface-base)] px-[var(--page-x)] pb-[var(--bottom-compact-safe-padding)] pt-2.5 shadow-[0_-8px_20px_var(--shadow-ink-alpha-5)]">
      <div className="mb-2 flex items-center justify-between gap-3 text-[0.7rem]">
        <span className="min-w-0 truncate text-[var(--text-muted-subtle)]">선택된 옵션: {selectedSummary}</span>
        <span className="shrink-0 font-bold text-[var(--state-danger)]">₩{formatPrice(totalPrice)}</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-2">
        <PrimaryButton
          className="h-11 min-w-0 border border-[var(--brand-primary)] bg-[var(--surface-base)] px-3 text-[var(--brand-primary)] shadow-none max-[360px]:text-[0.82rem]"
          onClick={onAddToCart}
          variant="outline"
        >
          장바구니 담기
        </PrimaryButton>
        <PrimaryButton className="h-11 min-w-0 px-3 shadow-none max-[360px]:text-[0.82rem]" onClick={onPurchase}>
          바로 구매
        </PrimaryButton>
      </div>
    </div>
  );

  return typeof document === "undefined"
    ? actionBar
    : createPortal(actionBar, document.body);
}
