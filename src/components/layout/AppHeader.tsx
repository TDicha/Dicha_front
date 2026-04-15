import { ChevronLeft, Search, ShoppingCart } from "lucide-react";
import { Link, useLocation, useMatches, useNavigate } from "react-router-dom";

import { useCartStore } from "@/app/store";
import { ROUTES } from "@/shared/constants/routes";

interface RouteHandle {
  title?: string;
  chrome?: boolean;
}

export function AppHeader() {
  const matches = useMatches();
  const location = useLocation();
  const navigate = useNavigate();
  const current = matches.at(-1);
  const handle = current?.handle as RouteHandle | undefined;
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  if (handle?.chrome === false) {
    return null;
  }

  const isHome = location.pathname === "/";
  const shouldShowSearch = isHome || location.pathname === ROUTES.products;

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.home);
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[rgba(255,255,255,0.94)] px-5 backdrop-blur-md">
      {isHome ? (
        <>
          <div className="font-heading text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
            DICHA
          </div>
          <div className="flex items-center gap-3 text-[var(--color-primary-green)]">
            {shouldShowSearch ? (
              <Link
                aria-label="검색으로 이동"
                className="flex size-8 items-center justify-center rounded-full"
                to={ROUTES.search}
              >
                <Search className="size-4.5" />
              </Link>
            ) : null}
            <Link
              aria-label="장바구니로 이동"
              className="relative flex size-8 items-center justify-center rounded-full"
              to={ROUTES.cart}
            >
              <ShoppingCart className="size-4.5" />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-[9px] font-semibold text-white">
                {itemCount}
              </span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <button
            aria-label="뒤로가기"
            className="relative z-10 flex size-8 items-center justify-center rounded-full text-[var(--color-primary-green)]"
            onClick={handleBack}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>
          <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-heading text-base font-semibold text-[var(--color-primary-green)]">
            {handle?.title ?? "DICHA"}
          </h1>
          <div className="relative z-10 flex items-center gap-3 text-[var(--color-primary-green)]">
            {shouldShowSearch ? (
              <Link
                aria-label="검색으로 이동"
                className="flex size-8 items-center justify-center rounded-full"
                to={ROUTES.search}
              >
                <Search className="size-4.5" />
              </Link>
            ) : null}
            <Link
              aria-label="장바구니로 이동"
              className="relative flex size-8 items-center justify-center rounded-full"
              to={ROUTES.cart}
            >
              <ShoppingCart className="size-4.5" />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-[9px] font-semibold text-white">
                {itemCount}
              </span>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
