import { ChevronRight, CreditCard, Settings2, ShieldCheck } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { accountSections } from "@/shared/constants/accountSections";
import { ROUTES } from "@/shared/constants/routes";

const sectionIcons = {
  payment: CreditCard,
  favorites: ChevronRight,
  notifications: Settings2,
  security: ShieldCheck,
  "app-settings": Settings2,
} as const;

export function AccountSectionPage() {
  const { sectionId } = useParams();
  const section = accountSections.find((item) => item.id === sectionId);

  if (!sectionId) {
    return <Navigate replace to={ROUTES.myPage} />;
  }

  if (!section) {
    return (
      <div className="page-content space-y-5 bg-white pt-4">
        <EmptyState
          action={
            <PrimaryButton asChild className="w-full">
              <Link to={ROUTES.myPage}>마이페이지로 돌아가기</Link>
            </PrimaryButton>
          }
          description="요청한 계정 관리 화면을 찾지 못했어요."
          title="존재하지 않는 관리 화면입니다"
        />
      </div>
    );
  }

  const Icon = sectionIcons[section.id] ?? Settings2;

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="rounded-[1.7rem] px-5 py-5" padding="none" variant="hero-green">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70">ACCOUNT</p>
            <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em] text-white">
              {section.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/82">{section.description}</p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/12">
            <Icon className="size-9 text-[#f1d08b]" />
          </div>
        </div>
      </AppCard>

      <AppCard variant="warm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-muted)]">CURRENT STATUS</p>
            <h2 className="mt-2 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              {section.statusLabel}
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
            Mock UI
          </span>
        </div>
      </AppCard>

      <AppCard className="py-2">
        <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
          관리 항목
        </h2>
        {section.items.map((item, index) => (
          <button
            key={item}
            className={[
              "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--color-primary-green)]",
              index < section.items.length - 1 ? "border-b border-[rgba(17,24,39,0.06)]" : "",
            ].join(" ")}
            type="button"
          >
            <span>{item}</span>
            <ChevronRight className="size-4 text-[var(--color-muted)]" />
          </button>
        ))}
      </AppCard>

      <AppCard>
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          현재 화면은 스타벅스 앱처럼 섹션별 관리 진입 구조를 먼저 연결한 임시 화면입니다. 상세 기능을 붙일 때는 실제 API와 상태 설계가 필요합니다.
        </p>
      </AppCard>

      <PrimaryButton className="w-full">{section.ctaLabel}</PrimaryButton>
    </div>
  );
}
