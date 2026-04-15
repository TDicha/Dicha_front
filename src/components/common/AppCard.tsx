import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type AppCardVariant =
  | "default"
  | "muted"
  | "warm"
  | "danger"
  | "hero-green"
  | "hero-blue"
  | "hero-red";

const cardVariants: Record<AppCardVariant, string> = {
  default:
    "border border-[rgba(17,24,39,0.06)] bg-white shadow-[0_12px_24px_rgba(31,37,31,0.05)]",
  muted: "bg-[rgba(29,62,43,0.04)]",
  warm: "bg-[linear-gradient(135deg,#f8f2e4_0%,#ece1c9_100%)]",
  danger: "border border-[rgba(148,35,30,0.08)] bg-[rgba(148,35,30,0.03)]",
  "hero-green":
    "overflow-hidden bg-[linear-gradient(140deg,#1f4b37_0%,#143726_100%)] text-white shadow-[0_20px_36px_rgba(20,55,38,0.18)]",
  "hero-blue":
    "overflow-hidden bg-[linear-gradient(135deg,#24406d_0%,#52699a_100%)] text-white shadow-[0_18px_34px_rgba(42,54,99,0.18)]",
  "hero-red":
    "overflow-hidden bg-[linear-gradient(135deg,#8b2b1f_0%,#b24535_100%)] text-white shadow-[0_20px_36px_rgba(148,35,30,0.16)]",
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
        "rounded-[1.45rem]",
        cardVariants[variant],
        paddingVariants[padding],
        className,
      )}
      {...props}
    />
  );
}
