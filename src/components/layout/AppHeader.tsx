import { ChevronLeft, Search, ShoppingCart } from "lucide-react";
import { useLocation, useMatches } from "react-router-dom";

interface RouteHandle {
  title?: string;
  chrome?: boolean;
}

export function AppHeader() {
  const matches = useMatches();
  const location = useLocation();
  const current = matches.at(-1);
  const handle = current?.handle as RouteHandle | undefined;

  if (handle?.chrome === false) {
    return null;
  }

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[rgba(255,255,255,0.94)] px-5 backdrop-blur-md">
      {isHome ? (
        <div className="font-heading text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
          DICHA
        </div>
      ) : (
        <>
          <button
            aria-label="뒤로가기"
            className="flex size-8 items-center justify-center rounded-full text-[var(--color-primary-green)]"
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 font-heading text-base font-semibold text-[var(--color-primary-green)]">
            {handle?.title ?? "DICHA"}
          </h1>
          <div className="flex items-center gap-3 text-[var(--color-primary-green)]">
            <Search className="size-4.5" />
            <div className="relative">
              <ShoppingCart className="size-4.5" />
              <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-[9px] font-semibold text-white">
                2
              </span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
