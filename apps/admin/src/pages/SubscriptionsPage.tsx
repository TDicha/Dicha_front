const REQUIRED_SUBSCRIPTION_APIS = [
  "GET /api/admin/subscriptions?status=&memberName=&productName=",
  "PATCH /api/admin/subscriptions/{id}/pause",
  "PATCH /api/admin/subscriptions/{id}/resume",
  "DELETE /api/admin/subscriptions/{id}",
];

export function SubscriptionsPage() {
  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="admin-card metric-card">
          <span>구독 중</span>
          <strong>-</strong>
          <small>관리자 전체 조회 API 필요</small>
        </article>
        <article className="admin-card metric-card">
          <span>일시정지</span>
          <strong>-</strong>
          <small>상태별 집계 대기</small>
        </article>
        <article className="admin-card metric-card">
          <span>다음 배송</span>
          <strong>-</strong>
          <small>배송 예정일 기준</small>
        </article>
        <article className="admin-card metric-card">
          <span>해지</span>
          <strong>-</strong>
          <small>상태별 집계 대기</small>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>구독 배송 관리</h2>
            <p className="section-description">
              고객별 정기 배송 상태, 다음 배송일, 배송지를 관리하는 화면입니다.
              현재 백엔드는 회원 본인용 구독 API만 제공하고 있어 관리자 전체
              조회는 연결 대기 상태입니다.
            </p>
          </div>
          <span className="status-badge warning">API 필요</span>
        </div>

        <div className="admin-filter-bar">
          <label className="field">
            고객명
            <input disabled placeholder="관리자 조회 API 연결 후 사용" />
          </label>
          <label className="field">
            상품명
            <input disabled placeholder="원두/드립백/세트" />
          </label>
          <label className="field">
            상태
            <select disabled>
              <option>전체</option>
              <option>구독 중</option>
              <option>일시정지</option>
              <option>해지</option>
            </select>
          </label>
          <button className="primary-action compact align-end" disabled type="button">
            조회
          </button>
        </div>

        <div className="simple-table admin-data-table subscriptions-table">
          <div className="table-row table-head">
            <span>고객</span>
            <span>상품</span>
            <span>배송지</span>
            <span>다음 배송</span>
            <span>상태</span>
            <span>관리</span>
          </div>
          <div className="table-row table-empty">
            <span>관리자용 구독 목록 API가 추가되면 이 영역에 연결됩니다.</span>
          </div>
        </div>
      </section>

      <section className="admin-card integration-card">
        <div className="section-heading">
          <div>
            <h2>백엔드 연결 체크</h2>
            <p className="section-description">
              현재 확인된 구독 API는 로그인 회원 본인의 신청/조회/일시정지/재개/해지
              용도입니다.
            </p>
          </div>
        </div>
        <div className="api-contract-list">
          {REQUIRED_SUBSCRIPTION_APIS.map((api) => (
            <code key={api}>{api}</code>
          ))}
        </div>
      </section>
    </div>
  );
}
