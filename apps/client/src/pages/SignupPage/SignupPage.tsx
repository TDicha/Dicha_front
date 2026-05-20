import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import {
  SignupCompleteStep,
  SignupDetailsStep,
  SignupTermsStep,
  SignupTopBar,
  type AgreementKey,
  type AgreementState,
  type SignupStep,
} from "@/features/auth";
import { ROUTES } from "@/shared/constants/routes";

export function SignupPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const isPending = useAuthStore((state) => state.isPending);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [step, setStep] = useState<SignupStep>("terms");
  const [agreements, setAgreements] = useState<AgreementState>({
    terms: true,
    privacy: true,
    age: true,
    marketing: false,
  });
  const [email, setEmail] = useState("wooseok@dicha.coffee");
  const [password, setPassword] = useState("Password123!");
  const [passwordConfirm, setPasswordConfirm] = useState("Password123!");
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
    () => {
      const typeCount = [
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[^A-Za-z0-9]/.test(password),
      ].filter(Boolean).length;

      return {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password),
        hasLength: password.length >= 8,
        hasEnoughTypes: typeCount >= 3,
      };
    },
    [password],
  );

  async function handleSubmitDetails() {
    const isSuccess = await signUp({ name, email, password });

    if (isSuccess) {
      setStep("complete");
    }
  }

  function toggleAgreement(key: AgreementKey) {
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

  function handleBack() {
    if (step === "terms") navigate(-1);
    else if (step === "details") setStep("terms");
    else navigate(ROUTES.login);
  }

  if (step === "terms") {
    return (
      <div className="page-shell bg-[var(--surface-base)]">
        <SignupTopBar onBack={handleBack} progress={1} />
        <SignupTermsStep
          agreementRows={agreementRows}
          agreements={agreements}
          allRequiredChecked={allRequiredChecked}
          onNext={() => setStep("details")}
          onToggleAgreement={toggleAgreement}
          onToggleAllAgreement={toggleAllAgreement}
        />
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="page-shell bg-[var(--surface-base)]">
        <SignupTopBar onBack={handleBack} progress={2} />
        <SignupDetailsStep
          email={email}
          emailChecked={emailChecked}
          error={error}
          isPending={isPending}
          name={name}
          onChangeEmail={(value) => {
            setEmail(value);
            setEmailChecked(false);
          }}
          onChangeName={setName}
          onChangePassword={setPassword}
          onChangePasswordConfirm={setPasswordConfirm}
          onChangePhone={(value) => {
            setPhone(value);
            setPhoneVerified(false);
          }}
          onChangeVerificationCode={setVerificationCode}
          onCheckEmail={() => setEmailChecked(true)}
          onRequestPhoneVerification={() => setPhoneVerified(false)}
          onSubmit={handleSubmitDetails}
          onVerifyPhone={() => setPhoneVerified(true)}
          password={password}
          passwordChecks={passwordChecks}
          passwordConfirm={passwordConfirm}
          phone={phone}
          phoneVerified={phoneVerified}
          verificationCode={verificationCode}
        />
      </div>
    );
  }

  return (
    <div className="page-shell bg-[var(--surface-base)]">
      <SignupTopBar onBack={handleBack} progress={3} />
      <SignupCompleteStep />
    </div>
  );
}
