import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import {
  LoginBrandHeader,
  LoginEmailForm,
  LoginHelpLinks,
} from "@/features/auth";
import { GuestOrderLookupPanel } from "@/features/orders";
import { ROUTES } from "@/shared/constants/routes";

type LoginTab = "login" | "guest";

interface LoginLocationState {
  from?: string;
  orderNo?: string;
  phone?: string;
}

const tabs: { key: LoginTab; label: string }[] = [
  { key: "login", label: "로그인" },
  { key: "guest", label: "비회원 주문조회" },
];

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const locationState = (location.state ?? {}) as LoginLocationState;

  const signIn = useAuthStore((state) => state.signIn);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const activeTab: LoginTab =
    searchParams.get("tab") === "guest" ? "guest" : "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(true);

  useEffect(() => clearError, [clearError]);

  function selectTab(tab: LoginTab) {
    setSearchParams(tab === "guest" ? { tab: "guest" } : {}, { replace: true });
  }

  async function handleLogin() {
    const isSuccess = await signIn({ email, password });

    if (isSuccess) {
      const from =
        typeof locationState.from === "string" ? locationState.from : ROUTES.home;
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
        <h1 className="font-semibold text-[var(--text-ink)]">
          {activeTab === "guest" ? "비회원 주문조회" : "로그인"}
        </h1>
        <div className="size-8" />
      </header>

      <main className="flex flex-1 flex-col items-center px-[var(--page-x)] pb-10 pt-6">
        <div className="w-full max-w-[22rem]">
          <LoginBrandHeader />

          <div
            className="mb-7 mt-8 grid grid-cols-2 rounded-[0.9rem] bg-[var(--surface-cafe-tile)] p-1"
            role="tablist"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  aria-selected={isActive}
                  className={[
                    "rounded-[0.7rem] py-2.5 text-sm font-semibold transition",
                    isActive
                      ? "bg-[var(--surface-base)] text-[var(--text-ink)] shadow-[0_4px_12px_var(--shadow-neutral-alpha-6)]"
                      : "text-[var(--text-muted)]",
                  ].join(" ")}
                  onClick={() => selectTab(tab.key)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "login" ? (
            <>
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
            </>
          ) : (
            <GuestOrderLookupPanel
              initialOrderNo={locationState.orderNo}
              initialPhone={locationState.phone}
            />
          )}
        </div>
      </main>
    </div>
  );
}
