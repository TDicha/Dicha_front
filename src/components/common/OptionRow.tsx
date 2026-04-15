interface OptionRowProps {
  label: string;
  description?: string;
  price?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function OptionRow({ label, description, price, selected = false, onClick }: OptionRowProps) {
  return (
    <button
      className={[
        "flex w-full items-start justify-between gap-3 rounded-[1.1rem] border px-4 py-4 text-left transition-all duration-200",
        selected
          ? "border-[rgba(0,117,74,0.36)] bg-[rgba(0,117,74,0.07)] shadow-[0_10px_18px_rgba(0,117,74,0.08)]"
          : "border-[rgba(29,62,43,0.09)] bg-white hover:border-[rgba(29,62,43,0.18)]",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--color-primary-green)]">{label}</p>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {price ? (
          <span className="text-sm font-medium text-[var(--color-primary-green)]">{price}</span>
        ) : null}
        <span
          className={[
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected
              ? "border-[rgb(0,117,74)] bg-[rgb(0,117,74)] text-white"
              : "border-[rgba(17,24,39,0.14)] bg-white text-transparent",
          ].join(" ")}
        >
          <span className="size-2 rounded-full bg-current" />
        </span>
      </div>
    </button>
  );
}
