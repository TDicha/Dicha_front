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
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className="sr-only">이메일 주소</span>
          <div className="flex h-12 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-4">
            <Mail className="mr-3 size-4 text-[var(--border-disabled)]" />
            <input
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder)]"
              onChange={(event) => onChangeEmail(event.target.value)}
              placeholder="이메일 주소 입력"
              value={email}
            />
          </div>
        </label>

        <label className="block">
          <span className="sr-only">비밀번호</span>
          <div className="flex h-12 items-center rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-4">
            <ShieldCheck className="mr-3 size-4 text-[var(--border-disabled)]" />
            <input
              className="w-full bg-transparent text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder)]"
              onChange={(event) => onChangePassword(event.target.value)}
              placeholder="비밀번호 입력"
              type="password"
              value={password}
            />
          </div>
        </label>
      </div>

      <label className="flex items-center gap-2 text-[0.82rem] text-[var(--text-muted-compact)]">
        <input
          checked={rememberId}
          className="size-4 rounded-[4px] border border-[var(--border-neutral-muted)]"
          onChange={onToggleRememberId}
          type="checkbox"
        />
        아이디 저장
      </label>

      {error ? (
        <div className="rounded-[0.95rem] bg-[var(--surface-danger-soft)] px-4 py-3 text-sm text-[var(--state-danger)]">
          {error}
        </div>
      ) : null}

      <PrimaryButton className="h-12 w-full rounded-[0.85rem]" disabled={isPending} onClick={onLogin}>
        {isPending ? "로그인 중..." : "로그인"}
      </PrimaryButton>
    </div>
  );
}
