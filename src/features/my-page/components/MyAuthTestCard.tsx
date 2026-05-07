import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { ROUTES } from "@/shared/constants/routes";

interface MyAuthTestCardProps {
  onSignOut: () => void;
}

export function MyAuthTestCard({ onSignOut }: MyAuthTestCardProps) {
  return (
    <AppCard variant="muted">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            인증 화면 확인
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
            현재는 mock 로그인 상태라서 필요할 때 직접 로그인/회원가입
            화면으로 이동해 테스트할 수 있어요.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          className="rounded-[1rem] border border-[var(--rgba-17-24-39-008)] bg-white px-4 py-3 text-center text-sm font-medium text-[var(--color-primary-green)]"
          to={ROUTES.login}
        >
          로그인 보기
        </Link>
        <Link
          className="rounded-[1rem] border border-[var(--rgba-17-24-39-008)] bg-white px-4 py-3 text-center text-sm font-medium text-[var(--color-primary-green)]"
          to={ROUTES.signup}
        >
          회원가입 보기
        </Link>
      </div>
      <button
        className="mt-3 w-full rounded-[1rem] bg-[var(--color-primary-green)] px-4 py-3 text-sm font-semibold text-white"
        onClick={onSignOut}
        type="button"
      >
        로그아웃 후 로그인 테스트하기
      </button>
    </AppCard>
  );
}
