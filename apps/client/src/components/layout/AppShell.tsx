import { Outlet } from "react-router-dom";

import { AppHeader } from "@/components/layout/AppHeader";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

export function AppShell() {
  return (
    <div className="page-shell">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
