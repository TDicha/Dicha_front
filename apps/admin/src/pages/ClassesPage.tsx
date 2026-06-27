const REQUIRED_CLASS_APIS = [
  "GET /api/admin/classes",
  "POST /api/admin/classes",
  "GET /api/admin/class-reservations?date=&status=",
  "PATCH /api/admin/class-reservations/{id}/status",
];

export function ClassesPage() {
  return (
    <div className="page-stack">
      <section className="metric-grid">
        <article className="admin-card metric-card">
          <span>오늘 예약</span>
          <strong>-</strong>
          <small>예약 API 필요</small>
        </article>
        <article className="admin-card metric-card">
          <span>대기</span>
          <strong>-</strong>
          <small>승인/확정 전</small>
        </article>
        <article className="admin-card metric-card">
          <span>확정</span>
          <strong>-</strong>
          <small>수업 참여 예정</small>
        </article>
        <article className="admin-card metric-card">
          <span>취소</span>
          <strong>-</strong>
          <small>예약 취소</small>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>클래스 예약 관리</h2>
            <p className="section-description">
              고객이 선택한 날짜와 시간대별 클래스 신청을 확인하고 상태를 바꾸는
              화면입니다. 백엔드에는 아직 클래스/예약 도메인 API가 없어 연결 대기
              상태입니다.
            </p>
          </div>
          <span className="status-badge warning">API 필요</span>
        </div>

        <div className="admin-filter-bar">
          <label className="field">
            날짜
            <input disabled type="date" />
          </label>
          <label className="field">
            클래스
            <input disabled placeholder="핸드드립 / 테이스팅 / 로스팅" />
          </label>
          <label className="field">
            상태
            <select disabled>
              <option>전체</option>
              <option>대기</option>
              <option>확정</option>
              <option>취소</option>
            </select>
          </label>
          <button className="primary-action compact align-end" disabled type="button">
            조회
          </button>
        </div>

        <div className="simple-table admin-data-table classes-table">
          <div className="table-row table-head">
            <span>예약자</span>
            <span>클래스</span>
            <span>일정</span>
            <span>인원</span>
            <span>상태</span>
            <span>관리</span>
          </div>
          <div className="table-row table-empty">
            <span>클래스 예약 API가 추가되면 신청 목록을 이곳에 표시합니다.</span>
          </div>
        </div>
      </section>

      <section className="admin-card integration-card">
        <div className="section-heading">
          <div>
            <h2>필요 API</h2>
            <p className="section-description">
              고객 앱의 클래스 신청 UI와 맞추려면 날짜별 시간 슬롯과 예약 상태
              변경 API가 필요합니다.
            </p>
          </div>
        </div>
        <div className="api-contract-list">
          {REQUIRED_CLASS_APIS.map((api) => (
            <code key={api}>{api}</code>
          ))}
        </div>
      </section>
    </div>
  );
}
