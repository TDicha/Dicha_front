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
    <div className="sticky bottom-0 z-30 px-4 pb-safe pt-[var(--tabbar-dock-offset)] bg-white/60">
      <nav className="flex h-[var(--tabbar-height)] items-center justify-around rounded-[1.6rem] border border-[rgba(17,24,39,0.08)] bg-[rgba(255,255,255,0.94)] px-2 shadow-[0_16px_40px_rgba(22,28,22,0.14)] backdrop-blur-xl">
        {bottomTabItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              [
                "relative flex min-w-[72px] flex-col items-center gap-1 rounded-[1rem] px-3 py-3 text-[11px] font-medium transition",
                isActive
                  ? "text-[var(--color-primary-green)]"
                  : "text-[rgba(31,37,31,0.52)]",
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
                    isActive ? "bg-[var(--color-primary-green)] opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                <Icon className="size-[1.15rem]" strokeWidth={2.1} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
