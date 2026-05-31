import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function PurchaseEmptyState() {
  return (
    <div className="cafe-tile-bg min-h-full px-[var(--page-x)] py-12">
      <EmptyState
        action={
          <PrimaryButton
            asChild
            className="h-14 w-full rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
          >
            <Link to={ROUTES.cart}>장바구니로 이동</Link>
          </PrimaryButton>
        }
        className="rounded-none"
        description="장바구니에서 상품을 먼저 선택해주세요."
        eyebrow="Checkout"
        title="구매할 상품이 없습니다"
        variant="menu-board"
      />
    </div>
  );
}
