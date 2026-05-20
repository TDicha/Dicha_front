import { CalendarDays } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";

export function ClassReservationHeroSection() {
  return (
    <AppCard
      className="rounded-[1.75rem] px-5 py-5"
      padding="none"
      variant="hero-green"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--overlay-white-70)]">
            CLASS RESERVATION
          </p>
          <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
            커피 클래스
            <br />
            예약하기
          </h1>
          <p className="mt-3 max-w-[13rem] text-sm leading-6 text-[var(--overlay-white-78)]">
            핸드드립, 로스팅 기초, 원두 테이스팅 클래스를 원하는 시간에
            예약해보세요.
          </p>
        </div>
        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[var(--overlay-white-10)]">
          <CalendarDays className="size-9 text-[var(--icon-accent)]" />
        </div>
      </div>
    </AppCard>
  );
}
