import { ArrowLeft, Mail, Search, ShieldCheck } from "lucide-react";
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
  const [rememberId, setRememberId] = useState(true);

  useEffect(() => clearError, [clearError]);

  async function handleLogin() {
    const isSuccess = await signIn({ email, password });

    if (isSuccess) {
      navigate(ROUTES.home);
    }
  }

  return (
    <div className="page-shell bg-white">
      <header className="flex h-[3.25rem] items-center justify-between px-5">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center rounded-full text-[var(--color-ink)]"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-semibold text-[var(--color-ink)]">로그인</h1>
        <div className="size-8" />
      </header>

      <main className="flex-1 px-5 pb-10 pt-8">
        <div className="mx-auto max-w-[22rem]">
          <div className="flex flex-col items-center text-center">
            <div className="flex size-[5.5rem] items-center justify-center rounded-full bg-[#f4ecda] shadow-[inset_0_0_0_10px_rgba(255,255,255,0.65)]">
              <span className="text-[3.1rem]">🐎</span>
            </div>
            <h2 className="mt-4 font-heading text-[2.15rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
              DICHA
            </h2>
            <p className="mt-1 text-sm text-[#9a9a9a]">한 잔의 커피, 향으로 기억되다</p>
          </div>

          <div className="mt-7 space-y-3">
            <button
              className="flex h-12 w-full items-center rounded-[0.85rem] bg-[#fee500] px-6 text-[0.95rem] font-semibold text-[#121212]"
              type="button"
            >
              <span className="mr-2 text-base">💬</span>
              카카오로 시작하기
            </button>
            <button
              className="flex h-12 w-full items-center rounded-[0.85rem] bg-[#03c75a] px-6 text-[0.95rem] font-semibold text-white"
              type="button"
            >
              <span className="mr-2 text-sm font-bold">N</span>
              네이버로 시작하기
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8e8e8]" />
            <span className="text-[0.82rem] text-[#a0a0a0]">또는</span>
            <div className="h-px flex-1 bg-[#e8e8e8]" />
          </div>

          <div className="mt-6 space-y-3">
            <label className="block">
              <span className="sr-only">이메일 주소</span>
              <div className="flex h-12 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-white px-4">
                <Mail className="mr-3 size-4 text-[#b0b0b0]" />
                <input
                  className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#a0a0a0]"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="이메일 주소 입력"
                  value={email}
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">비밀번호</span>
              <div className="flex h-12 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-white px-4">
                <ShieldCheck className="mr-3 size-4 text-[#b0b0b0]" />
                <input
                  className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#a0a0a0]"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호 입력"
                  type="password"
                  value={password}
                />
              </div>
            </label>
          </div>

          <label className="mt-4 flex items-center gap-2 text-[0.82rem] text-[#666]">
            <input
              checked={rememberId}
              className="size-4 rounded-[4px] border border-[#d1d1d1]"
              onChange={() => setRememberId((current) => !current)}
              type="checkbox"
            />
            아이디 저장
          </label>

          {error ? (
            <div className="mt-4 rounded-[0.95rem] bg-[rgba(148,35,30,0.05)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
              {error}
            </div>
          ) : null}

          <PrimaryButton className="mt-4 h-12 w-full rounded-[0.85rem]" disabled={isPending} onClick={handleLogin}>
            {isPending ? "로그인 중..." : "로그인"}
          </PrimaryButton>

          <div className="mt-5 flex items-center justify-center gap-3 text-[0.82rem] text-[#666]">
            <button className="type-button" type="button">
              아이디 찾기
            </button>
            <span className="h-3.5 w-px bg-[#cccccc]" />
            <button className="type-button" type="button">
              비밀번호 찾기
            </button>
            <span className="h-3.5 w-px bg-[#cccccc]" />
            <Link className="font-medium text-[var(--color-primary-green)]" to={ROUTES.signup}>
              회원가입
            </Link>
          </div>

          <Link
            className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--color-muted)]"
            to={ROUTES.search}
          >
            <Search className="size-4" />
            둘러보기로 계속하기
          </Link>
        </div>
      </main>
    </div>
  );
}
