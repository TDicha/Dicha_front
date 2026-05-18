import { ArrowRight, CheckCircle2, Coffee, Sparkles } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";

interface TasteTestIntroViewProps {
  questionCount: number;
  onStart: () => void;
}

const recommendationTargets = [
  "취향에 맞는 원두를 빠르게 고르고 싶은 분",
  "산미, 바디감, 향미 방향을 먼저 정하고 싶은 분",
  "디차 원두 중 어디서 시작할지 고민되는 분",
];

export function TasteTestIntroView({
  questionCount,
  onStart,
}: TasteTestIntroViewProps) {
  return (
    <div className="page-content space-y-5 bg-[var(--surface-base)] pt-4">
      <AppCard
        className="rounded-[1.8rem] px-5 py-6"
        padding="none"
        variant="hero-blue"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--overlay-white-70)]">
              TASTE TEST
            </p>
            <h1 className="mt-2 font-heading text-[1.9rem] font-semibold tracking-[-0.04em]">
              당신에게 맞는
              <br />
              오늘의 원두 찾기
            </h1>
            <p className="mt-3 max-w-[14rem] text-sm leading-6 text-[var(--overlay-white-82)]">
              총 {questionCount}가지 질문에 답하면 취향에 맞는 로스팅과 추천
              원두를 바로 보여드려요.
            </p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[var(--overlay-white-12)]">
            <Sparkles className="size-9 text-[var(--icon-accent)]" />
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
          이런 분께 추천해요
        </h2>
        <div className="mt-4 space-y-3">
          {recommendationTargets.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-[1rem] bg-[var(--surface-brand-tint-4)] px-4 py-3 text-sm text-[var(--brand-primary)]"
            >
              <CheckCircle2 className="size-4 text-[var(--brand-primary)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </AppCard>

      <AppCard variant="warm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--overlay-white-75)]">
            <Coffee className="size-5 text-[var(--brand-primary)]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
              테스트는 약 30초 걸려요
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
              결과를 보면 바로 추천 원두를 확인하고 상품 리스트로 이어서 볼 수
              있어요.
            </p>
          </div>
        </div>
      </AppCard>

      <PrimaryButton className="w-full" onClick={onStart}>
        테스트 시작하기
        <ArrowRight className="size-4" />
      </PrimaryButton>
    </div>
  );
}
