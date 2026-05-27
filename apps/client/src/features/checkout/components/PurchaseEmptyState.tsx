import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function PurchaseEmptyState() {
  return (
    <div className="cafe-tile-bg min-h-full py-12">
      <div className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-8 text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Checkout
        </p>
        <h2 className="mt-2 break-keep text-[clamp(1.45rem,6vw,1.7rem)] font-bold tracking-[-0.04em] text-[var(--text-cafe-ink)]">
          구매할 상품이 없습니다
        </h2>
        <p className="mt-3 text-[1rem] text-[var(--text-muted-warm)]">장바구니에서 상품을 먼저 선택해주세요.</p>
        <PrimaryButton
          asChild
          className="mt-8 h-14 w-full rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
        >
          <Link to={ROUTES.cart}>장바구니로 이동</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
