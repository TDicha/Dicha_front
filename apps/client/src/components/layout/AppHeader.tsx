import { ChevronLeft, Search, ShoppingCart } from "lucide-react";
import { Link, useLocation, useMatches, useNavigate } from "react-router-dom";

import { useCartStore, usePreferenceStore } from "@/app/store";
import { trackAnalyticsEvent } from "@/services/analytics";
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
  const tasteStep = usePreferenceStore((state) => state.step);
  const tasteResult = usePreferenceStore((state) => state.result);
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  if (handle?.chrome === false) {
    return null;
  }

  const isHome = location.pathname === "/";
  const shouldShowSearch = isHome || location.pathname === ROUTES.products;
  const headerTitle =
    location.pathname === ROUTES.tasteTest
      ? tasteStep === "result"
        ? tasteResult
          ? "취향 테스트 결과"
          : "취향 분석 중"
        : "취향 테스트"
      : handle?.title;

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.home);
  }

  const headerLogoSrc = "/dicha-wordmark.png";

  return (
    <header className="sticky top-0 z-20 flex h-[var(--header-height)] items-center justify-between border-b border-[var(--border-ink-6)] bg-[var(--surface-card-glass-strong)] px-[var(--page-x)] backdrop-blur-md">
      {isHome ? (
        <>
          <div className="flex h-10 items-center bg-[var(--surface-chalkboard)] px-3">
            <img
              alt="DICHA"
              src={headerLogoSrc}
              className="h-6 w-auto brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-3 text-[var(--brand-primary)]">
            {shouldShowSearch ? (
              <Link
                aria-label="검색으로 이동"
                className="flex size-8 items-center justify-center rounded-full"
                onClick={() =>
                  trackAnalyticsEvent("home_section_click", {
                    section_name: "header",
                    target_path: ROUTES.search,
                  })
                }
                to={ROUTES.search}
              >
                <Search className="size-4.5" />
              </Link>
            ) : null}
            <Link
              aria-label="장바구니로 이동"
              className="relative flex size-8 items-center justify-center rounded-full"
              onClick={() =>
                trackAnalyticsEvent("home_section_click", {
                  section_name: "header",
                  target_path: ROUTES.cart,
                })
              }
              to={ROUTES.cart}
            >
              <ShoppingCart className="size-4.5" />
              <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--brand-accent)] px-1 text-[9px] font-semibold text-[var(--text-on-accent)]">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <button
            aria-label="뒤로가기"
            className="relative z-10 flex size-8 items-center justify-center rounded-full text-[var(--brand-primary)]"
            onClick={handleBack}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>
          <h1 className="pointer-events-none absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-center font-heading text-base font-semibold text-[var(--brand-primary)]">
            {headerTitle ?? (
              <span className="mx-auto inline-flex h-6 items-center bg-[var(--surface-chalkboard)] px-2">
                <img
                  alt="DICHA"
                  src={headerLogoSrc}
                  className="h-3.5 w-auto brightness-0 invert"
                />
              </span>
            )}
          </h1>
          <div className="relative z-10 flex items-center gap-3 text-[var(--brand-primary)]">
            {shouldShowSearch ? (
              <Link
                aria-label="검색으로 이동"
                className="flex size-8 items-center justify-center rounded-full"
                onClick={() =>
                  trackAnalyticsEvent("home_section_click", {
                    section_name: "header",
                    target_path: ROUTES.search,
                  })
                }
                to={ROUTES.search}
              >
                <Search className="size-4.5" />
              </Link>
            ) : null}
            <Link
              aria-label="장바구니로 이동"
              className="relative flex size-8 items-center justify-center rounded-full"
              onClick={() =>
                trackAnalyticsEvent("home_section_click", {
                  section_name: "header",
                  target_path: ROUTES.cart,
                })
              }
              to={ROUTES.cart}
            >
              <ShoppingCart className="size-4.5" />
              <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--brand-accent)] px-1 text-[9px] font-semibold text-[var(--text-on-accent)]">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
