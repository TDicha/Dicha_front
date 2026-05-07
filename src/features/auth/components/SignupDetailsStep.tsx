import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { PasswordChecks } from "@/features/auth/components/types";

interface SignupDetailsStepProps {
  email: string;
  emailChecked: boolean;
  error: string | null;
  isPending: boolean;
  name: string;
  password: string;
  passwordChecks: PasswordChecks;
  passwordConfirm: string;
  phone: string;
  phoneVerified: boolean;
  verificationCode: string;
  onChangeEmail: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangePasswordConfirm: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeVerificationCode: (value: string) => void;
  onCheckEmail: () => void;
  onRequestPhoneVerification: () => void;
  onSubmit: () => void;
  onVerifyPhone: () => void;
}

export function SignupDetailsStep({
  email,
  emailChecked,
  error,
  isPending,
  name,
  password,
  passwordChecks,
  passwordConfirm,
  phone,
  phoneVerified,
  verificationCode,
  onChangeEmail,
  onChangeName,
  onChangePassword,
  onChangePasswordConfirm,
  onChangePhone,
  onChangeVerificationCode,
  onCheckEmail,
  onRequestPhoneVerification,
  onSubmit,
  onVerifyPhone,
}: SignupDetailsStepProps) {
  const canSubmit =
    !isPending &&
    emailChecked &&
    phoneVerified &&
    passwordChecks.hasLength &&
    passwordChecks.hasEnoughTypes &&
    password === passwordConfirm;

  return (
    <main className="flex-1 px-5 pb-10 pt-4">
      <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        정보 입력
      </h2>
      <p className="mt-2 text-sm text-[var(--palette-666)]">회원 정보를 입력해 주세요</p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">이메일 *</p>
          <div className="flex gap-2">
            <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-[var(--palette-f8f8f8)] px-4">
              <input
                className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
                onChange={(event) => onChangeEmail(event.target.value)}
                placeholder="example@email.com"
                value={email}
              />
            </div>
            <button
              className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-4 text-xs font-semibold text-white"
              onClick={onCheckEmail}
              type="button"
            >
              중복확인
            </button>
          </div>
          {emailChecked ? <p className="mt-2 text-xs text-[var(--color-primary-green)]">사용 가능한 이메일입니다</p> : null}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">비밀번호 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-[var(--palette-f8f8f8)] px-4">
            <input
              className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
              onChange={(event) => onChangePassword(event.target.value)}
              placeholder="8자 이상, 3종 이상 조합"
              type="password"
              value={password}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
            {[
              { label: "대문자", passed: passwordChecks.hasUppercase },
              { label: "소문자", passed: passwordChecks.hasLowercase },
              { label: "숫자 포함", passed: passwordChecks.hasNumber },
              { label: "특수문자", passed: passwordChecks.hasSpecial },
              { label: "8자 이상", passed: passwordChecks.hasLength },
              { label: "3종 이상", passed: passwordChecks.hasEnoughTypes },
            ].map((item) => (
              <span key={item.label} className={item.passed ? "text-[var(--color-primary-green)]" : "text-[var(--palette-999)]"}>
                ● {item.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">비밀번호 확인 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-[var(--palette-f8f8f8)] px-4">
            <input
              className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
              onChange={(event) => onChangePasswordConfirm(event.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              value={passwordConfirm}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">이름 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-[var(--palette-f8f8f8)] px-4">
            <input
              className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
              onChange={(event) => onChangeName(event.target.value)}
              placeholder="홍길동"
              value={name}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">휴대폰 번호 *</p>
          <div className="flex gap-2">
            <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-[var(--palette-f8f8f8)] px-4">
              <input
                className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
                onChange={(event) => onChangePhone(event.target.value)}
                placeholder="010-0000-0000"
                value={phone}
              />
            </div>
            <button
              className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-4 text-xs font-semibold text-white"
              onClick={onRequestPhoneVerification}
              type="button"
            >
              인증요청
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--palette-666)]">인증번호 *</p>
          <div className="flex gap-2">
            <div className="flex h-11 flex-1 items-center rounded-[0.85rem] border-[1.5px] border-[var(--color-primary-green)] bg-white px-4">
              <input
                className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-999)]"
                onChange={(event) => onChangeVerificationCode(event.target.value)}
                placeholder="인증번호 입력"
                value={verificationCode}
              />
              <span className="font-heading text-sm font-semibold text-[var(--color-primary-red)]">02:58</span>
            </div>
            <button
              className="h-11 rounded-[0.85rem] bg-[var(--color-primary-green)] px-5 text-sm font-semibold text-white"
              onClick={onVerifyPhone}
              type="button"
            >
              확인
            </button>
          </div>
          {phoneVerified ? <p className="mt-2 text-xs text-[var(--color-primary-green)]">휴대폰 번호 인증이 완료되었습니다</p> : null}
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-[0.95rem] bg-[var(--rgba-148-35-30-005)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
          {error}
        </div>
      ) : null}

      <PrimaryButton className="mt-8 h-12 w-full rounded-[0.95rem]" disabled={!canSubmit} onClick={onSubmit}>
        {isPending ? "가입 중..." : "다음"}
      </PrimaryButton>
    </main>
  );
}
