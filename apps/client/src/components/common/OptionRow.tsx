interface OptionRowProps {
  label: string;
  description?: string;
  price?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function OptionRow({
  label,
  description,
  price,
  selected = false,
  onClick,
}: OptionRowProps) {
  return (
    <button
      className={[
        "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-all duration-200",
        selected
          ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
          : "bg-[var(--surface-cafe-tile)]",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <div className="min-w-0 flex-1">
        <p
          className={[
            "text-sm font-semibold",
            selected
              ? "text-[var(--text-chalk)]"
              : "text-[var(--text-cafe-ink)]",
          ].join(" ")}
        >
          {label}
        </p>
        {description ? (
          <p
            className={[
              "mt-1 text-xs leading-5",
              selected
                ? "text-[var(--text-chalk-muted)]"
                : "text-[var(--text-muted)]",
            ].join(" ")}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {price ? (
          <span
            className={
              selected
                ? "text-sm font-medium text-[var(--text-chalk)]"
                : "text-sm font-medium text-[var(--text-cafe-ink)]"
            }
          >
            {price}
          </span>
        ) : null}
        <span
          className={[
            "mt-0.5 flex size-5 shrink-0 items-center justify-center transition-colors",
            selected
              ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
              : "bg-[var(--surface-menu-board)] text-[var(--text-transparent)]",
          ].join(" ")}
        >
          <span className="size-2 bg-current" />
        </span>
      </div>
    </button>
  );
}
