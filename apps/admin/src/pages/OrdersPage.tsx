import { useEffect, useState } from "react";

import {
  fetchOrders,
  updateOrderStatus,
  type AdminOrder,
  type AdminOrderStatus,
} from "@/services/api/adminApi";

const STATUS_OPTIONS: { value: AdminOrderStatus; label: string }[] = [
  { value: "PENDING", label: "주문 완료(결제 대기)" },
  { value: "PAID", label: "결제 완료" },
  { value: "SHIPPING", label: "배송 중" },
  { value: "DELIVERED", label: "배송 완료" },
  { value: "CANCELLED", label: "주문 취소" },
];

const STATUS_LABEL = new Map(
  STATUS_OPTIONS.map((option) => [option.value, option.label]),
);

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("ko-KR");
}

function getOrdererType(order: AdminOrder) {
  if (order.ordererType === "MEMBER" || order.memberId || order.memberEmail) {
    return { className: "status-badge success", label: "회원" };
  }

  if (order.ordererType === "GUEST" || order.isGuestOrder) {
    return { className: "status-badge muted", label: "비회원" };
  }

  return { className: "status-badge warning", label: "구분 필요" };
}

export function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function loadOrders() {
    setIsLoading(true);
    setError("");

    try {
      setOrders(await fetchOrders());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "주문 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusChange(
    order: AdminOrder,
    status: AdminOrderStatus,
  ) {
    if (status === order.status) {
      return;
    }

    let cancelReason: string | undefined;

    if (status === "CANCELLED") {
      const reason = window.prompt(
        `${order.orderNumber} 주문을 취소하는 이유를 입력해 주세요.`,
      );

      if (!reason?.trim()) {
        return;
      }

      cancelReason = reason.trim();
    }

    setUpdatingOrder(order.orderNumber);
    setError("");

    try {
      const updated = await updateOrderStatus(
        order.orderNumber,
        status,
        cancelReason,
      );
      setOrders((current) =>
        current.map((item) =>
          item.orderNumber === order.orderNumber
            ? { ...item, status: updated.status ?? status }
            : item,
        ),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "주문 상태 변경에 실패했습니다.",
      );
    } finally {
      setUpdatingOrder(null);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  return (
    <div className="page-stack">
      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>주문 목록</h2>
            <p className="section-description">
              주문을 조회하고 배송 상태를 변경합니다. 현재 백엔드 주문 응답에는
              회원/비회원 식별 필드가 없어 일부 주문은 구분 필요로 표시됩니다.
            </p>
          </div>
          <button onClick={() => void loadOrders()} type="button">
            새로고침
          </button>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="simple-table admin-data-table orders-table">
          <div className="table-row table-head">
            <span>주문번호</span>
            <span>주문자</span>
            <span>유형</span>
            <span>금액</span>
            <span>주문일</span>
            <span>상태</span>
            <span>상세</span>
          </div>

          {isLoading ? (
            <div className="table-row table-empty">
              <span>주문 목록을 불러오는 중입니다.</span>
            </div>
          ) : orders.length ? (
            orders.map((order) => (
              <div key={order.orderNumber}>
                <div className="table-row">
                  <span>{order.orderNumber}</span>
                  <span>
                    <strong>{order.memberName ?? order.recipientName}</strong>
                    <small>{order.memberEmail ?? order.phoneNumber}</small>
                  </span>
                  <span>
                    <span className={getOrdererType(order).className}>
                      {getOrdererType(order).label}
                    </span>
                  </span>
                  <span>₩{formatPrice(order.totalPrice)}</span>
                  <span>{formatDate(order.createdAt)}</span>
                  <span>
                    <select
                      disabled={updatingOrder === order.orderNumber}
                      onChange={(event) =>
                        void handleStatusChange(
                          order,
                          event.target.value as AdminOrderStatus,
                        )
                      }
                      value={order.status}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span>
                    <button
                      onClick={() =>
                        setExpanded((current) =>
                          current === order.orderNumber
                            ? null
                            : order.orderNumber,
                        )
                      }
                      type="button"
                    >
                      {expanded === order.orderNumber ? "닫기" : "보기"}
                    </button>
                  </span>
                </div>

                {expanded === order.orderNumber ? (
                  <div className="order-detail">
                    <p>
                      <strong>배송지</strong> {order.recipientName} /{" "}
                      {order.phoneNumber}
                    </p>
                    <p>{order.shippingAddress}</p>
                    <p>
                      <strong>현재 상태</strong>{" "}
                      {STATUS_LABEL.get(order.status) ?? order.status}
                    </p>
                    <p>
                      <strong>주문자 유형</strong> {getOrdererType(order).label}
                    </p>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={item.orderItemId ?? index}>
                          {item.productName}
                          {item.optionName ? ` (${item.optionName})` : ""} ·{" "}
                          {item.quantity}개 · ₩
                          {formatPrice(
                            item.subtotal ?? item.unitPrice * item.quantity,
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="table-row table-empty">
              <span>등록된 주문이 없습니다.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
