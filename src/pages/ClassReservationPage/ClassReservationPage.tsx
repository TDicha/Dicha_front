import { CalendarDays, Check, ChevronRight, Clock3, MapPin } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export function ClassReservationPage() {
  const slots = ["10:00", "11:30", "13:00", "14:30", "16:00", "18:30"];

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="rounded-[1.75rem] px-5 py-5" padding="none" variant="hero-green">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70">CLASS RESERVATION</p>
            <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
              커피 클래스
              <br />
              예약하기
            </h1>
            <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/78">
              핸드드립, 로스팅 기초, 원두 테이스팅 클래스를 원하는 시간에 예약해보세요.
            </p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/10">
            <CalendarDays className="size-9 text-[#f1d08b]" />
          </div>
        </div>
      </AppCard>

      <section className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-[rgba(29,62,43,0.04)] px-4 py-4">
          <p className="text-[var(--color-muted)]">진행 시간</p>
          <p className="mt-2 flex items-center gap-2 font-medium text-[var(--color-primary-green)]">
            <Clock3 className="size-4" />
            90분 클래스
          </p>
        </div>
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-[rgba(29,62,43,0.04)] px-4 py-4">
          <p className="text-[var(--color-muted)]">진행 지점</p>
          <p className="mt-2 flex items-center gap-2 font-medium text-[var(--color-primary-green)]">
            <MapPin className="size-4" />
            성수 플래그십
          </p>
        </div>
      </section>

      <AppCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              예약 일정
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              원하는 날짜와 클래스 시간을 선택하세요
            </p>
          </div>
          <div className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
            4월 18일
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {slots.map((slot, index) => (
            <button
              key={slot}
              className={[
                "rounded-[1rem] border px-3 py-3 text-sm font-medium transition",
                index === 2
                  ? "border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-white"
                  : "border-[rgba(17,24,39,0.08)] bg-white text-[var(--color-primary-green)]",
              ].join(" ")}
              type="button"
            >
              {slot}
            </button>
          ))}
        </div>
      </AppCard>

      <AppCard variant="warm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              클래스 안내
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              원두 이해, 추출 실습, 테이스팅까지 포함되며 예약 시간 10분 전 입장을 권장합니다.
            </p>
          </div>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/70">
            <Check className="size-5 text-[var(--color-primary-green)]" />
          </div>
        </div>
      </AppCard>

      <AppCard className="py-2">
        {[
          { icon: CalendarDays, label: "예약 내역 확인" },
          { icon: Clock3, label: "시간 변경 요청" },
          { icon: MapPin, label: "지점 위치 보기" },
        ].map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            className={[
              "flex w-full items-center justify-between py-4 text-left",
              index < 2 ? "border-b border-[rgba(17,24,39,0.06)]" : "",
            ].join(" ")}
            type="button"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-primary-green)]">
              <Icon className="size-4" />
              {label}
            </span>
            <ChevronRight className="size-4 text-[var(--color-muted)]" />
          </button>
        ))}
      </AppCard>

      <PrimaryButton className="w-full">클래스 예약 확정하기</PrimaryButton>
    </div>
  );
}
