import { PrimaryButton } from "@/components/common/PrimaryButton";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { mockOrders } from "@/mock/orders";
import { formatPrice } from "@/shared/utils/format";

const statusLabel = {
  preparing: "준비중",
  shipping: "배송중",
  completed: "완료",
} as const;

export function OrderListPage() {
  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="flex items-center justify-between rounded-[1.3rem] px-4 py-3" padding="none" variant="muted">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-muted)]">ORDERS</p>
          <p className="mt-1 text-sm text-[var(--color-primary-green)]">총 {mockOrders.length}건</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-white px-3 py-1.5 font-medium text-[var(--color-primary-green)]">
            전체
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-[var(--color-muted)]">
            배송중
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-[var(--color-muted)]">
            완료
          </span>
        </div>
      </AppCard>

      <section className="space-y-3">
        {mockOrders.map((order) => (
            <AppCard key={`${order.id}-${order.productName}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-[1.05rem] font-semibold text-[var(--color-primary-green)]">
                  {order.productName}
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {order.id} · {order.orderedAt}
                </p>
              </div>
              <span className="rounded-full bg-[rgba(29,62,43,0.08)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
                {statusLabel[order.status]}
              </span>
            </div>
            <div className="mt-4 rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-3 py-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-muted)]">결제 금액</span>
                <span className="font-semibold text-[var(--color-primary-green)]">
                  {formatPrice(order.amount)}원
                </span>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="flex-1 rounded-[0.95rem] border border-[rgba(17,24,39,0.08)] px-3 py-2.5 text-sm font-medium text-[var(--color-primary-green)]"
                type="button"
              >
                상세 보기
              </button>
              <button
                className="flex-1 rounded-[0.95rem] bg-[var(--color-primary-green)] px-3 py-2.5 text-sm font-semibold text-white"
                type="button"
              >
                다시 주문
              </button>
            </div>
            </AppCard>
        ))}
      </section>

      <section className="pt-2">
        <EmptyState
          action={<PrimaryButton className="w-full">쇼핑하러 가기</PrimaryButton>}
          description="아직 주문하신 상품이 없어요. 지금 디차 원두를 만나보세요."
          title="주문 내역이 없습니다"
        />
      </section>
    </div>
  );
}
