import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { flavorNoteLabels } from "@/features/taste-test/tasteTestConfig";
import type { TasteProfile } from "@/features/taste-test/tasteTestApi";
import { ROUTES } from "@/shared/constants/routes";
import type { Product } from "@/shared/types/models";

interface TasteResultViewProps {
  profile: TasteProfile;
  recommendedProducts: Product[];
  onReset: () => void;
}

/** 백엔드 점수(1~5)를 기준으로 대표 로스팅 방향을 정한다. */
function getRoastResultTitle(profile: TasteProfile) {
  if (profile.acidity >= 4) return "산뜻한 라이트 로스트";
  if (profile.body >= 4) return "묵직한 다크 로스트";
  return "균형감 있는 미디엄 로스트";
}

function scoreLabel(score: number, labels: [string, string, string]) {
  if (score >= 4) return labels[2];
  if (score <= 2) return labels[0];
  return labels[1];
}

function flavorLabel(note: string) {
  return flavorNoteLabels[note] ?? note;
}

export function TasteResultView({
  profile,
  recommendedProducts,
  onReset,
}: TasteResultViewProps) {
  const acidityLabel = scoreLabel(profile.acidity, ["낮음", "중간", "높음"]);
  const bodyLabel = scoreLabel(profile.body, ["가벼움", "중간", "묵직함"]);
  const sweetnessLabel = scoreLabel(profile.sweetness, ["약함", "중간", "강함"]);

  const profileRows = [
    ["로스팅", getRoastResultTitle(profile)],
    ["산미", `${acidityLabel} (${profile.acidity}/5)`],
    ["바디감", `${bodyLabel} (${profile.body}/5)`],
    ["단맛", `${sweetnessLabel} (${profile.sweetness}/5)`],
    ["향미", flavorLabel(profile.primaryFlavorNote)],
  ];

  const spectrumRows = [
    {
      label: "산미",
      value: `${acidityLabel} · ${profile.acidity}/5`,
      score: profile.acidity,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-info-light)_0%,var(--chart-blue)_100%)]",
    },
    {
      label: "바디감",
      value: `${bodyLabel} · ${profile.body}/5`,
      score: profile.body,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-accent-soft)_0%,var(--text-amber-dark)_100%)]",
    },
    {
      label: "단맛",
      value: `${sweetnessLabel} · ${profile.sweetness}/5`,
      score: profile.sweetness,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-purple-soft)_0%,var(--chart-purple)_100%)]",
    },
  ];

  return (
    <div className="page-content flex flex-col gap-5 bg-[var(--surface-base)] pt-4">
      <AppCard
        className="rounded-[1.8rem] px-5 py-6"
        padding="none"
        variant="hero-blue"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--overlay-white-70)]">
              TASTE TEST RESULT
            </p>
            <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
              당신의 취향은
              <br />
              {getRoastResultTitle(profile)}
            </h1>
            <p className="mt-3 max-w-[13rem] text-sm leading-6 text-[var(--overlay-white-82)]">
              선택한 답변을 바탕으로 지금의 기분과 잘 맞는 원두 방향을
              추천했어요.
            </p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[var(--overlay-white-12)]">
            <Sparkles className="size-9 text-[var(--icon-accent)]" />
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
          추천 프로파일
        </h2>
        <div className="mt-4 space-y-3">
          {profileRows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-[1rem] bg-[var(--surface-brand-tint-4)] px-4 py-3 text-sm"
            >
              <span className="text-[var(--text-muted)]">{label}</span>
              <span className="font-medium text-[var(--brand-primary)]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </AppCard>

      <AppCard>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
              취향 스펙트럼
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              산미, 바디, 단맛을 1~5점 기준으로 요약했어요.
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--surface-brand-tint-6)]">
            <Sparkles className="size-5 text-[var(--brand-primary)]" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {spectrumRows.map(({ label, value, score, barClassName }) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--brand-primary)]">
                  {label}
                </span>
                <span className="text-[var(--text-muted)]">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-brand-tint-8)]">
                <div
                  className={`h-2 rounded-full ${barClassName}`}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
              추천 원두
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              현재 취향과 잘 맞는 디차 원두를 골라봤어요.
            </p>
          </div>
          <Link
            className="text-sm font-medium text-[var(--brand-primary)]"
            to={ROUTES.products}
          >
            전체보기
          </Link>
        </div>

        {recommendedProducts.length ? (
          <div className="grid grid-cols-2 gap-3">
            {recommendedProducts.map((product) => (
              <ProductTileCard
                key={product.id}
                compact
                product={product}
                showAddButton={false}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-[1rem] bg-[var(--surface-brand-tint-4)] px-4 py-6 text-center text-sm text-[var(--text-muted)]">
            지금은 추천할 원두가 없어요.
          </p>
        )}
      </section>

      <div className="my-5 flex flex-col gap-1">
        <PrimaryButton
          className="w-full bg-[var(--surface-base)] text-[var(--brand-primary)]"
          onClick={onReset}
          variant="outline"
        >
          다시 테스트해보기
          <RotateCcw className="size-4" />
        </PrimaryButton>
        <PrimaryButton
          asChild
          className="w-full bg-[var(--surface-base)] text-[var(--brand-primary)]"
          variant="outline"
        >
          <Link to={ROUTES.home}>홈으로 돌아가기</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
