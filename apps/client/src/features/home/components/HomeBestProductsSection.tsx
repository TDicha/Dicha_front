import { Link } from "react-router-dom";

import { ProductTileCard } from "@/components/common/ProductTileCard";
import { ROUTES } from "@/shared/constants/routes";
import type { Product } from "@/shared/types/models";

interface HomeBestProductsSectionProps {
  products: Product[];
}

const visibleProductCount = 3;

export function HomeBestProductsSection({
  products,
}: HomeBestProductsSectionProps) {
  const visibleProducts = products.slice(0, visibleProductCount);
  const remainingProductCount = Math.max(
    products.length - visibleProducts.length,
    0,
  );

  if (!visibleProducts.length) {
    return null;
  }

  return (
    <section>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--brand-primary)]">
            BEST 원두
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            많은 분들이 선택한 DICHA 대표 원두
          </p>
        </div>
        {remainingProductCount > 0 ? (
          <Link
            className="mt-1 shrink-0 rounded-full bg-[var(--surface-brand-tint-6)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-primary)]"
            to={ROUTES.products}
          >
            더보기 {remainingProductCount}
          </Link>
        ) : null}
      </div>

      <div className="mobile-horizontal-scroll -mx-[var(--page-x)] mt-4 px-[var(--page-x)] pb-2">
        <div className="flex w-max gap-3">
          {visibleProducts.map((product) => (
            <ProductTileCard
              key={product.id}
              className="w-[var(--mobile-card-width)] shrink-0 scroll-ml-[var(--page-x)] snap-start"
              compact
              product={product}
              showAddButton={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
