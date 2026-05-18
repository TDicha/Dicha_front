import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function SignupCompleteStep() {
  return (
    <main className="flex-1 px-4 pb-10 pt-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-[6.25rem] items-center justify-center rounded-full bg-[var(--surface-cream)]">
          <span className="text-[3.1rem]">🐎</span>
        </div>
        <h2 className="mt-8 font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--text-ink)]">
          가입이 완료되었습니다!
        </h2>
      </div>

      <div className="mt-8 rounded-[1rem] bg-[var(--brand-primary)] px-5 py-4 text-[var(--text-inverse)]">
        <p className="text-sm">커피 취향 테스트로 나에게 맞는 원두를 찾아보세요!</p>
        <div className="mt-4 flex justify-end">
          <Link
            className="rounded-[0.75rem] bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-[var(--brand-primary)]"
            to={ROUTES.tasteTest}
          >
            테스트 →
          </Link>
        </div>
      </div>

      <PrimaryButton asChild className="mt-8 h-12 w-full rounded-[0.95rem]">
        <Link to={ROUTES.login}>로그인하기</Link>
      </PrimaryButton>
    </main>
  );
}
