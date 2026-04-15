import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { ROUTES } from "@/shared/constants/routes";

export function RouteGuard() {
  const location = useLocation();
  const status = useAuthStore((state) => state.status);

  if (status !== "authenticated") {
    return <Navigate replace state={{ from: location.pathname }} to={ROUTES.login} />;
  }

  return <Outlet />;
}
