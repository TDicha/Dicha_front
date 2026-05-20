import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

interface ProductDetailHeaderProps {
  itemCount: number;
  onBack: () => void;
}

export function ProductDetailHeader({ itemCount, onBack }: ProductDetailHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-4">
      <button
        aria-label="뒤로가기"
        className="flex size-8 items-center justify-center text-[var(--text-title)]"
        onClick={onBack}
        type="button"
      >
        <ChevronLeft className="size-5" />
      </button>
      <Link
        aria-label="장바구니로 이동"
        className="relative flex size-8 items-center justify-center text-[var(--text-title)]"
        to={ROUTES.cart}
      >
        <ShoppingCart className="size-5" />
        <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[var(--state-danger)] text-[0.45rem] font-bold text-[var(--text-inverse)]">
          {itemCount}
        </span>
      </Link>
    </header>
  );
}
