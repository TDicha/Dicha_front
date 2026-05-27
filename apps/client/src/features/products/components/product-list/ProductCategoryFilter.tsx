import type {
  ProductCategoryKey,
  ProductCategoryOption,
} from "@/features/products/components/product-list/types";

interface ProductCategoryFilterProps {
  categories: ProductCategoryOption[];
  selectedCategory: ProductCategoryKey;
  onSelectCategory: (category: ProductCategoryKey) => void;
}

export function ProductCategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProductCategoryFilterProps) {
  return (
    <section className="overflow-x-auto px-[var(--page-x)] py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-5 border-b border-[var(--border-tile-grout)]">
        {categories.map((category) => {
          const isSelected = category.key === selectedCategory;

          return (
            <button
              key={category.key}
              className={[
                "border-b-2 px-1 pb-3 pt-1 text-sm font-medium transition-colors",
                isSelected
                  ? "border-[var(--border-menu-board)] text-[var(--text-cafe-ink)]"
                  : "border-transparent text-[var(--text-muted)]",
              ].join(" ")}
              onClick={() => onSelectCategory(category.key)}
              type="button"
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
