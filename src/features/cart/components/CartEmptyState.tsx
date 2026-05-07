import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { CartRecommendedProducts } from "@/features/cart/components/CartRecommendedProducts";
import { ROUTES } from "@/shared/constants/routes";

export function CartEmptyState() {
  return (
    <div className="bg-white pb-10">
      <section className="px-6 pb-14 pt-12 text-center">
        <div className="mx-auto flex size-36 items-center justify-center rounded-full bg-[var(--palette-f2efea)] text-[3.7rem]">
          <ShoppingCart className="size-16 stroke-[1.4] text-[var(--palette-8f8a81)]" />
        </div>
        <h2 className="mt-8 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-666666)]">
          장바구니가 비어있어요
        </h2>
        <p className="mt-3 text-[1.05rem] text-[var(--palette-777777)]">마음에 드는 원두를 담아보세요</p>

        <PrimaryButton asChild className="mt-10 h-16 w-full rounded-[1.35rem] text-xl shadow-none">
          <Link to={ROUTES.products}>지금 쇼핑하러 가기</Link>
        </PrimaryButton>
      </section>

      <CartRecommendedProducts />
    </div>
  );
}
