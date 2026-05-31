import { ShoppingCart, X } from "lucide-react";
import { createPortal } from "react-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";

interface ProductCartAddedDialogProps {
  open: boolean;
  onClose: () => void;
  onGoCart: () => void;
}

export function ProductCartAddedDialog({
  open,
  onClose,
  onGoCart,
}: ProductCartAddedDialogProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--overlay-black-28)] px-[var(--page-x)] pb-[var(--bottom-safe-padding)] pt-8 min-[420px]:items-center">
      <button
        aria-label="장바구니 담김 안내 닫기"
        className="absolute inset-0 h-full w-full"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="relative w-full max-w-[22rem] bg-[var(--surface-menu-board)] px-5 pb-5 pt-4 text-[var(--text-cafe-ink)] shadow-[var(--shadow-bottom-sheet)]"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-[var(--surface-cafe-tile)]">
              <ShoppingCart className="size-5" />
            </div>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                Cart
              </p>
              <h2 className="mt-1 font-heading text-lg font-semibold">
                장바구니에 담겼습니다
              </h2>
            </div>
          </div>
          <button
            aria-label="장바구니 담김 안내 닫기"
            className="flex size-8 items-center justify-center text-[var(--text-muted)]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
          선택한 옵션이 장바구니에 추가되었어요. 바로 확인하거나 계속 쇼핑할 수
          있습니다.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <PrimaryButton
            className="h-11 rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
            onClick={onGoCart}
          >
            장바구니로 이동
          </PrimaryButton>
          <PrimaryButton
            className="h-11 rounded-none bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)] shadow-none"
            onClick={onClose}
          >
            마저 쇼핑하기
          </PrimaryButton>
        </div>
      </section>
    </div>,
    document.body,
  );
}
