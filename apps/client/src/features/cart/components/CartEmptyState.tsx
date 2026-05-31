import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { CartRecommendedProducts } from "@/features/cart/components/CartRecommendedProducts";
import { ROUTES } from "@/shared/constants/routes";

export function CartEmptyState() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10">
      <section className="px-[var(--page-x)] py-6">
        <EmptyState
          action={
            <PrimaryButton
              asChild
              className="h-12 w-full rounded-none bg-[var(--surface-chalkboard)] text-base text-[var(--text-chalk)] shadow-none"
            >
              <Link to={ROUTES.products}>지금 쇼핑하러 가기</Link>
            </PrimaryButton>
          }
          className="rounded-none"
          description="마음에 드는 원두를 담아보세요."
          eyebrow="Shopping Cart"
          title="장바구니가 비어있어요"
          variant="menu-board"
        />
      </section>

      <CartRecommendedProducts />
    </div>
  );
}
