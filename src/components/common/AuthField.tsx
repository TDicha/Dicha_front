import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface AuthFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  icon?: ReactNode;
}

export function AuthField({ label, icon, className, ...props }: AuthFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[var(--color-muted)]">{label}</span>
      <div className="flex items-center gap-3 rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3">
        {icon}
        <input
          className={[
            "w-full bg-transparent text-sm text-[var(--color-primary-green)] placeholder:text-[var(--color-muted)]",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
    </label>
  );
}
