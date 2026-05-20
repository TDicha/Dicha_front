import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { adminPageTitles } from "@/app/navigation";
import { AdminSidebar } from "@/layout/AdminSidebar";

export function AdminShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const title = adminPageTitles.get(location.pathname) ?? "DICHA Admin";

  return (
    <div className="admin-shell">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            aria-label="사이드바 열기"
            className="icon-button mobile-only"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow">DICHA Admin Console</p>
            <h1>{title}</h1>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
