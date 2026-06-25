import { NavLink, useLocation, useMatches } from "react-router-dom";

import { bottomTabItems } from "@/shared/constants/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { trackAnalyticsEvent } from "@/services/analytics";

interface RouteHandle {
  chrome?: boolean;
}

export function BottomTabBar() {
  const matches = useMatches();
  const location = useLocation();
  const current = matches.at(-1);
  const handle = current?.handle as RouteHandle | undefined;
  const shouldHideForFixedCta =
    location.pathname === ROUTES.cart || location.pathname === ROUTES.purchase;

  if (handle?.chrome === false || shouldHideForFixedCta) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-30 bg-[var(--surface-menu-board)] pb-[env(safe-area-inset-bottom)] pt-1 shadow-[var(--shadow-tabbar-dock)]">
      <nav className="flex h-[var(--tabbar-height)] w-full items-center justify-around px-[var(--page-x)]">
        {bottomTabItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            className={({ isActive }: { isActive: boolean }) =>
              [
                "motion-clickable relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1.5 text-[11px] font-medium transition-[color,transform] duration-200 max-[360px]:text-[10px]",
                isActive
                  ? "-translate-y-1 font-semibold text-[var(--text-cafe-ink)]"
                  : "text-[var(--text-muted)]",
              ].join(" ")
            }
            onClick={() => {
              trackAnalyticsEvent("home_section_click", {
                section_name: "bottom_tab",
                target_path: to,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            to={to}
          >
            <Icon className="size-[1.1rem] transition-transform duration-200" strokeWidth={2.1} />
            <span className="whitespace-nowrap">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
