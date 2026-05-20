import { ProductTileCard } from "@/components/common/ProductTileCard";
import type { Product } from "@/shared/types/models";

interface SearchResultGridProps {
  products: Product[];
}

export function SearchResultGrid({ products }: SearchResultGridProps) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductTileCard key={product.id} compact product={product} showAddButton={false} />
      ))}
    </section>
  );
}
