import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ROUTES } from "@/shared/constants/routes";

export function RouteGuard() {
  const location = useLocation();
  const status = useAuthStore((state) => state.status);

  if (status === "checking") {
    return <LoadingScreen message="로그인 상태 확인 중" />;
  }

  if (status !== "authenticated") {
    return (
      <Navigate replace state={{ from: location.pathname }} to={ROUTES.login} />
    );
  }

  return <Outlet />;
}
