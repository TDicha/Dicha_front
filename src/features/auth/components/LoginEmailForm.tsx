import { Mail, ShieldCheck } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";

interface LoginEmailFormProps {
  email: string;
  error: string | null;
  isPending: boolean;
  password: string;
  rememberId: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onLogin: () => void;
  onToggleRememberId: () => void;
}

export function LoginEmailForm({
  email,
  error,
  isPending,
  password,
  rememberId,
  onChangeEmail,
  onChangePassword,
  onLogin,
  onToggleRememberId,
}: LoginEmailFormProps) {
  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--line-color)]" />
        <span className="text-[0.82rem] text-[var(--palette-a0a0a0)]">또는</span>
        <div className="h-px flex-1 bg-[var(--line-color)]" />
      </div>

      <div className="mt-6 space-y-3">
        <label className="block">
          <span className="sr-only">이메일 주소</span>
          <div className="flex h-12 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4">
            <Mail className="mr-3 size-4 text-[var(--palette-b0b0b0)]" />
            <input
              className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
              onChange={(event) => onChangeEmail(event.target.value)}
              placeholder="이메일 주소 입력"
              value={email}
            />
          </div>
        </label>

        <label className="block">
          <span className="sr-only">비밀번호</span>
          <div className="flex h-12 items-center rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4">
            <ShieldCheck className="mr-3 size-4 text-[var(--palette-b0b0b0)]" />
            <input
              className="w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
              onChange={(event) => onChangePassword(event.target.value)}
              placeholder="비밀번호 입력"
              type="password"
              value={password}
            />
          </div>
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2 text-[0.82rem] text-[var(--palette-666)]">
        <input
          checked={rememberId}
          className="size-4 rounded-[4px] border border-[var(--palette-d1d1d1)]"
          onChange={onToggleRememberId}
          type="checkbox"
        />
        아이디 저장
      </label>

      {error ? (
        <div className="mt-4 rounded-[0.95rem] bg-[var(--rgba-148-35-30-005)] px-4 py-3 text-sm text-[var(--color-primary-red)]">
          {error}
        </div>
      ) : null}

      <PrimaryButton className="mt-4 h-12 w-full rounded-[0.85rem]" disabled={isPending} onClick={onLogin}>
        {isPending ? "로그인 중..." : "로그인"}
      </PrimaryButton>
    </>
  );
}
