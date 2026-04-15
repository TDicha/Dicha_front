import { ArrowRight, Coffee, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [email, setEmail] = useState("wooseok@dicha.coffee");
  const [password, setPassword] = useState("password123");

  useEffect(() => clearError, [clearError]);

  async function handleLogin() {
    const isSuccess = await signIn({ email, password });

    if (isSuccess) {
      navigate(ROUTES.home);
    }
  }

  return (
    <div className="page-shell justify-center bg-white px-5 py-8">
      <section className="overflow-hidden rounded-[2rem] border border-[rgba(17,24,39,0.06)] bg-white shadow-[0_20px_36px_rgba(31,37,31,0.08)]">
        <div className="bg-[linear-gradient(135deg,#1f4b37_0%,#143726_100%)] px-6 py-7 text-white">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/10">
            <Coffee className="size-6 text-[#f1d08b]" />
          </div>
          <p className="mt-4 text-xs font-semibold tracking-[0.24em] text-white/70">WELCOME BACK</p>
          <h1 className="mt-2 font-heading text-[2rem] font-semibold tracking-[-0.04em]">
            향으로 기억되는
            <br />
            DICHA 로그인
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/80">
            주문 조회, 구독 관리, 저장한 블렌드를 하나의 계정에서 이어보세요.
          </p>
        </div>

        <div className="space-y-4 px-6 py-6">
          <label className="block space-y-2">
            <span className="text-sm text-[var(--color-muted)]">이메일</span>
            <div className="flex items-center gap-3 rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3">
              <Mail className="size-4 text-[var(--color-muted)]" />
              <input
                className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--color-muted)]"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="wooseok@dicha.coffee"
                value={email}
              />
            </div>
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-[var(--color-muted)]">비밀번호</span>
            <div className="flex items-center gap-3 rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3">
              <LockKeyhole className="size-4 text-[var(--color-muted)]" />
              <input
                className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--color-muted)]"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호 입력"
                type="password"
                value={password}
              />
            </div>
          </label>

          {error ? (
            <div className="rounded-[1rem] bg-[rgba(148,35,30,0.04)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[var(--color-muted)]">
              <input className="rounded border-[rgba(17,24,39,0.12)]" type="checkbox" />
              로그인 유지
            </label>
            <button className="font-medium text-[var(--color-primary-green)]" type="button">
              비밀번호 찾기
            </button>
          </div>

          <PrimaryButton className="w-full" disabled={isPending} onClick={handleLogin}>
            {isPending ? "로그인 중..." : "로그인"}
            <ArrowRight className="size-4" />
          </PrimaryButton>

          <p className="text-center text-sm text-[var(--color-muted)]">
            아직 계정이 없나요?{" "}
            <Link className="font-semibold text-[var(--color-primary-green)]" to={ROUTES.signup}>
              회원가입
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
