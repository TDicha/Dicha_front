import { ArrowLeft } from "lucide-react";

import type { SignupProgress } from "@/features/auth/components/types";

interface SignupTopBarProps {
  progress: SignupProgress;
  onBack: () => void;
}

export function SignupTopBar({ progress, onBack }: SignupTopBarProps) {
  return (
    <>
      <header className="flex h-[3.25rem] items-center justify-between px-[var(--page-x)]">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center rounded-full text-[var(--text-ink)]"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-semibold text-[var(--text-ink)]">회원가입</h1>
        <div className="size-8" />
      </header>
      <div className="h-1 w-full bg-[var(--surface-neutral-light)]">
        <div
          className="h-1 bg-[var(--brand-primary)] transition-all"
          style={{ width: `${(progress / 3) * 100}%` }}
        />
      </div>
    </>
  );
}
