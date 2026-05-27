import { ProductTileCard } from "@/components/common/ProductTileCard";
import type { Product } from "@/shared/types/models";

interface SearchResultGridProps {
  products: Product[];
}

export function SearchResultGrid({ products }: SearchResultGridProps) {
  return (
    <section>
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Search Results
      </p>
      <h2 className="mt-1 font-heading text-[1.35rem] font-semibold text-[var(--text-cafe-ink)]">
        찾아낸 메뉴
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductTileCard
            key={product.id}
            compact
            product={product}
            showAddButton={false}
          />
        ))}
      </div>
    </section>
  );
}
