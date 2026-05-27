import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { CartRecommendedProducts } from "@/features/cart/components/CartRecommendedProducts";
import { ROUTES } from "@/shared/constants/routes";

export function CartEmptyState() {
  return (
    <div className="cafe-tile-bg min-h-full pb-10">
      <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] pb-14 pt-12 text-center">
        <div className="mx-auto flex size-[clamp(7.5rem,36vw,9rem)] items-center justify-center bg-[var(--surface-cafe-tile)] text-[3.7rem]">
          <ShoppingCart className="size-[clamp(3.5rem,16vw,4rem)] stroke-[1.4] text-[var(--text-cafe-ink)]" />
        </div>
        <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Shopping Cart
        </p>
        <h2 className="mt-2 break-keep text-[clamp(1.4rem,6vw,1.65rem)] font-bold text-[var(--text-cafe-ink)]">
          장바구니가 비어있어요
        </h2>
        <p className="mt-3 text-base text-[var(--text-muted)]">마음에 드는 원두를 담아보세요</p>

        <PrimaryButton
          asChild
          className="mt-8 h-12 w-full rounded-none bg-[var(--surface-chalkboard)] text-base text-[var(--text-chalk)] shadow-none"
        >
          <Link to={ROUTES.products}>지금 쇼핑하러 가기</Link>
        </PrimaryButton>
      </section>

      <CartRecommendedProducts />
    </div>
  );
}
