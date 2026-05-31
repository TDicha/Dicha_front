import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { BrandWatermark } from "@/components/common/BrandWatermark";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function NotFoundCard() {
  return (
    <AppCard
      className="relative w-full overflow-hidden rounded-[2rem] px-6 py-10 shadow-[0_20px_36px_var(--shadow-ink-alpha-8)]"
      padding="none"
    >
      <BrandWatermark className="absolute -right-12 top-6 size-48 opacity-[0.07] mix-blend-multiply" />
      <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--surface-brand-tint-8)]">
        <Compass className="size-8 text-[var(--brand-primary)]" />
      </div>
      <p className="relative mt-5 text-xs uppercase tracking-[0.32em] text-[var(--brand-accent)]">
        404
      </p>
      <h1 className="relative mt-3 font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--brand-primary)]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="relative mx-auto mt-3 max-w-xs text-sm leading-6 text-[var(--text-muted)]">
        요청하신 경로가 변경되었거나 더 이상 존재하지 않아요. 홈으로 돌아가서
        다시 탐색해 보세요.
      </p>
      <PrimaryButton asChild className="relative mt-6 w-full">
        <Link to={ROUTES.home}>
          <Home className="size-4" />
          홈으로 돌아가기
        </Link>
      </PrimaryButton>
    </AppCard>
  );
}
