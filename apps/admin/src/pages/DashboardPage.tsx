import { useEffect, useState } from "react";

import {
  fetchDashboardLists,
  fetchDashboardSalesChart,
  fetchDashboardSummary,
  type AdminDashboardLists,
  type AdminDashboardSummary,
  type AdminSalesChartData,
} from "@/services/api/adminApi";

export function DashboardPage() {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [salesChart, setSalesChart] = useState<AdminSalesChartData | null>(null);
  const [lists, setLists] = useState<AdminDashboardLists | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setIsLoading(true);
    setError("");

    try {
      const [summaryData, chartData, listsData] = await Promise.all([
        fetchDashboardSummary(),
        fetchDashboardSalesChart(),
        fetchDashboardLists(),
      ]);

      setSummary(summaryData);
      setSalesChart(chartData);
      setLists(listsData);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "대시보드 데이터를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="admin-card metric-card">
          <span>신규 주문</span>
          <strong>{isLoading ? "-" : `${summary?.newOrderCount ?? 0}건`}</strong>
          <small>오늘 접수</small>
        </article>
        <article className="admin-card metric-card">
          <span>오늘 매출</span>
          <strong>
            {isLoading
              ? "-"
              : `₩${new Intl.NumberFormat("ko-KR").format(summary?.todaySales ?? 0)}`}
          </strong>
          <small>결제 완료 기준</small>
        </article>
        <article className="admin-card metric-card">
          <span>신규 회원</span>
          <strong>{isLoading ? "-" : `${summary?.newMemberCount ?? 0}명`}</strong>
          <small>오늘 가입</small>
        </article>
        <article className="admin-card metric-card">
          <span>신규 리뷰</span>
          <strong>{isLoading ? "-" : `${summary?.newReviewCount ?? 0}개`}</strong>
          <small>오늘 작성</small>
        </article>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="dashboard-grid">
        <article className="admin-card">
          <div className="section-heading">
            <h2>최근 주문</h2>
            <button onClick={() => void loadDashboard()} type="button">
              새로고침
            </button>
          </div>
          <div className="task-list">
            {(lists?.recentOrders ?? []).slice(0, 5).map((order) => (
              <p key={order.orderNumber}>
                {order.orderNumber} · {order.customerName} ·{" "}
                ₩{new Intl.NumberFormat("ko-KR").format(order.totalPrice)}
              </p>
            ))}
            {!lists?.recentOrders?.length ? <p>최근 주문이 없습니다.</p> : null}
          </div>
        </article>
        <article className="admin-card">
          <div className="section-heading">
            <h2>매출 차트 데이터</h2>
          </div>
          <div className="task-list">
            {(salesChart?.labels ?? []).map((label, index) => (
              <p key={label}>
                {label} · ₩
                {new Intl.NumberFormat("ko-KR").format(
                  salesChart?.sales[index] ?? 0,
                )}
              </p>
            ))}
            {!salesChart?.labels?.length ? <p>매출 데이터가 없습니다.</p> : null}
          </div>
        </article>
      </section>
    </div>
  );
}
