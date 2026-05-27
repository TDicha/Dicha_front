import type {
  ProductTypeKey,
  ProductTypeOption,
} from "@/features/products/components/product-list/types";

interface ProductTypeTabsProps {
  options: readonly ProductTypeOption[];
  selectedType: ProductTypeKey;
  onSelectType: (type: ProductTypeKey) => void;
}

export function ProductTypeTabs({
  options,
  selectedType,
  onSelectType,
}: ProductTypeTabsProps) {
  const activeOption = options.find((option) => option.key === selectedType);

  return (
    <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] pb-4 pt-3 text-[var(--text-chalk)]">
      <div className="grid grid-cols-3 border-b border-[var(--border-chalk-highlight)]">
        {options.map((option) => {
          const isSelected = option.key === selectedType;

          return (
            <button
              key={option.key}
              className={[
                "border-b-2 px-1 py-3 text-sm font-semibold transition-colors",
                isSelected
                  ? "border-[var(--gradient-wood-start)] text-[var(--text-chalk)]"
                  : "border-transparent text-[var(--text-chalk-muted)]",
              ].join(" ")}
              onClick={() => onSelectType(option.key)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <p className="pt-3 text-xs leading-5 text-[var(--text-chalk-muted)]">
        {activeOption?.description}
      </p>
    </section>
  );
}
