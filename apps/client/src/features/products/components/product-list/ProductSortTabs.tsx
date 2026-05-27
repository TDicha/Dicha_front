import type {
  ProductSortKey,
  ProductSortOption,
} from "@/features/products/components/product-list/types";

interface ProductSortTabsProps {
  options: readonly ProductSortOption[];
  selectedSort: ProductSortKey;
  onSelectSort: (sort: ProductSortKey) => void;
}

export function ProductSortTabs({
  options,
  selectedSort,
  onSelectSort,
}: ProductSortTabsProps) {
  return (
    <section className="flex items-center justify-end gap-3 px-[var(--page-x)] pb-1 pt-2 text-xs text-[var(--text-muted)]">
      {options.map((sort, index) => (
        <div key={sort.key} className="flex items-center gap-3">
          <button
            className={
              selectedSort === sort.key
                ? "font-semibold text-[var(--text-cafe-ink)]"
                : ""
            }
            onClick={() => onSelectSort(sort.key)}
            type="button"
          >
            {sort.label}
          </button>
          {index < options.length - 1 ? (
            <span className="text-[var(--border-ink-18)]">|</span>
          ) : null}
        </div>
      ))}
    </section>
  );
}
