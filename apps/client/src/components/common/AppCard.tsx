import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type AppCardVariant =
  | "default"
  | "warm"
  | "wood"
  | "chalkboard"
  | "menu-board"
  | "danger"
  | "hero-green"
  | "hero-blue"
  | "hero-red";

const cardVariants: Record<AppCardVariant, string> = {
  default:
    "border border-[var(--border-ink-6)] bg-[var(--surface-base)] shadow-[0_12px_24px_var(--shadow-ink-alpha-5)]",
  warm: "bg-[linear-gradient(135deg,var(--surface-warm-card-start)_0%,var(--surface-warm-card-end)_100%)]",
  wood: "cafe-wood-grain bg-[linear-gradient(135deg,var(--gradient-wood-start)_0%,var(--gradient-wood-end)_100%)] text-[var(--text-inverse)] shadow-[var(--shadow-wood-card)]",
  chalkboard:
    "border border-[var(--border-chalk-highlight)] bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-[var(--shadow-chalkboard-card)]",
  "menu-board":
    "border-[3px] border-[var(--border-menu-board)] bg-[var(--surface-menu-board)] text-[var(--text-cafe-ink)] shadow-[var(--shadow-card-subtle)]",
  danger:
    "border border-[var(--border-danger)] bg-[var(--surface-danger-tint)]",
  "hero-green":
    "overflow-hidden bg-[linear-gradient(140deg,var(--gradient-card-green-start)_0%,var(--gradient-card-green-end)_100%)] text-[var(--text-inverse)] shadow-[var(--shadow-green-card)]",
  "hero-blue":
    "overflow-hidden bg-[linear-gradient(135deg,var(--gradient-card-blue-start)_0%,var(--gradient-card-blue-end)_100%)] text-[var(--text-inverse)] shadow-[0_18px_34px_var(--shadow-blue-alpha-18)]",
  "hero-red":
    "overflow-hidden bg-[linear-gradient(135deg,var(--gradient-card-red-start)_0%,var(--gradient-card-red-end)_100%)] text-[var(--text-inverse)] shadow-[var(--shadow-red-card)]",
};

export interface AppCardProps extends ComponentPropsWithoutRef<"section"> {
  variant?: AppCardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingVariants: Record<NonNullable<AppCardProps["padding"]>, string> = {
  none: "",
  sm: "px-4 py-3",
  md: "px-4 py-4",
  lg: "px-5 py-5",
};

export function AppCard({
  className,
  variant = "default",
  padding = "md",
  ...props
}: AppCardProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-card)]",
        cardVariants[variant],
        paddingVariants[padding],
        className,
      )}
      {...props}
    />
  );
}
