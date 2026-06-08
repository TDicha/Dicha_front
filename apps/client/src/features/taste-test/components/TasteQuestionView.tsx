import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

import type { TasteQuestion } from "@/features/taste-test/tasteTestConfig";

interface TasteQuestionViewProps {
  currentQuestion: TasteQuestion;
  currentQuestionIndex: number;
  questionCount: number;
  selectedValue?: string;
  backLabel: string;
  onBack: () => void;
  onSelect: (value: string) => void;
}

export function TasteQuestionView({
  currentQuestion,
  currentQuestionIndex,
  questionCount,
  selectedValue,
  backLabel,
  onBack,
  onSelect,
}: TasteQuestionViewProps) {
  return (
    <div className="page-content flex flex-col gap-5 bg-[var(--surface-base)] pt-4">
      <AppCard
        className="rounded-[1.8rem] px-5 py-6"
        padding="none"
        variant="hero-blue"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--overlay-white-70)]">
          QUESTION {currentQuestionIndex + 1} / {questionCount}
        </p>
        <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
          {currentQuestion.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--overlay-white-82)]">
          {currentQuestion.description}
        </p>
        <div className="mt-5 h-2 rounded-full bg-[var(--overlay-white-15)]">
          <div
            className="h-2 rounded-full bg-[var(--icon-accent)] transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / questionCount) * 100}%`,
            }}
          />
        </div>
      </AppCard>

      <div className="my-3 flex flex-col gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            className={[
              "w-full rounded-[1.25rem] border px-4 py-4 text-left transition",
              selectedValue === option.value
                ? "border-[var(--brand-primary)] bg-[var(--surface-brand-tint-6)]"
                : "border-[var(--border-ink-8)] bg-[var(--surface-base)]",
            ].join(" ")}
            onClick={() => onSelect(option.value)}
            type="button"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--brand-primary)]">
                  {option.label}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {option.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-[var(--text-muted)]" />
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <PrimaryButton
          className="flex-1 bg-[var(--surface-base)] text-[var(--brand-primary)]"
          onClick={onBack}
          variant="outline"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </PrimaryButton>
        <PrimaryButton asChild className="flex-1">
          <Link to={ROUTES.home}>나중에 할게요</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
