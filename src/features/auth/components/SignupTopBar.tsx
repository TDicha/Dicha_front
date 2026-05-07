import { ArrowLeft } from "lucide-react";

import type { SignupProgress } from "@/features/auth/components/types";

interface SignupTopBarProps {
  progress: SignupProgress;
  onBack: () => void;
}

export function SignupTopBar({ progress, onBack }: SignupTopBarProps) {
  return (
    <>
      <header className="flex h-[3.25rem] items-center justify-between px-5">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center rounded-full text-[var(--color-ink)]"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-semibold text-[var(--color-ink)]">회원가입</h1>
        <div className="size-8" />
      </header>
      <div className="h-1 w-full bg-[var(--palette-f5f5f5)]">
        <div
          className="h-1 bg-[var(--color-primary-green)] transition-all"
          style={{ width: `${(progress / 3) * 100}%` }}
        />
      </div>
    </>
  );
}
