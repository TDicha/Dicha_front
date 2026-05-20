import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { PasswordChecks } from "@/features/auth/components/types";

interface SignupDetailsStepProps {
  email: string;
  error: string | null;
  isPending: boolean;
  name: string;
  password: string;
  passwordChecks: PasswordChecks;
  passwordConfirm: string;
  onChangeEmail: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangePasswordConfirm: (value: string) => void;
  onSubmit: () => void;
}

export function SignupDetailsStep({
  email,
  error,
  isPending,
  name,
  password,
  passwordChecks,
  passwordConfirm,
  onChangeEmail,
  onChangeName,
  onChangePassword,
  onChangePasswordConfirm,
  onSubmit,
}: SignupDetailsStepProps) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailPattern.test(email.trim());
  const isNameValid = name.trim().length > 0;
  const canSubmit =
    !isPending &&
    isEmailValid &&
    isNameValid &&
    passwordChecks.hasLength &&
    passwordChecks.hasEnoughTypes &&
    password === passwordConfirm;

  return (
    <main className="flex-1 px-[var(--page-x)] pb-10 pt-4">
      <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--text-ink)]">
        정보 입력
      </h2>
      <p className="mt-2 text-sm text-[var(--text-muted-compact)]">회원 정보를 입력해 주세요</p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-[var(--text-muted-compact)]">이메일 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-input)] px-4">
            <input
              autoComplete="email"
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted-light)]"
              onChange={(event) => onChangeEmail(event.target.value)}
              placeholder="example@email.com"
              type="email"
              value={email}
            />
          </div>
          {email && !isEmailValid ? (
            <p className="mt-2 text-xs text-[var(--state-danger)]">이메일 형식을 확인해 주세요</p>
          ) : null}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--text-muted-compact)]">비밀번호 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-input)] px-4">
            <input
              autoComplete="new-password"
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted-light)]"
              onChange={(event) => onChangePassword(event.target.value)}
              placeholder="8자 이상, 4종 이상 조합"
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
              { label: "4종 이상", passed: passwordChecks.hasEnoughTypes },
            ].map((item) => (
              <span key={item.label} className={item.passed ? "text-[var(--brand-primary)]" : "text-[var(--text-muted-light)]"}>
                ● {item.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--text-muted-compact)]">비밀번호 확인 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-input)] px-4">
            <input
              autoComplete="new-password"
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted-light)]"
              onChange={(event) => onChangePasswordConfirm(event.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              value={passwordConfirm}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-[var(--text-muted-compact)]">이름 *</p>
          <div className="flex h-11 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-input)] px-4">
            <input
              autoComplete="name"
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted-light)]"
              onChange={(event) => onChangeName(event.target.value)}
              placeholder="홍길동"
              value={name}
            />
          </div>
          {name && !isNameValid ? (
            <p className="mt-2 text-xs text-[var(--state-danger)]">이름을 입력해 주세요</p>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-[0.95rem] bg-[var(--surface-danger-soft)] px-4 py-3 text-sm text-[var(--state-danger)]">
          {error}
        </div>
      ) : null}

      <PrimaryButton className="mt-8 h-12 w-full rounded-[0.95rem]" disabled={!canSubmit} onClick={onSubmit}>
        {isPending ? "가입 중..." : "다음"}
      </PrimaryButton>
    </main>
  );
}
