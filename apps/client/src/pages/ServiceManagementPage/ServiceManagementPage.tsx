import {
  CalendarCheck,
  ClipboardList,
  Pause,
  Play,
  Truck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  useCancelSubscription,
  usePauseSubscription,
  useResumeSubscription,
  useSubscriptions,
  type Subscription,
} from "@/features/subscriptions";
import { ROUTES } from "@/shared/constants/routes";

function getStatusLabel(status: Subscription["status"]) {
  if (status === "ACTIVE") return "구독 중";
  if (status === "PAUSED") return "일시정지";
  return "해지됨";
}

function getStatusClassName(status: Subscription["status"]) {
  if (status === "ACTIVE") {
    return "bg-[var(--surface-green-light)] text-[var(--brand-primary)]";
  }
  if (status === "PAUSED") {
    return "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]";
  }
  return "bg-[var(--surface-muted)] text-[var(--text-muted)]";
}

export function ServiceManagementPage() {
  const subscriptionsQuery = useSubscriptions();
  const pauseSubscriptionMutation = usePauseSubscription();
  const resumeSubscriptionMutation = useResumeSubscription();
  const cancelSubscriptionMutation = useCancelSubscription();
  const subscriptions = subscriptionsQuery.data ?? [];
  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status !== "CANCELLED",
  );
  const nextDeliverySubscription = activeSubscriptions.find(
    (subscription) => subscription.nextDeliveryDate,
  );
  const isSubscriptionBusy =
    pauseSubscriptionMutation.isPending ||
    resumeSubscriptionMutation.isPending ||
    cancelSubscriptionMutation.isPending;

  return (
    <div className="cafe-tile-bg min-h-[100dvh] pb-10">
      <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-6 text-[var(--text-chalk)]">
        <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[var(--text-chalk-muted)]">
          SERVICE MANAGEMENT
        </p>
        <h1 className="mt-2 break-keep text-[1.45rem] font-black leading-8">
          구독 배송과 클래스 신청을 함께 관리해요
        </h1>
        <p className="mt-2 break-keep text-[0.82rem] leading-6 text-[var(--text-chalk-muted)]">
          정기 배송 상태, 다음 배송일, 클래스 신청 내역을 한 화면에서
          확인합니다.
        </p>
      </section>

      <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
        <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
          OVERVIEW
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-[var(--surface-soft-green)] px-3 py-3">
            <Truck className="size-4 text-[var(--brand-primary)]" />
            <p className="mt-2 text-[0.7rem] font-bold text-[var(--text-muted)]">
              진행 중 구독
            </p>
            <p className="mt-1 text-lg font-black text-[var(--text-cafe-ink)]">
              {subscriptionsQuery.isLoading ? "-" : `${activeSubscriptions.length}건`}
            </p>
          </div>
          <div className="bg-[var(--surface-cafe-tile)] px-3 py-3">
            <CalendarCheck className="size-4 text-[var(--brand-primary)]" />
            <p className="mt-2 text-[0.7rem] font-bold text-[var(--text-muted)]">
              클래스 신청
            </p>
            <p className="mt-1 text-lg font-black text-[var(--text-cafe-ink)]">
              0건
            </p>
          </div>
        </div>
        <p className="mt-3 break-keep bg-[var(--surface-cafe-tile)] px-3 py-2 text-xs font-bold leading-5 text-[var(--text-muted)]">
          다음 배송일 {nextDeliverySubscription?.nextDeliveryDate ?? "-"}
        </p>
      </section>

      <section className="mt-3 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
              MY SUBSCRIPTIONS
            </p>
            <h2 className="mt-1 text-lg font-black text-[var(--text-cafe-ink)]">
              구독 배송 관리
            </h2>
          </div>
          <ClipboardList className="size-5 text-[var(--brand-primary)]" />
        </div>

        {subscriptionsQuery.isLoading ? (
          <LoadingScreen message="구독 정보를 불러오는 중" />
        ) : subscriptions.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {subscriptions.map((subscription) => (
              <article
                key={subscription.id}
                className="bg-[var(--surface-cafe-tile)] px-3 py-3"
              >
                <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="aspect-square w-full object-cover"
                    src={subscription.productImage}
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 break-keep text-sm font-black leading-5 text-[var(--text-cafe-ink)]">
                        {subscription.productName}
                      </h3>
                      <span
                        className={[
                          "shrink-0 px-2 py-1 text-[0.68rem] font-bold",
                          getStatusClassName(subscription.status),
                        ].join(" ")}
                      >
                        {getStatusLabel(subscription.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {subscription.productOptionName ?? "기본 옵션"} ·{" "}
                      {subscription.quantity}개 · {subscription.intervalDays}일 주기
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      다음 배송일 {subscription.nextDeliveryDate ?? "-"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-[var(--surface-menu-board)] px-3 py-2">
                  <p className="break-keep text-xs leading-5 text-[var(--text-muted)]">
                    {subscription.recipientName} · {subscription.address}{" "}
                    {subscription.detailAddress}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {subscription.status === "PAUSED" ? (
                    <button
                      className="flex h-10 items-center justify-center gap-2 bg-[var(--surface-chalkboard)] text-xs font-black text-[var(--text-chalk)] disabled:opacity-60"
                      disabled={isSubscriptionBusy}
                      onClick={() =>
                        resumeSubscriptionMutation.mutate(subscription.id)
                      }
                      type="button"
                    >
                      <Play className="size-3.5" />
                      재개
                    </button>
                  ) : (
                    <button
                      className="flex h-10 items-center justify-center gap-2 bg-[var(--surface-menu-board)] text-xs font-black text-[var(--text-cafe-ink)] disabled:opacity-60"
                      disabled={
                        isSubscriptionBusy ||
                        subscription.status === "CANCELLED"
                      }
                      onClick={() =>
                        pauseSubscriptionMutation.mutate(subscription.id)
                      }
                      type="button"
                    >
                      <Pause className="size-3.5" />
                      일시정지
                    </button>
                  )}
                  <button
                    className="flex h-10 items-center justify-center gap-2 bg-[var(--surface-menu-board)] text-xs font-black text-[var(--text-cafe-ink)] disabled:opacity-60"
                    disabled={
                      isSubscriptionBusy || subscription.status === "CANCELLED"
                    }
                    onClick={() =>
                      cancelSubscriptionMutation.mutate(subscription.id)
                    }
                    type="button"
                  >
                    <XCircle className="size-3.5" />
                    해지
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 bg-[var(--surface-cafe-tile)] px-4 py-5">
            <p className="break-keep text-sm font-black text-[var(--text-cafe-ink)]">
              아직 진행 중인 구독이 없어요.
            </p>
            <p className="mt-1 break-keep text-xs leading-5 text-[var(--text-muted)]">
              예약 탭에서 커피 정기 배송을 먼저 신청해 보세요.
            </p>
            <Link
              className="mt-3 inline-flex h-10 items-center bg-[var(--surface-chalkboard)] px-4 text-xs font-black text-[var(--text-chalk)]"
              to={`${ROUTES.services}?tab=subscription`}
            >
              구독 신청하기
            </Link>
          </div>
        )}
      </section>

      <section className="mt-3 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
              MY CLASS BOOKINGS
            </p>
            <h2 className="mt-1 text-lg font-black text-[var(--text-cafe-ink)]">
              클래스 신청 관리
            </h2>
          </div>
          <CalendarCheck className="size-5 text-[var(--brand-primary)]" />
        </div>
        <div className="mt-4 bg-[var(--surface-cafe-tile)] px-4 py-5">
          <p className="break-keep text-sm font-black text-[var(--text-cafe-ink)]">
            신청 내역 관리는 예약 API가 생기면 연결됩니다.
          </p>
          <p className="mt-1 break-keep text-xs leading-5 text-[var(--text-muted)]">
            admin에서 확인할 수 있으려면 백엔드에 예약 생성, 목록, 상태 변경
            API가 추가되어야 합니다.
          </p>
          <Link
            className="mt-3 inline-flex h-10 items-center bg-[var(--surface-menu-board)] px-4 text-xs font-black text-[var(--text-cafe-ink)]"
            to={`${ROUTES.services}?tab=class`}
          >
            클래스 신청 화면으로 이동
          </Link>
        </div>
      </section>
    </div>
  );
}
