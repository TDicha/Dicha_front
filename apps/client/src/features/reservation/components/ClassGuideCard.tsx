import { Check } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

export function ClassGuideCard() {
  return (
    <AppCard variant="warm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
            클래스 안내
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
            원두 이해, 추출 실습, 테이스팅까지 포함되며 예약 시간 10분 전
            입장을 권장합니다.
          </p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--overlay-white-70)]">
          <Check className="size-5 text-[var(--brand-primary)]" />
        </div>
      </div>
    </AppCard>
  );
}
