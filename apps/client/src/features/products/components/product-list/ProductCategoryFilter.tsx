import type { ProductCategoryKey, ProductCategoryOption } from "@/features/products/components/product-list/types";

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
    <section className="overflow-x-auto border-b border-[var(--border-ink-6)] px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-2">
        {categories.map((category) => {
          const isSelected = category.key === selectedCategory;

          return (
            <button
              key={category.key}
              className={[
                "rounded-full border px-3 py-2 text-sm font-medium transition",
                isSelected
                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--text-inverse)]"
                  : "border-[var(--border-ink-8)] bg-[var(--surface-base)] text-[var(--brand-primary)]",
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
