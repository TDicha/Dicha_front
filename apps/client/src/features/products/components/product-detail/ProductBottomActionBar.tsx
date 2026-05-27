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
    <div className="fixed inset-x-0 bottom-0 z-30 w-full bg-[var(--surface-menu-board)] px-[var(--page-x)] pb-[var(--bottom-compact-safe-padding)] pt-2.5 shadow-[var(--shadow-tabbar-dock)]">
      <div className="mb-2 flex items-center justify-between gap-3 text-[0.7rem]">
        <span className="min-w-0 truncate text-[var(--text-muted-subtle)]">
          선택된 메뉴: {selectedSummary}
        </span>
        <span className="shrink-0 font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(totalPrice)}
        </span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-2">
        <PrimaryButton
          className="h-11 min-w-0 rounded-none bg-[var(--surface-cafe-tile)] px-3 text-[var(--text-cafe-ink)] shadow-none max-[360px]:text-[0.82rem]"
          onClick={onAddToCart}
        >
          장바구니 담기
        </PrimaryButton>
        <PrimaryButton
          className="h-11 min-w-0 rounded-none bg-[var(--surface-chalkboard)] px-3 text-[var(--text-chalk)] shadow-none max-[360px]:text-[0.82rem]"
          onClick={onPurchase}
        >
          바로 구매
        </PrimaryButton>
      </div>
    </div>
  );

  return typeof document === "undefined"
    ? actionBar
    : createPortal(actionBar, document.body);
}
