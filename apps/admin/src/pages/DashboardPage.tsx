const metrics = [
  { label: "신규 주문", value: "12건", change: "+3건" },
  { label: "오늘 매출", value: "1,240,000원", change: "+15%" },
  { label: "신규 가입", value: "5명", change: "+2명" },
  { label: "신규 리뷰", value: "8건", change: "-1건", negative: true },
];

const salesBars = [42, 54, 48, 62, 74, 56, 88];

export function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="metric-grid">
        {metrics.map((metric) => (
          <article className="admin-card metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small className={metric.negative ? "negative" : "positive"}>{metric.change}</small>
          </article>
        ))}
      </section>

      <section className="admin-card chart-card">
        <div className="section-heading">
          <h2>최근 7일 매출 추이</h2>
          <button type="button">7일</button>
        </div>
        <div className="bar-chart" aria-label="최근 7일 매출 추이">
          {salesBars.map((height, index) => (
            <div className="bar-column" key={index}>
              <span style={{ height: `${height}%` }} />
              <small>{`D-${6 - index}`}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="admin-card">
          <div className="section-heading">
            <h2>최근 주문</h2>
            <button type="button">전체 보기</button>
          </div>
          <div className="simple-table">
            <div className="table-row table-head">
              <span>주문번호</span>
              <span>고객명</span>
              <span>상태</span>
            </div>
            {["20260405001", "20260405002", "20260405003"].map((orderNo, index) => (
              <div className="table-row" key={orderNo}>
                <span>{orderNo}</span>
                <span>{["홍길동", "김민수", "이지영"][index]}</span>
                <span>{["배송준비", "결제완료", "배송중"][index]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <div className="section-heading">
            <h2>알림 / 할 일</h2>
          </div>
          <div className="task-list">
            <p>에티오피아 예가체프 재고 5개 미만</p>
            <p>답변 대기 문의 3건</p>
            <p>바리스타반 14:00 예약 4명</p>
          </div>
        </article>
      </section>
    </div>
  );
}
