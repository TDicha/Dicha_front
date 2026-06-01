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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const from = (location.state as LoginLocationState | null)?.from?.pathname ?? ADMIN_ROUTES.dashboard;

  if (session) {
    return <Navigate replace to={ADMIN_ROUTES.dashboard} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn({ email, password, remember });
      navigate(from, { replace: true });
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : "관리자 로그인에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <p>회원, 상품, 카테고리를 한곳에서 관리합니다.</p>
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
            <p>관리자 계정으로 운영 콘솔에 접속합니다.</p>
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

          <button className="primary-action" disabled={isSubmitting} type="submit">
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <div className="auth-account-note">
            <strong>ADMIN 권한 필요</strong>
            <span>일반 회원 계정은 관리자 콘솔에 접근할 수 없습니다.</span>
          </div>
        </form>
      </section>
    </main>
  );
}
