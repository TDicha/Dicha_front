import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function PurchaseEmptyState() {
  return (
    <div className="bg-[var(--surface-base)] px-[var(--page-x)] py-12">
      <div className="rounded-[1.6rem] border border-[var(--border-list)] bg-[var(--surface-card-muted)] px-[var(--page-x)] py-8 text-center">
        <h2 className="break-keep text-[clamp(1.45rem,6vw,1.7rem)] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          구매할 상품이 없습니다
        </h2>
        <p className="mt-3 text-[1rem] text-[var(--text-muted-warm)]">장바구니에서 상품을 먼저 선택해주세요.</p>
        <PrimaryButton asChild className="mt-8 h-14 w-full rounded-[1.15rem] shadow-none">
          <Link to={ROUTES.cart}>장바구니로 이동</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
