interface OrderFilterOption<TKey extends string> {
  key: TKey;
  label: string;
}

interface OrderFilterTabsProps<TKey extends string> {
  filter: TKey;
  options: readonly OrderFilterOption<TKey>[];
  onChange: (filter: TKey) => void;
}

export function OrderFilterTabs<TKey extends string>({
  filter,
  options,
  onChange,
}: OrderFilterTabsProps<TKey>) {
  return (
    <section className="flex gap-2 overflow-x-auto pb-2">
      {options.map((option) => (
        <button
          key={option.key}
          className={[
            "rounded-full px-4 py-2 text-sm font-medium transition",
            filter === option.key ? "bg-[var(--brand-secondary)] text-[var(--text-inverse)]" : "bg-[var(--surface-base)] text-[var(--brand-secondary)]",
          ].join(" ")}
          onClick={() => onChange(option.key)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </section>
  );
}
