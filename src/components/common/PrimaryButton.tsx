import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrimaryButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "h-12 rounded-[1rem] bg-[var(--color-primary-green)] px-5 text-sm font-semibold text-white shadow-[0_10px_18px_var(--rgba-29-62-43-016)] hover:bg-[color:var(--rgba-29-62-43-092)]",
        className,
      )}
      {...props}
    />
  );
}
