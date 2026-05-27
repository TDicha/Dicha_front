import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { ROUTES } from "@/shared/constants/routes";

const quickLinks = [
  { label: "주문 조회", to: ROUTES.orders },
  { label: "구독 관리", to: ROUTES.subscription },
  { label: "나의 블렌드", to: ROUTES.myBlend },
] as const;

export function MyQuickLinksCard() {
  return (
    <AppCard
      className="mx-[var(--page-x)] rounded-[1.55rem] py-2"
      variant="menu-board"
    >
      <p className="pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Quick Link
      </p>
      <h2 className="pb-3 pt-1 font-heading text-lg font-semibold text-[var(--text-cafe-ink)]">
        활동 바로가기
      </h2>
      {quickLinks.map(({ label, to }, index) => (
        <Link
          key={label}
          className={[
            "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--text-cafe-ink)]",
            index < quickLinks.length - 1
              ? "border-b border-[var(--border-tile-grout)]"
              : "",
          ].join(" ")}
          to={to}
        >
          <span>{label}</span>
          <ChevronRight className="size-4 text-[var(--text-muted)]" />
        </Link>
      ))}
    </AppCard>
  );
}
