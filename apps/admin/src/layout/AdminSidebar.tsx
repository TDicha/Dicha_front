import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAdminAuthStore } from "@/app/adminAuthStore";
import { ADMIN_ROUTES, adminNavigationItems } from "@/app/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const session = useAdminAuthStore((state) => state.session);
  const signOut = useAdminAuthStore((state) => state.signOut);

  async function handleSignOut() {
    await signOut();
    navigate(ADMIN_ROUTES.login);
  }

  return (
    <>
      <aside className={isOpen ? "admin-sidebar is-open" : "admin-sidebar"}>
        <div className="sidebar-brand">
          <strong>DICHA</strong>
          <span>Admin Panel</span>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">{session?.name.slice(0, 1) ?? "관"}</div>
          <div>
            <strong>{session?.name ?? "관리자"}</strong>
            <span>{session?.role ?? "ADMIN"}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="관리자 메뉴">
          {adminNavigationItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "sidebar-link is-active" : "sidebar-link"
              }
              onClick={onClose}
              to={to}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={handleSignOut} type="button">
          <LogOut size={18} />
          <span>로그아웃</span>
        </button>
      </aside>
      {isOpen ? (
        <button
          aria-label="사이드바 닫기"
          className="sidebar-backdrop"
          onClick={onClose}
          type="button"
        />
      ) : null}
    </>
  );
}
