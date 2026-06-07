import { useEffect, useState } from "react";

import {
  fetchCategories,
  fetchMembers,
  fetchProducts,
} from "@/services/api/adminApi";

interface DashboardCounts {
  members: number;
  products: number;
  categories: number;
}

export function DashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts>({
    members: 0,
    products: 0,
    categories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setIsLoading(true);
    setError("");

    try {
      const [members, products, categories] = await Promise.all([
        fetchMembers(),
        fetchProducts(),
        fetchCategories(),
      ]);

      setCounts({
        members: members.length,
        products: products.length,
        categories: categories.length,
      });
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
          <span>회원</span>
          <strong>{isLoading ? "-" : `${counts.members}명`}</strong>
          <small>현재 회원 수</small>
        </article>
        <article className="admin-card metric-card">
          <span>판매 상품</span>
          <strong>{isLoading ? "-" : `${counts.products}개`}</strong>
          <small>판매 중인 상품</small>
        </article>
        <article className="admin-card metric-card">
          <span>카테고리</span>
          <strong>{isLoading ? "-" : `${counts.categories}개`}</strong>
          <small>등록된 분류</small>
        </article>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="dashboard-grid">
        <article className="admin-card">
          <div className="section-heading">
            <h2>사용 가능한 관리 기능</h2>
            <button onClick={() => void loadDashboard()} type="button">
              새로고침
            </button>
          </div>
          <div className="task-list">
            <p>관리자 로그인 / 세션 확인</p>
            <p>회원 목록 조회 및 강제 탈퇴</p>
            <p>상품 목록 / 등록 / 수정 / 삭제</p>
            <p>카테고리 목록 / 등록 / 삭제</p>
          </div>
        </article>

      </section>
    </div>
  );
}
