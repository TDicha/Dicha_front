import { ArrowLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

type SignupStep = "terms" | "details" | "complete";

export function SignupPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [step, setStep] = useState<SignupStep>("terms");
  const [agreements, setAgreements] = useState({
    terms: true,
    privacy: true,
    age: true,
    marketing: false,
  });
  const [email, setEmail] = useState("wooseok@dicha.coffee");
  const [password, setPassword] = useState("password123");
  const [passwordConfirm, setPasswordConfirm] = useState("password123");
  const [name, setName] = useState("우석");
  const [phone, setPhone] = useState("010-0000-0000");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailChecked, setEmailChecked] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(true);

  useEffect(() => clearError, [clearError]);

  const allRequiredChecked = agreements.terms && agreements.privacy && agreements.age;
  const agreementRows = [
    { key: "terms", label: "[필수] 서비스 이용약관 동의", required: true },
    { key: "privacy", label: "[필수] 개인정보 수집·이용 동의", required: true },
    { key: "age", label: "[필수] 만 14세 이상 확인", required: true },
    { key: "marketing", label: "[선택] 마케팅 정보 수신 동의", required: false },
  ] as const;

  const passwordChecks = useMemo(
    () => ({
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasLength: password.length >= 8,
    }),
    [password],
  );

  async function handleSubmitDetails() {
    const isSuccess = await signUp({ name, email, password });

    if (isSuccess) {
      setStep("complete");
    }
  }

  function toggleAgreement(key: keyof typeof agreements) {
    setAgreements((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleAllAgreement() {
    const nextValue = !Object.values(agreements).every(Boolean);
    setAgreements({
      terms: nextValue,
      privacy: nextValue,
      age: nextValue,
      marketing: nextValue,
    });
  }

  function renderTopBar(progress: 1 | 2 | 3) {
    return (
      <>
        <header className="flex h-[3.25rem] items-center justify-between px-5">
          <button
            aria-label="뒤로가기"
            className="flex size-8 items-center justify-center rounded-full text-[var(--color-ink)]"
            onClick={() => {
              if (step === "terms") navigate(-1);
              else if (step === "details") setStep("terms");
              else navigate(ROUTES.login);
            }}
            type="button"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="font-semibold text-[var(--color-ink)]">회원가입</h1>
          <div className="size-8" />
        </header>
        <div className="h-1 w-full bg-[#f5f5f5]">
          <div
            className="h-1 bg-[var(--color-primary-green)] transition-all"
            style={{ width: `${(progress / 3) * 100}%` }}
          />
        </div>
      </>
    );
  }

  if (step === "terms") {
    return (
      <div className="page-shell bg-white">
        {renderTopBar(1)}
        <main className="flex-1 px-5 pb-10 pt-4">
          <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            약관 동의
          </h2>
          <p className="mt-2 text-sm text-[#666]">서비스 이용을 위해 약관에 동의해 주세요</p>

          <button
            className="mt-8 flex h-14 w-full items-center rounded-[0.95rem] bg-[var(--color-bg-ivory)] px-4 text-left"
            onClick={toggleAllAgreement}
            type="button"
          >
            <span
              className={[
                "mr-3 flex size-5 items-center justify-center rounded-[4px] border text-[11px] font-bold",
                Object.values(agreements).every(Boolean)
                  ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                  : "border-[#cccccc] bg-white text-transparent",
              ].join(" ")}
            >
              ✓
            </span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">전체 동의</span>
          </button>

          <div className="mt-3 divide-y divide-[rgba(232,232,232,0.7)]">
            {agreementRows.map((row) => (
              <button
                key={row.key}
                className="flex w-full items-center justify-between py-4 text-left"
                onClick={() => toggleAgreement(row.key)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "flex size-5 items-center justify-center rounded-[4px] border text-[11px] font-bold",
                      agreements[row.key]
                        ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                        : "border-[#cccccc] bg-white text-transparent",
                    ].join(" ")}
                  >
                    ✓
                  </span>
                  <span className="text-sm text-[#333333]">{row.label}</span>
                </div>
                <ChevronRight className="size-4 text-[#cccccc]" />
              </button>
            ))}
          </div>

          <PrimaryButton className="mt-8 h-12 w-full rounded-[0.95rem]" disabled={!allRequiredChecked} onClick={() => setStep("details")}>
            다음
          </PrimaryButton>
        </main>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="page-shell bg-white">
        {renderTopBar(2)}
        <main className="flex-1 px-5 pb-10 pt-4">
          <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            정보 입력
          </h2>
          <p className="mt-2 text-sm text-[#666]">회원 정보를 입력해 주세요</p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">이메일 *</p>
              <div className="flex gap-2">
                <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-[#f8f8f8] px-4">
                  <input
                    className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setEmailChecked(false);
                    }}
                    placeholder="example@email.com"
                    value={email}
                  />
                </div>
                <button
                  className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-4 text-xs font-semibold text-white"
                  onClick={() => setEmailChecked(true)}
                  type="button"
                >
                  중복확인
                </button>
              </div>
              {emailChecked ? (
                <p className="mt-2 text-xs text-[var(--color-primary-green)]">사용 가능한 이메일입니다</p>
              ) : null}
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">비밀번호 *</p>
              <div className="flex h-11 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-[#f8f8f8] px-4">
                <input
                  className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="영문, 숫자 포함 8자 이상"
                  type="password"
                  value={password}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
                {[
                  { label: "영문 포함", passed: passwordChecks.hasLetter },
                  { label: "숫자 포함", passed: passwordChecks.hasNumber },
                  { label: "8자 이상", passed: passwordChecks.hasLength },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={item.passed ? "text-[var(--color-primary-green)]" : "text-[#999]"}
                  >
                    ● {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">비밀번호 확인 *</p>
              <div className="flex h-11 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-[#f8f8f8] px-4">
                <input
                  className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  type="password"
                  value={passwordConfirm}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">이름 *</p>
              <div className="flex h-11 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-[#f8f8f8] px-4">
                <input
                  className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="홍길동"
                  value={name}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">휴대폰 번호 *</p>
              <div className="flex gap-2">
                <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border border-[#e8e8e8] bg-[#f8f8f8] px-4">
                  <input
                    className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setPhoneVerified(false);
                    }}
                    placeholder="010-0000-0000"
                    value={phone}
                  />
                </div>
                <button
                  className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-4 text-xs font-semibold text-white"
                  onClick={() => setPhoneVerified(false)}
                  type="button"
                >
                  인증요청
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-[#666]">인증번호 *</p>
              <div className="flex gap-2">
                <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border-[1.5px] border-[var(--color-primary-green)] bg-white px-4">
                  <input
                    className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[#999]"
                    onChange={(event) => setVerificationCode(event.target.value)}
                    placeholder="인증번호 입력"
                    value={verificationCode}
                  />
                  <span className="font-heading text-sm font-semibold text-[var(--color-primary-red)]">02:58</span>
                </div>
                <button
                  className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-5 text-sm font-semibold text-white"
                  onClick={() => setPhoneVerified(true)}
                  type="button"
                >
                  확인
                </button>
              </div>
              {phoneVerified ? (
                <p className="mt-2 text-xs text-[var(--color-primary-green)]">휴대폰 번호 인증이 완료되었습니다</p>
              ) : null}
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-[0.95rem] bg-[rgba(148,35,30,0.05)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
              {error}
            </div>
          ) : null}

          <PrimaryButton
            className="mt-8 h-12 w-full rounded-[0.95rem]"
            disabled={
              isPending ||
              !emailChecked ||
              !phoneVerified ||
              !passwordChecks.hasLetter ||
              !passwordChecks.hasNumber ||
              !passwordChecks.hasLength ||
              password !== passwordConfirm
            }
            onClick={handleSubmitDetails}
          >
            {isPending ? "가입 중..." : "다음"}
          </PrimaryButton>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell bg-white">
      {renderTopBar(3)}
      <main className="flex-1 px-4 pb-10 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-[6.25rem] items-center justify-center rounded-full bg-[#f4ecda]">
            <span className="text-[3.1rem]">🐎</span>
          </div>
          <h2 className="mt-8 font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            가입이 완료되었습니다!
          </h2>
        </div>

        <div className="mt-8 rounded-[1rem] bg-[var(--color-primary-green)] px-5 py-4 text-white">
          <p className="text-sm">커피 취향 테스트로 나에게 맞는 원두를 찾아보세요!</p>
          <div className="mt-4 flex justify-end">
            <Link
              className="rounded-[0.75rem] bg-[var(--color-accent-gold)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-green)]"
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
    </div>
  );
}
