import { ProductTileCard } from "@/components/common/ProductTileCard";
import {
  toAnalyticsItem,
  trackAnalyticsEvent,
} from "@/services/analytics";
import type { Product } from "@/shared/types/models";

interface ProductGridProps {
  products: Product[];
  itemListName?: string;
}

export function ProductGrid({
  products,
  itemListName = "product_list",
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-[var(--page-x)] pb-4 pt-3">
      {products.map((product) => (
        <ProductTileCard
          key={product.id}
          onSelect={() =>
            trackAnalyticsEvent("select_item", {
              item_list_name: itemListName,
              items: [toAnalyticsItem(product)],
            })
          }
          product={product}
        />
      ))}
    </div>
  );
}
