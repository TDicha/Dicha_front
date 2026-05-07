import { ChevronRight } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import type {
  AgreementKey,
  AgreementState,
  SignupAgreementRow,
} from "@/features/auth/components/types";

interface SignupTermsStepProps {
  agreementRows: readonly SignupAgreementRow[];
  agreements: AgreementState;
  allRequiredChecked: boolean;
  onNext: () => void;
  onToggleAgreement: (key: AgreementKey) => void;
  onToggleAllAgreement: () => void;
}

export function SignupTermsStep({
  agreementRows,
  agreements,
  allRequiredChecked,
  onNext,
  onToggleAgreement,
  onToggleAllAgreement,
}: SignupTermsStepProps) {
  return (
    <main className="flex-1 px-5 pb-10 pt-4">
      <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        약관 동의
      </h2>
      <p className="mt-2 text-sm text-[var(--palette-666)]">서비스 이용을 위해 약관에 동의해 주세요</p>

      <button
        className="mt-8 flex h-14 w-full items-center rounded-[0.95rem] bg-[var(--color-bg-ivory)] px-4 text-left"
        onClick={onToggleAllAgreement}
        type="button"
      >
        <span
          className={[
            "mr-3 flex size-5 items-center justify-center rounded-[4px] border text-[11px] font-bold",
            Object.values(agreements).every(Boolean)
              ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
              : "border-[var(--palette-cccccc)] bg-white text-transparent",
          ].join(" ")}
        >
          ✓
        </span>
        <span className="text-sm font-semibold text-[var(--color-ink)]">전체 동의</span>
      </button>

      <div className="mt-3 divide-y divide-[var(--rgba-232-232-232-07)]">
        {agreementRows.map((row) => (
          <button
            key={row.key}
            className="flex w-full items-center justify-between py-4 text-left"
            onClick={() => onToggleAgreement(row.key)}
            type="button"
          >
            <div className="flex items-center gap-3">
              <span
                className={[
                  "flex size-5 items-center justify-center rounded-[4px] border text-[11px] font-bold",
                  agreements[row.key]
                    ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                    : "border-[var(--palette-cccccc)] bg-white text-transparent",
                ].join(" ")}
              >
                ✓
              </span>
              <span className="text-sm text-[var(--palette-333333)]">{row.label}</span>
            </div>
            <ChevronRight className="size-4 text-[var(--palette-cccccc)]" />
          </button>
        ))}
      </div>

      <PrimaryButton className="mt-8 h-12 w-full rounded-[0.95rem]" disabled={!allRequiredChecked} onClick={onNext}>
        다음
      </PrimaryButton>
    </main>
  );
}
