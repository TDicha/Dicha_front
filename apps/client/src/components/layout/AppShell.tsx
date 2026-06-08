import { Outlet, useLocation } from "react-router-dom";

import { AppHeader } from "@/components/layout/AppHeader";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

export function AppShell() {
  const location = useLocation();

  return (
    <div className="page-shell">
      <AppHeader />
      <main
        key={`${location.pathname}${location.search}`}
        className="route-transition flex-1"
      >
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
