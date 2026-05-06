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
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-[var(--line-color)] bg-white px-4 py-2.5">
      <div className="mb-2 flex items-center justify-between text-[0.7rem]">
        <span className="text-[var(--palette-666666)]">선택된 옵션: {selectedSummary}</span>
        <span className="font-bold text-[var(--danger-color)]">₩{formatPrice(totalPrice)}</span>
      </div>
      <div className="grid grid-cols-[1fr_1.12fr] gap-2">
        <PrimaryButton
          className="h-11 rounded-[0.85rem] border border-[var(--primary-color)] bg-white text-[var(--primary-color)] shadow-none"
          onClick={onAddToCart}
          variant="outline"
        >
          장바구니 담기
        </PrimaryButton>
        <PrimaryButton className="h-11 rounded-[0.85rem] shadow-none" onClick={onPurchase}>
          바로 구매
        </PrimaryButton>
      </div>
    </div>
  );
}
