import { ProductTileCard } from "@/components/common/ProductTileCard";
import type { Product } from "@/shared/types/models";

interface HomeBestProductsSectionProps {
  products: Product[];
}

export function HomeBestProductsSection({ products }: HomeBestProductsSectionProps) {
  return (
    <section>
      <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
        BEST 원두
      </h3>
      <p className="mt-1 text-sm text-[var(--color-muted)]">많은 분들이 선택한 DICHA 대표 원두</p>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductTileCard
            key={product.id}
            className="w-[8.25rem] shrink-0"
            compact
            product={product}
            showOrigin={false}
            showRating={false}
          />
        ))}
      </div>
    </section>
  );
}
