import { CalendarCheck, ChevronRight, Repeat2 } from "lucide-react";

interface ProductSubscriptionReservationSectionProps {
  productName: string;
  onReserve: () => void;
}

const subscriptionBadgeImage = "/dicha-subscription-badge.png";

export function ProductSubscriptionReservationSection({
  productName,
  onReserve,
}: ProductSubscriptionReservationSectionProps) {
  return (
    <section className="bg-[var(--surface-soft-green)] px-[var(--page-x)] py-5 text-[var(--text-cafe-ink)]">
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center bg-[var(--surface-menu-board)]">
          <img
            alt=""
            aria-hidden="true"
            className="size-9 object-contain"
            src={subscriptionBadgeImage}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--brand-primary)]">
            SUBSCRIPTION RESERVE
          </p>
          <h2 className="mt-1 break-keep text-[1.05rem] font-black leading-6 text-[var(--text-cafe-ink)]">
            좋아하는 커피를 정기구독으로 받아보세요
          </h2>
          <p className="mt-1 break-keep text-[0.78rem] leading-5 text-[var(--text-muted)]">
            {productName}을 포함해 원하는 상품과 배송지를 선택해서 정기
            배송을 신청할 수 있어요.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-[var(--surface-menu-board)] px-3 py-3">
          <Repeat2 className="size-4 text-[var(--brand-primary)]" />
          <p className="mt-2 break-keep text-[0.78rem] font-bold leading-5">
            2주 또는 4주 단위로 예약
          </p>
        </div>
        <div className="bg-[var(--surface-menu-board)] px-3 py-3">
          <CalendarCheck className="size-4 text-[var(--brand-primary)]" />
          <p className="mt-2 break-keep text-[0.78rem] font-bold leading-5">
            출시 전 예약 알림 먼저 받기
          </p>
        </div>
      </div>

      <button
        className="mt-3 flex w-full items-center justify-between gap-3 bg-[var(--surface-chalkboard)] px-4 py-3 text-left text-[var(--text-chalk)]"
        onClick={onReserve}
        type="button"
      >
        <span>
          <span className="block text-sm font-black">정기구독 예약하기</span>
          <span className="mt-1 block text-[0.72rem] text-[var(--text-chalk-muted)]">
            구독 신청 및 배송 관리 화면으로 이동
          </span>
        </span>
        <ChevronRight className="size-4 shrink-0" />
      </button>
    </section>
  );
}
