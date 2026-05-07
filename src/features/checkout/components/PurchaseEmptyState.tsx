import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function PurchaseEmptyState() {
  return (
    <div className="bg-white px-6 py-12">
      <div className="rounded-[1.6rem] border border-[var(--palette-ebe6dd)] bg-[var(--palette-faf8f4)] px-6 py-8 text-center">
        <h2 className="text-[1.7rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          구매할 상품이 없습니다
        </h2>
        <p className="mt-3 text-[1rem] text-[var(--palette-6d6a64)]">장바구니에서 상품을 먼저 선택해주세요.</p>
        <PrimaryButton asChild className="mt-8 h-14 w-full rounded-[1.15rem] shadow-none">
          <Link to={ROUTES.cart}>장바구니로 이동</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
