import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function MyBlendEmptyState() {
  return (
    <div className="bg-white px-5 pb-10 pt-4">
      <section className="px-1 pb-10 pt-28 text-center">
        <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-[var(--palette-dde7d6)]">
          <div className="text-[4rem]">☕</div>
        </div>
        <h2 className="mt-10 text-[2.1rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          저장된 블렌드가 없습니다
        </h2>
        <p className="mt-4 text-[1.15rem] leading-8 text-[var(--palette-6d6a64)]">
          상품 주문 시 '나의 블렌드로 저장'을
          <br />
          눌러 나만의 레시피를 보관해 보세요!
        </p>
      </section>

      <section className="rounded-[1.5rem] bg-[var(--palette-f5f0e7)] px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-[0.4rem] bg-[var(--palette-cfa54f)] p-1 text-[var(--palette-fffaf1)]">
            <QrCode className="size-4" />
          </div>
          <div>
            <h3 className="text-[1.45rem] font-bold tracking-[-0.03em] text-[var(--palette-21422f)]">
              매장 QR로도 저장 가능!
            </h3>
            <p className="mt-2 text-[1rem] text-[var(--palette-6d6a64)]">
              매장에서 받은 QR을 스캔하면 자동 저장돼요
            </p>
          </div>
        </div>
      </section>

      <PrimaryButton
        asChild
        className="mt-8 h-16 w-full rounded-[1.2rem] text-[1.2rem] shadow-none"
      >
        <Link to={ROUTES.products}>원두 쇼핑하러 가기</Link>
      </PrimaryButton>
    </div>
  );
}
