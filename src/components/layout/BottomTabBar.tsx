import { NavLink, useMatches } from "react-router-dom";

import { bottomTabItems } from "@/shared/constants/navigation";

interface RouteHandle {
  chrome?: boolean;
}

export function BottomTabBar() {
  const matches = useMatches();
  const current = matches.at(-1);
  const handle = current?.handle as RouteHandle | undefined;

  if (handle?.chrome === false) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 flex h-[var(--tabbar-height)] w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-[rgba(17,24,39,0.08)] bg-[rgba(255,255,255,0.96)] px-2 pb-safe backdrop-blur-md">
      {bottomTabItems.map(({ icon: Icon, label, to }) => (
        <NavLink
          key={to}
          className={({ isActive }) =>
            [
              "relative flex min-w-[72px] flex-col items-center gap-1 px-3 py-3 text-[11px] font-medium transition",
              isActive
                ? "text-[var(--color-primary-green)]"
                : "text-[rgba(31,37,31,0.52)]",
            ].join(" ")
          }
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
  );
}
