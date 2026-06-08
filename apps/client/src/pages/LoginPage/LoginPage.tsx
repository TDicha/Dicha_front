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
import { findEmail, findPassword } from "@/services/auth/authService";
import { ROUTES } from "@/shared/constants/routes";

type LoginTab = "login" | "guest";
type HelpMode = "find-email" | "find-password" | null;

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
  const [helpMode, setHelpMode] = useState<HelpMode>(null);
  const [findName, setFindName] = useState("");
  const [findPhone, setFindPhone] = useState("");
  const [findEmailValue, setFindEmailValue] = useState("");
  const [helpResult, setHelpResult] = useState<string | null>(null);
  const [helpError, setHelpError] = useState<string | null>(null);
  const [helpPending, setHelpPending] = useState(false);

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

  async function handleFindSubmit() {
    setHelpPending(true);
    setHelpError(null);
    setHelpResult(null);

    try {
      if (helpMode === "find-email") {
        const maskedEmail = await findEmail({
          name: findName.trim(),
          phoneNumber: findPhone.trim(),
        });
        setHelpResult(`가입 이메일: ${maskedEmail}`);
      }

      if (helpMode === "find-password") {
        const message = await findPassword({
          email: findEmailValue.trim(),
          name: findName.trim(),
        });
        setHelpResult(message);
      }
    } catch {
      setHelpError("입력한 정보를 다시 확인해 주세요.");
    } finally {
      setHelpPending(false);
    }
  }

  function openHelp(mode: Exclude<HelpMode, null>) {
    setHelpMode(mode);
    setHelpResult(null);
    setHelpError(null);
    setFindName("");
    setFindPhone("");
    setFindEmailValue(mode === "find-password" ? email : "");
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
                    "motion-static rounded-[0.7rem] py-2.5 text-sm font-semibold",
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
              <LoginHelpLinks
                onFindEmail={() => openHelp("find-email")}
                onFindPassword={() => openHelp("find-password")}
              />
              {helpMode ? (
                <div className="mt-5 rounded-[1rem] bg-[var(--surface-cafe-tile)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-bold text-[var(--text-cafe-ink)]">
                      {helpMode === "find-email"
                        ? "아이디 찾기"
                        : "비밀번호 찾기"}
                    </h2>
                    <button
                      className="text-xs text-[var(--text-muted)]"
                      onClick={() => setHelpMode(null)}
                      type="button"
                    >
                      닫기
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2">
                    <input
                      className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                      onChange={(event) => setFindName(event.target.value)}
                      placeholder="이름"
                      value={findName}
                    />
                    {helpMode === "find-email" ? (
                      <input
                        className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                        onChange={(event) => setFindPhone(event.target.value)}
                        placeholder="연락처"
                        value={findPhone}
                      />
                    ) : (
                      <input
                        className="h-11 rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-3 text-sm text-[var(--brand-primary)]"
                        onChange={(event) => setFindEmailValue(event.target.value)}
                        placeholder="이메일"
                        value={findEmailValue}
                      />
                    )}
                  </div>
                  {helpResult ? (
                    <p className="mt-3 text-sm font-medium text-[var(--brand-primary)]">
                      {helpResult}
                    </p>
                  ) : null}
                  {helpError ? (
                    <p className="mt-3 text-sm text-[var(--state-danger)]">
                      {helpError}
                    </p>
                  ) : null}
                  <button
                    className="mt-3 h-11 w-full rounded-[0.85rem] bg-[var(--brand-primary)] text-sm font-semibold text-[var(--text-chalk)]"
                    disabled={helpPending}
                    onClick={() => void handleFindSubmit()}
                    type="button"
                  >
                    {helpPending ? "확인 중" : "확인"}
                  </button>
                </div>
              ) : null}
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
