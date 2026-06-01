import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import {
  LoginBrandHeader,
  LoginEmailForm,
  LoginHelpLinks,
} from "@/features/auth";
import { ROUTES } from "@/shared/constants/routes";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useAuthStore((state) => state.signIn);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="page-shell bg-[var(--surface-base)]">
      <header className="flex h-[3.25rem] items-center justify-between px-[var(--page-x)]">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center rounded-full text-[var(--text-ink)]"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-semibold text-[var(--text-ink)]">로그인</h1>
        <div className="size-8" />
      </header>

      <main className="flex flex-1 flex-col items-center px-[var(--page-x)] pb-10 pt-8">
        <div className="w-full max-w-[22rem]">
          <LoginBrandHeader />
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
