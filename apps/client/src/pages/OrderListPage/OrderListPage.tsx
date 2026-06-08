import { useMemo, useState } from "react";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  OrderCard,
  OrderEmptyState,
  OrderFilterTabs,
  useCancelOrder,
  useOrders,
  type Order,
} from "@/features/orders";

const filterOptions = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행중" },
  { key: "done", label: "완료" },
] as const;

function isActiveOrder(order: Order) {
  return !["delivered", "canceled", "refunded"].includes(order.status);
}

export function OrderListPage() {
  const [filter, setFilter] =
    useState<(typeof filterOptions)[number]["key"]>("all");
  const { data: orders = [], isError, isLoading } = useOrders();
  const cancelOrder = useCancelOrder();

  function handleCancelOrder(order: Order) {
    const shouldCancel = window.confirm(`${order.orderNo} 주문을 취소할까요?`);

    if (!shouldCancel) {
      return;
    }

    cancelOrder.mutate(order.orderNo);
  }

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return orders;
    }

    if (filter === "active") {
      return orders.filter(isActiveOrder);
    }

    if (filter === "done") {
      return orders.filter((order) => order.status === "delivered");
    }

    return [];
  }, [filter, orders]);

  return (
    <div className="bg-[var(--surface-page)] px-[var(--page-x)] pb-10 pt-3">
      <OrderFilterTabs
        filter={filter}
        onChange={setFilter}
        options={filterOptions}
      />

      <p className="px-1 pt-2 text-[1rem] text-[var(--text-list-count)]">
        총 {filteredOrders.length}건
      </p>

      {isLoading ? (
        <LoadingScreen
          className="min-h-[13rem]"
          message="주문 내역을 불러오는 중"
        />
      ) : isError ? (
        <section className="px-1 pt-8 text-center text-sm text-[var(--state-danger)]">
          주문 내역을 불러오지 못했어요.
        </section>
      ) : filteredOrders.length ? (
        <section className="mt-2 space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              isCanceling={
                cancelOrder.isPending &&
                cancelOrder.variables === order.orderNo
              }
              onCancel={handleCancelOrder}
              order={order}
            />
          ))}
        </section>
      ) : (
        <OrderEmptyState />
      )}
    </div>
  );
}
