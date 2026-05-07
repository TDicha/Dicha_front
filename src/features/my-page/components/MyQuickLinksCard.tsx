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
    <AppCard className="py-2">
      <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
        활동 바로가기
      </h2>
      {quickLinks.map(({ label, to }, index) => (
        <Link
          key={label}
          className={[
            "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[var(--color-primary-green)]",
            index < quickLinks.length - 1
              ? "border-b border-[var(--rgba-17-24-39-006)]"
              : "",
          ].join(" ")}
          to={to}
        >
          <span>{label}</span>
          <ChevronRight className="size-4 text-[var(--color-muted)]" />
        </Link>
      ))}
    </AppCard>
  );
}
