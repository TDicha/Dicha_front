import { Eye } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import type { Location } from "react-router-dom";

import { useAdminAuthStore } from "@/app/adminAuthStore";
import { ADMIN_ROUTES } from "@/app/navigation";

interface LoginLocationState {
  from?: Location;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAdminAuthStore((state) => state.session);
  const signIn = useAdminAuthStore((state) => state.signIn);
  const [email, setEmail] = useState("admin@dicha.co.kr");
  const [password, setPassword] = useState("admin1234");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const from = (location.state as LoginLocationState | null)?.from?.pathname ?? ADMIN_ROUTES.dashboard;

  if (session) {
    return <Navigate replace to={ADMIN_ROUTES.dashboard} />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = signIn({ email, password, remember });

    if (!success) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="brand-mark">
          <strong>DICHA</strong>
          <span>Admin Panel</span>
        </div>
        <div className="brand-copy">
          <h1>운영 흐름을 한눈에 관리하는 DICHA 관리자 콘솔</h1>
          <p>주문, 구독, 예약, 상품, 리뷰 데이터를 하나의 화면에서 빠르게 확인합니다.</p>
        </div>
        <div className="brand-preview-grid">
          <div className="preview-card">
            <span>오늘 매출</span>
            <strong>1,240,000원</strong>
            <small>전일 대비 15% 상승</small>
          </div>
          <div className="preview-card">
            <span>처리 대기</span>
            <strong>18건</strong>
            <small>재고 확인 5건 포함</small>
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-title">
            <strong>DICHA</strong>
            <span>Admin Panel</span>
          </div>
          <div>
            <h2>관리자 로그인</h2>
            <p>목업 계정으로 관리자 페이지 구조를 점검합니다.</p>
          </div>

          <label className="field">
            <span>이메일</span>
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={email}
            />
          </label>

          <label className="field">
            <span>비밀번호</span>
            <div className="password-field">
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
              <Eye size={16} />
            </div>
          </label>

          <div className="login-options">
            <label>
              <input
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                type="checkbox"
              />
              <span>로그인 상태 유지</span>
            </label>
            <button type="button">비밀번호 찾기</button>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-action" type="submit">
            로그인
          </button>

          <div className="mock-account-note">
            <strong>목업 계정</strong>
            <span>백엔드 연결 전까지 화면 테스트용 데이터로 진입합니다.</span>
          </div>
        </form>
      </section>
    </main>
  );
}
