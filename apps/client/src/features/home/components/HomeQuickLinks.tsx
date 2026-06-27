import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";

interface HomeQuickLink {
  label: string;
  description: string;
  to: string;
}

interface HomeQuickLinksProps {
  quickLinks: HomeQuickLink[];
}

const subscriptionBadgeImage = "/dicha-subscription-badge.png";

export function HomeQuickLinks({ quickLinks }: HomeQuickLinksProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--brand-primary)]">
            빠른 진입
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            구현된 주요 화면으로 바로 이동해 볼 수 있어요.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickLinks.map((item) => (
          <Link key={item.to} className="min-w-0" to={item.to}>
            <AppCard className="relative h-full overflow-hidden rounded-[1.25rem]">
              {item.label.includes("구독") ? (
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute right-3 top-3 size-11 object-contain"
                  src={subscriptionBadgeImage}
                />
              ) : null}
              <p className="max-w-[calc(100%-3.25rem)] break-keep text-sm font-semibold leading-5 text-[var(--brand-primary)]">
                {item.label}
              </p>
              <p className="mt-2 break-keep text-xs leading-5 text-[var(--text-muted)]">
                {item.description}
              </p>
            </AppCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
