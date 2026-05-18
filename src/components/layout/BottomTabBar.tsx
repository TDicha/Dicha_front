import { NavLink, useLocation, useMatches } from "react-router-dom";

import { bottomTabItems } from "@/shared/constants/navigation";
import { ROUTES } from "@/shared/constants/routes";

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
    <div className="sticky bottom-0 z-30 bg-[var(--overlay-white-60)] px-[var(--page-x)] pb-safe pt-[var(--tabbar-dock-offset)]">
      <nav className="flex h-[var(--tabbar-height)] items-center justify-around rounded-[1.6rem] border border-[var(--border-ink-8)] bg-[var(--surface-card-glass-strong)] px-2 shadow-[0_16px_40px_var(--overlay-ink-14)] backdrop-blur-xl">
        {bottomTabItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              [
                "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[1rem] px-2 py-3 text-[11px] font-medium transition max-[360px]:px-1 max-[360px]:text-[10px]",
                isActive
                  ? "text-[var(--brand-primary)]"
                  : "text-[var(--overlay-ink-52)]",
              ].join(" ")
            }
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to={to}
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    "absolute left-1/2 top-0 h-[3px] w-6 -translate-x-1/2 rounded-b-full transition-opacity",
                    isActive ? "bg-[var(--brand-primary)] opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                <Icon className="size-[1.15rem]" strokeWidth={2.1} />
                <span className="whitespace-nowrap">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
