import type { ReactNode } from "react";

import { AppCard } from "@/components/common/AppCard";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  badge: string;
  title: ReactNode;
  description: string;
  icon: ReactNode;
  tone?: "green" | "red";
  children: ReactNode;
}

export function AuthShell({
  badge,
  title,
  description,
  icon,
  tone = "green",
  children,
}: AuthShellProps) {
  const headerClassName =
    tone === "red"
      ? "bg-[linear-gradient(135deg,var(--gradient-card-red-start)_0%,var(--gradient-card-red-end)_100%)]"
      : "bg-[linear-gradient(135deg,var(--gradient-card-green-start)_0%,var(--gradient-card-green-end)_100%)]";

  const iconClassName =
    tone === "red" ? "bg-[var(--overlay-white-12)] text-[var(--text-warm-inverse)]" : "bg-[var(--overlay-white-10)] text-[var(--icon-accent)]";

  return (
    <div className="page-shell justify-center bg-[var(--surface-base)] px-[var(--page-x)] py-8">
      <AppCard
        className="overflow-hidden rounded-[2rem] shadow-[0_20px_36px_var(--shadow-ink-alpha-8)]"
        padding="none"
      >
        <div className={cn("px-[var(--page-x)] py-7 text-[var(--text-inverse)]", headerClassName)}>
          <div className={cn("flex size-12 items-center justify-center rounded-full", iconClassName)}>
            {icon}
          </div>
          <p className="mt-4 text-xs font-semibold tracking-[0.24em] text-[var(--overlay-white-72)]">{badge}</p>
          <h1 className="mt-2 font-heading text-[2rem] font-semibold tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--overlay-white-82)]">{description}</p>
        </div>
        <div className="space-y-4 px-[var(--page-x)] py-6">{children}</div>
      </AppCard>
    </div>
  );
}
