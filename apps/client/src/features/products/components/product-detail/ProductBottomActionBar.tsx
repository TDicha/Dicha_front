import { createPortal } from "react-dom";
import { ShoppingBag, ShoppingCart, SlidersHorizontal } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { formatPrice } from "@/shared/utils/format";

interface ProductBottomActionBarProps {
  selectedSummary: string;
  totalPrice: number;
  onAddToCart: () => void;
  onOpenOptions: () => void;
  onPurchase: () => void;
}

export function ProductBottomActionBar({
  selectedSummary,
  totalPrice,
  onAddToCart,
  onOpenOptions,
  onPurchase,
}: ProductBottomActionBarProps) {
  const actionBar = (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[var(--app-max-width)] -translate-x-1/2 bg-[var(--surface-menu-board)] px-[var(--page-x)] pb-[var(--bottom-compact-safe-padding)] pt-3 shadow-[var(--shadow-tabbar-dock)]">
      <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <button
          className="flex min-w-0 items-center gap-2 bg-[var(--surface-cafe-tile)] px-3 py-2 text-left text-[0.72rem] text-[var(--text-muted-subtle)]"
          onClick={onOpenOptions}
          type="button"
        >
          <SlidersHorizontal className="size-3.5 shrink-0 text-[var(--brand-primary)]" />
          <span className="min-w-0 truncate">{selectedSummary}</span>
        </button>
        <span className="shrink-0 text-right text-[0.95rem] font-black text-[var(--text-cafe-ink)] max-[340px]:text-[0.86rem]">
          ₩{formatPrice(totalPrice)}
        </span>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-2">
        <PrimaryButton
          className="h-12 min-w-0 rounded-none bg-[var(--surface-cafe-tile)] px-2 text-[var(--text-cafe-ink)] shadow-none max-[360px]:text-[0.8rem]"
          onClick={onAddToCart}
        >
          <ShoppingCart className="size-4 shrink-0" />
          <span>장바구니</span>
        </PrimaryButton>
        <PrimaryButton
          className="h-12 min-w-0 rounded-none bg-[var(--surface-chalkboard)] px-2 text-[var(--text-chalk)] shadow-none max-[360px]:text-[0.8rem]"
          onClick={onPurchase}
        >
          <ShoppingBag className="size-4 shrink-0" />
          <span>바로 구매</span>
        </PrimaryButton>
      </div>
    </div>
  );

  return typeof document === "undefined"
    ? actionBar
    : createPortal(actionBar, document.body);
}
