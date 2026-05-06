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

export function HomeQuickLinks({ quickLinks }: HomeQuickLinksProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
            빠른 진입
          </h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">구현된 주요 화면으로 바로 이동해 볼 수 있어요.</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickLinks.map((item) => (
          <Link key={item.to} to={item.to}>
            <AppCard className="h-full rounded-[1.25rem]">
              <p className="text-sm font-semibold text-[var(--color-primary-green)]">{item.label}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{item.description}</p>
            </AppCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
