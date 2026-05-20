import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { CartRecommendedProducts } from "@/features/cart/components/CartRecommendedProducts";
import { ROUTES } from "@/shared/constants/routes";

export function CartEmptyState() {
  return (
    <div className="bg-[var(--surface-base)] pb-10">
      <section className="px-[var(--page-x)] pb-14 pt-12 text-center">
        <div className="mx-auto flex size-[clamp(7.5rem,36vw,9rem)] items-center justify-center rounded-full bg-[var(--surface-control-muted)] text-[3.7rem]">
          <ShoppingCart className="size-[clamp(3.5rem,16vw,4rem)] stroke-[1.4] text-[var(--icon-empty)]" />
        </div>
        <h2 className="mt-8 break-keep text-[clamp(1.65rem,7vw,2rem)] font-bold tracking-[-0.04em] text-[var(--text-muted-subtle)]">
          장바구니가 비어있어요
        </h2>
        <p className="mt-3 text-[1.05rem] text-[var(--text-empty-muted)]">마음에 드는 원두를 담아보세요</p>

        <PrimaryButton asChild className="mt-10 h-14 w-full rounded-[1.2rem] text-[1.05rem] shadow-none min-[380px]:h-16 min-[380px]:rounded-[1.35rem] min-[380px]:text-xl">
          <Link to={ROUTES.products}>지금 쇼핑하러 가기</Link>
        </PrimaryButton>
      </section>

      <CartRecommendedProducts />
    </div>
  );
}
