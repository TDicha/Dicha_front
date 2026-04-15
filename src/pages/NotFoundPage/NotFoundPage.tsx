import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function NotFoundPage() {
  return (
    <div className="page-shell items-center justify-center bg-white px-5 py-10 text-center">
      <AppCard className="w-full rounded-[2rem] px-6 py-10 shadow-[0_20px_36px_rgba(31,37,31,0.08)]" padding="none">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[rgba(29,62,43,0.08)]">
          <Compass className="size-8 text-[var(--color-primary-green)]" />
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.32em] text-[var(--color-accent-gold)]">404</p>
        <h1 className="mt-3 font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
          요청하신 경로가 변경되었거나 더 이상 존재하지 않아요. 홈으로 돌아가서 다시 탐색해 보세요.
        </p>
        <PrimaryButton asChild className="mt-6 w-full">
          <Link to={ROUTES.home}>
            <Home className="size-4" />
            홈으로 돌아가기
          </Link>
        </PrimaryButton>
      </AppCard>
    </div>
  );
}
