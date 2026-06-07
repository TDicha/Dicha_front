import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

interface ProductDetailHeaderProps {
  itemCount: number;
  onBack: () => void;
}

export function ProductDetailHeader({
  itemCount,
  onBack,
}: ProductDetailHeaderProps) {
  return (
    <header className=" sticky top-0 z-30 flex h-[var(--header-height)] items-center justify-between px-[var(--page-x)]">
      <button
        aria-label="뒤로가기"
        className="flex size-9 items-center justify-center bg-[var(--surface-menu-board)] text-[var(--text-cafe-ink)]"
        onClick={onBack}
        type="button"
      >
        <ChevronLeft className="size-5" />
      </button>
      <Link
        aria-label="장바구니로 이동"
        className="relative flex size-9 items-center justify-center bg-[var(--surface-menu-board)] text-[var(--text-cafe-ink)]"
        to={ROUTES.cart}
      >
        <ShoppingCart className="size-5" />
        <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center bg-[var(--surface-chalkboard)] px-1 text-[9px] font-bold text-[var(--text-chalk)]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      </Link>
    </header>
  );
}
