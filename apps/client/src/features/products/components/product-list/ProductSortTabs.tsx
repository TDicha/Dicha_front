import type { ProductSortKey, ProductSortOption } from "@/features/products/components/product-list/types";

interface ProductSortTabsProps {
  options: readonly ProductSortOption[];
  selectedSort: ProductSortKey;
  onSelectSort: (sort: ProductSortKey) => void;
}

export function ProductSortTabs({ options, selectedSort, onSelectSort }: ProductSortTabsProps) {
  return (
    <section className="flex items-center gap-3 border-b border-[var(--border-ink-6)] px-[var(--page-x)] py-3 text-sm text-[var(--text-muted)]">
      {options.map((sort, index) => (
        <div key={sort.key} className="flex items-center gap-3">
          <button
            className={selectedSort === sort.key ? "font-semibold text-[var(--brand-primary)]" : ""}
            onClick={() => onSelectSort(sort.key)}
            type="button"
          >
            {sort.label}
            {selectedSort === sort.key ? " ✓" : ""}
          </button>
          {index < options.length - 1 ? (
            <span className="text-[var(--border-ink-18)]">|</span>
          ) : null}
        </div>
      ))}
    </section>
  );
}
