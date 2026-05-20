import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdminAuthStore } from "@/app/adminAuthStore";
import { ADMIN_ROUTES } from "@/app/navigation";
import { LoginPage } from "@/pages/LoginPage";

export function ProtectedRoute() {
  const session = useAdminAuthStore((state) => state.session);
  const location = useLocation();

  if (!session) {
    return <Navigate replace state={{ from: location }} to={ADMIN_ROUTES.login} />;
  }

  return <Outlet />;
}

export function LoginRedirect() {
  const session = useAdminAuthStore((state) => state.session);

  if (session) {
    return <Navigate replace to={ADMIN_ROUTES.dashboard} />;
  }

  return <LoginPage />;
}
