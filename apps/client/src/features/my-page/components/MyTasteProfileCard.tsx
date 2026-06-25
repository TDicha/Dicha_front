import {
  Bean,
  Candy,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  Flame,
  Flower2,
  Grape,
  Nut,
  RotateCcw,
  Sparkles,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { flavorNoteLabels } from "@/features/taste-test/tasteTestConfig";
import { ROUTES } from "@/shared/constants/routes";
import type { UserProfile } from "@/shared/types/models";

interface MyTasteProfileCardProps {
  user: UserProfile;
}

const flavorIconMap: Record<string, LucideIcon> = {
  FRUITY: Cherry,
  FLORAL: Flower2,
  NUTTY: Nut,
  CHOCOLATY: Cookie,
  SPICY: Wheat,
  CARAMEL: Candy,
  CITRUS: Citrus,
  BERRY: Grape,
  ROASTY: Flame,
};

function scoreLabel(score: number, labels: [string, string, string]) {
  if (score >= 4) return labels[2];
  if (score <= 2) return labels[0];
  return labels[1];
}

function barWidth(score: number) {
  return `${Math.max(1, Math.min(5, score)) * 20}%`;
}

function getFlavorLabel(note?: string) {
  if (!note) return "미정";
  return flavorNoteLabels[note] ?? note;
}

function renderFlavorIcon(note: string | undefined, className: string) {
  const Icon = note ? flavorIconMap[note] ?? Bean : Bean;

  return createElement(Icon, { className });
}

function hasTasteProfile(user: UserProfile) {
  return (
    user.tasteAcidity !== undefined &&
    user.tasteBody !== undefined &&
    user.tasteSweetness !== undefined &&
    Boolean(user.tastePrimaryFlavorNote)
  );
}

export function MyTasteProfileCard({ user }: MyTasteProfileCardProps) {
  const hasProfile = hasTasteProfile(user);

  if (!hasProfile) {
    return (
      <AppCard className="mx-[var(--page-x)] rounded-none">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-brand-tint-6)]">
            <Coffee className="size-5 text-[var(--brand-primary)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Taste Profile
            </p>
            <h2 className="pb-2 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
              아직 저장된 취향이 없어요
            </h2>
            <Link
              className="inline-flex h-10 items-center gap-2 bg-[var(--surface-chalkboard)] px-4 text-sm font-semibold text-[var(--text-chalk)]"
              to={ROUTES.tasteTest}
            >
              취향 테스트하기
              <Sparkles className="size-4" />
            </Link>
          </div>
        </div>
      </AppCard>
    );
  }

  const acidity = user.tasteAcidity ?? 3;
  const body = user.tasteBody ?? 3;
  const sweetness = user.tasteSweetness ?? 3;

  const tasteRows = [
    {
      label: "산미",
      value: `${scoreLabel(acidity, ["낮음", "중간", "높음"])} · ${acidity}/5`,
      score: acidity,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-info-light)_0%,var(--chart-blue)_100%)]",
    },
    {
      label: "바디감",
      value: `${scoreLabel(body, ["가벼움", "중간", "묵직함"])} · ${body}/5`,
      score: body,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-accent-soft)_0%,var(--text-amber-dark)_100%)]",
    },
    {
      label: "단맛",
      value: `${scoreLabel(sweetness, ["약함", "중간", "강함"])} · ${sweetness}/5`,
      score: sweetness,
      barClassName:
        "bg-[linear-gradient(90deg,var(--surface-purple-soft)_0%,var(--chart-purple)_100%)]",
    },
  ];

  return (
    <AppCard className="mx-[var(--page-x)] rounded-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center bg-[var(--surface-brand-tint-6)] text-[var(--brand-primary)]">
            {renderFlavorIcon(user.tastePrimaryFlavorNote, "size-5")}
          </div>
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Taste Profile
            </p>
            <h2 className="pb-1 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
              나의 커피 취향
            </h2>
            <p className="text-sm font-medium text-[var(--brand-primary)]">
              {getFlavorLabel(user.tastePrimaryFlavorNote)} 향미 선호
            </p>
          </div>
        </div>
        <Link
          aria-label="취향 다시 테스트하기"
          className="flex size-10 shrink-0 items-center justify-center bg-[var(--surface-brand-tint-6)] text-[var(--brand-primary)]"
          to={ROUTES.tasteTest}
        >
          <RotateCcw className="size-4" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {tasteRows.map(({ label, value, score, barClassName }) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-[var(--brand-primary)]">
                {label}
              </span>
              <span className="text-[var(--text-muted)]">{value}</span>
            </div>
            <div className="h-2 overflow-hidden bg-[var(--surface-brand-tint-8)]">
              <div
                className={`h-full ${barClassName}`}
                style={{ width: barWidth(score) }}
              />
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
