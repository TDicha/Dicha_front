import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function MyBlendEmptyState() {
  return (
    <div className="bg-[var(--surface-base)] px-[var(--page-x)] pb-10 pt-4">
      <section className="px-1 pb-8 pt-14 text-center">
        <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-[var(--surface-green-muted)]">
          <div className="text-[4rem]">☕</div>
        </div>
        <h2 className="mt-8 text-[clamp(1.45rem,6vw,1.7rem)] font-bold text-[var(--text-heading)]">
          저장된 블렌드가 없습니다
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--text-muted-warm)]">
          상품 주문 시 '나의 블렌드로 저장'을
          <br />
          눌러 나만의 레시피를 보관해 보세요!
        </p>
      </section>

      <section className="rounded-[var(--radius-card)] bg-[var(--surface-warm-page)] px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-[0.4rem] bg-[var(--brand-accent-strong)] p-1 text-[var(--surface-cream-light)]">
            <QrCode className="size-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--brand-primary-soft)]">
              매장 QR로도 저장 가능!
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted-warm)]">
              매장에서 받은 QR을 스캔하면 자동 저장돼요
            </p>
          </div>
        </div>
      </section>

      <PrimaryButton
        asChild
        className="mt-8 h-12 w-full text-base shadow-none"
      >
        <Link to={ROUTES.products}>원두 쇼핑하러 가기</Link>
      </PrimaryButton>
    </div>
  );
}
