import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";

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
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[var(--app-max-width)] -translate-x-1/2 border-t border-[var(--border-muted)] bg-[var(--surface-base)] px-[var(--page-x)] pb-[var(--bottom-compact-safe-padding)] pt-2.5">
      <div className="mb-2 flex items-center justify-between gap-3 text-[0.7rem]">
        <span className="min-w-0 truncate text-[var(--text-muted-subtle)]">선택된 옵션: {selectedSummary}</span>
        <span className="shrink-0 font-bold text-[var(--state-danger)]">₩{formatPrice(totalPrice)}</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-2">
        <PrimaryButton
          className="h-11 min-w-0 rounded-[0.85rem] border border-[var(--brand-primary)] bg-[var(--surface-base)] px-3 text-[var(--brand-primary)] shadow-none max-[360px]:text-[0.82rem]"
          onClick={onAddToCart}
          variant="outline"
        >
          장바구니 담기
        </PrimaryButton>
        <PrimaryButton className="h-11 min-w-0 rounded-[0.85rem] px-3 shadow-none max-[360px]:text-[0.82rem]" onClick={onPurchase}>
          바로 구매
        </PrimaryButton>
      </div>
    </div>
  );
}
