import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import {
  LoginBrandHeader,
  LoginEmailForm,
  LoginHelpLinks,
  LoginSocialButtons,
} from "@/features/auth";
import { ROUTES } from "@/shared/constants/routes";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
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
      const from = typeof location.state?.from === "string" ? location.state.from : ROUTES.home;
      navigate(from, { replace: true });
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
          <LoginBrandHeader />
          <LoginSocialButtons />
          <LoginEmailForm
            email={email}
            error={error}
            isPending={isPending}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
            onLogin={handleLogin}
            onToggleRememberId={() => setRememberId((current) => !current)}
            password={password}
            rememberId={rememberId}
          />
          <LoginHelpLinks />
        </div>
      </main>
    </div>
  );
}
