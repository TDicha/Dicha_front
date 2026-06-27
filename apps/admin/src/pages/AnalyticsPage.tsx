import { useEffect, useMemo, useState } from "react";

import {
  fetchDashboardLists,
  fetchDashboardSalesChart,
  fetchDashboardSummary,
  fetchMembers,
  fetchOrders,
  type AdminDashboardLists,
  type AdminDashboardSummary,
  type AdminOrder,
  type AdminSalesChartData,
} from "@/services/api/adminApi";

const STATUS_LABEL = new Map([
  ["PENDING", "주문 완료"],
  ["PAID", "결제 완료"],
  ["SHIPPING", "배송 중"],
  ["DELIVERED", "배송 완료"],
  ["CANCELLED", "주문 취소"],
]);

function formatPrice(value?: number | null) {
  return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

function isKnownMemberOrder(order: AdminOrder) {
  return order.ordererType === "MEMBER" || Boolean(order.memberId || order.memberEmail);
}

function isKnownGuestOrder(order: AdminOrder) {
  return order.ordererType === "GUEST" || order.isGuestOrder === true;
}

export function AnalyticsPage() {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [salesChart, setSalesChart] = useState<AdminSalesChartData | null>(null);
  const [lists, setLists] = useState<AdminDashboardLists | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnalytics() {
    setIsLoading(true);
    setError("");

    try {
      const [summaryData, chartData, listsData, orderData, memberData] =
        await Promise.all([
          fetchDashboardSummary(),
          fetchDashboardSalesChart(),
          fetchDashboardLists(),
          fetchOrders(),
          fetchMembers(),
        ]);

      setSummary(summaryData);
      setSalesChart(chartData);
      setLists(listsData);
      setOrders(orderData);
      setMemberCount(memberData.length);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "통계 데이터를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadAnalytics();
  }, []);

  const orderStats = useMemo(() => {
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const memberOrders = orders.filter(isKnownMemberOrder).length;
    const guestOrders = orders.filter(isKnownGuestOrder).length;
    const unknownOrders = orders.length - memberOrders - guestOrders;
    const statusCounts = orders.reduce<Record<string, number>>((counts, order) => {
      counts[order.status] = (counts[order.status] ?? 0) + 1;
      return counts;
    }, {});

    return {
      averageOrderPrice: orders.length ? Math.round(totalSales / orders.length) : 0,
      guestOrders,
      memberOrders,
      statusCounts,
      totalSales,
      unknownOrders,
    };
  }, [orders]);

  const maxSales = Math.max(...(salesChart?.sales ?? [0]), 0);

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="admin-card metric-card">
          <span>오늘 주문</span>
          <strong>{isLoading ? "-" : `${summary?.newOrderCount ?? 0}건`}</strong>
          <small>대시보드 API 기준</small>
        </article>
        <article className="admin-card metric-card">
          <span>오늘 매출</span>
          <strong>
            {isLoading ? "-" : `₩${formatPrice(summary?.todaySales ?? 0)}`}
          </strong>
          <small>결제 완료 기준</small>
        </article>
        <article className="admin-card metric-card">
          <span>전체 주문 매출</span>
          <strong>
            {isLoading ? "-" : `₩${formatPrice(orderStats.totalSales)}`}
          </strong>
          <small>현재 조회 주문 합산</small>
        </article>
        <article className="admin-card metric-card">
          <span>평균 주문액</span>
          <strong>
            {isLoading ? "-" : `₩${formatPrice(orderStats.averageOrderPrice)}`}
          </strong>
          <small>현재 조회 주문 기준</small>
        </article>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="dashboard-grid">
        <article className="admin-card">
          <div className="section-heading">
            <div>
              <h2>매출 추이</h2>
              <p className="section-description">일자별 매출 데이터를 비교합니다.</p>
            </div>
            <button onClick={() => void loadAnalytics()} type="button">
              새로고침
            </button>
          </div>
          <div className="analytics-bars">
            {(salesChart?.labels ?? []).map((label, index) => {
              const sales = salesChart?.sales[index] ?? 0;
              const height = maxSales ? Math.max((sales / maxSales) * 100, 8) : 8;

              return (
                <div className="analytics-bar-item" key={label}>
                  <div className="analytics-bar-track">
                    <span style={{ height: `${height}%` }} />
                  </div>
                  <strong>{label}</strong>
                  <small>₩{formatPrice(sales)}</small>
                </div>
              );
            })}
            {!salesChart?.labels?.length ? <p>매출 데이터가 없습니다.</p> : null}
          </div>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <div>
              <h2>주문자 구분</h2>
              <p className="section-description">
                백엔드 주문 응답에 회원 식별 필드가 추가되면 자동으로 분리됩니다.
              </p>
            </div>
          </div>
          <div className="insight-list">
            <p>
              <span>회원 주문</span>
              <strong>{orderStats.memberOrders}건</strong>
            </p>
            <p>
              <span>비회원 주문</span>
              <strong>{orderStats.guestOrders}건</strong>
            </p>
            <p>
              <span>구분 필요</span>
              <strong>{orderStats.unknownOrders}건</strong>
            </p>
            <p>
              <span>가입 회원</span>
              <strong>{memberCount}명</strong>
            </p>
          </div>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="admin-card">
          <div className="section-heading">
            <div>
              <h2>상태별 주문</h2>
              <p className="section-description">
                주문 처리 병목을 빠르게 확인합니다.
              </p>
            </div>
          </div>
          <div className="insight-list">
            {Array.from(STATUS_LABEL.entries()).map(([status, label]) => (
              <p key={status}>
                <span>{label}</span>
                <strong>{orderStats.statusCounts[status] ?? 0}건</strong>
              </p>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <div>
              <h2>베스트 상품</h2>
              <p className="section-description">최근 주문 기준 판매량 상위 상품입니다.</p>
            </div>
          </div>
          <div className="task-list">
            {(lists?.bestProducts ?? []).slice(0, 5).map((product) => (
              <p key={product.productId}>
                {product.productName} · {product.totalSalesCount}개
              </p>
            ))}
            {!lists?.bestProducts?.length ? <p>판매 데이터가 없습니다.</p> : null}
          </div>
        </article>
      </section>
    </div>
  );
}
