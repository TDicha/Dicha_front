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
      ? "bg-[linear-gradient(135deg,var(--palette-8b2b1f)_0%,var(--palette-b24535)_100%)]"
      : "bg-[linear-gradient(135deg,var(--palette-1f4b37)_0%,var(--palette-143726)_100%)]";

  const iconClassName =
    tone === "red" ? "bg-white/12 text-[var(--palette-ffd8b5)]" : "bg-white/10 text-[var(--palette-f1d08b)]";

  return (
    <div className="page-shell justify-center bg-white px-5 py-8">
      <AppCard
        className="overflow-hidden rounded-[2rem] shadow-[0_20px_36px_var(--rgba-31-37-31-008)]"
        padding="none"
      >
        <div className={cn("px-6 py-7 text-white", headerClassName)}>
          <div className={cn("flex size-12 items-center justify-center rounded-full", iconClassName)}>
            {icon}
          </div>
          <p className="mt-4 text-xs font-semibold tracking-[0.24em] text-white/72">{badge}</p>
          <h1 className="mt-2 font-heading text-[2rem] font-semibold tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/82">{description}</p>
        </div>
        <div className="space-y-4 px-6 py-6">{children}</div>
      </AppCard>
    </div>
  );
}
