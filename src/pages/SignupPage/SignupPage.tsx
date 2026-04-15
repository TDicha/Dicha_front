import { ArrowRight, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { AuthField } from "@/components/common/AuthField";
import { AuthShell } from "@/components/common/AuthShell";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function SignupPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [name, setName] = useState("우석");
  const [email, setEmail] = useState("wooseok@dicha.coffee");
  const [password, setPassword] = useState("password123");

  useEffect(() => clearError, [clearError]);

  async function handleSignup() {
    const isSuccess = await signUp({ name, email, password });

    if (isSuccess) {
      navigate(ROUTES.home);
    }
  }

  return (
    <AuthShell
      badge="CREATE ACCOUNT"
      description="회원가입 후 취향 테스트, 주문 내역, 구독과 저장한 블렌드를 편하게 이어보세요."
      icon={<ShieldCheck className="size-6" />}
      title={
        <>
          DICHA와 함께
          <br />
          취향을 시작해요
        </>
      }
      tone="red"
    >
      <AuthField
        icon={<UserRound className="size-4 text-[var(--color-muted)]" />}
        label="이름"
        onChange={(event) => setName(event.target.value)}
        placeholder="이름 입력"
        value={name}
      />
      <AuthField
        icon={<Mail className="size-4 text-[var(--color-muted)]" />}
        label="이메일"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="name@dicha.coffee"
        value={email}
      />
      <AuthField
        label="비밀번호"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="8자 이상 입력"
        type="password"
        value={password}
      />

      <div className="rounded-[1rem] bg-[rgba(148,35,30,0.04)] px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
        가입하면 주문 알림, 구독 배송 안내, 맞춤 추천을 받을 수 있어요.
      </div>

      {error ? (
        <div className="rounded-[1rem] bg-[rgba(148,35,30,0.04)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
          {error}
        </div>
      ) : null}

      <PrimaryButton
        className="w-full bg-[var(--color-primary-red)] hover:bg-[color:rgba(148,35,30,0.92)]"
        disabled={isPending}
        onClick={handleSignup}
      >
        {isPending ? "가입 중..." : "회원가입"}
        <ArrowRight className="size-4" />
      </PrimaryButton>

      <p className="text-center text-sm text-[var(--color-muted)]">
        이미 계정이 있나요?{" "}
        <Link className="font-semibold text-[var(--color-primary-red)]" to={ROUTES.login}>
          로그인
        </Link>
      </p>
    </AuthShell>
  );
}
