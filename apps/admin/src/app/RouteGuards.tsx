import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdminAuthStore } from "@/app/adminAuthStore";
import { ADMIN_ROUTES } from "@/app/navigation";
import { LoginPage } from "@/pages/LoginPage";

export function ProtectedRoute() {
  const session = useAdminAuthStore((state) => state.session);
  const isHydrating = useAdminAuthStore((state) => state.isHydrating);
  const location = useLocation();

  if (isHydrating) {
    return <div className="admin-route-loading">관리자 세션을 확인하는 중입니다.</div>;
  }

  if (!session) {
    return <Navigate replace state={{ from: location }} to={ADMIN_ROUTES.login} />;
  }

  return <Outlet />;
}

export function LoginRedirect() {
  const session = useAdminAuthStore((state) => state.session);
  const isHydrating = useAdminAuthStore((state) => state.isHydrating);

  if (isHydrating) {
    return <div className="admin-route-loading">관리자 세션을 확인하는 중입니다.</div>;
  }

  if (session) {
    return <Navigate replace to={ADMIN_ROUTES.dashboard} />;
  }

  return <LoginPage />;
}
