import { ProductTileCard } from "@/components/common/ProductTileCard";
import type { Product } from "@/shared/types/models";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-4 py-4">
      {products.map((product) => (
        <ProductTileCard key={product.id} product={product} />
      ))}
    </div>
  );
}
