import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
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
    <AppCard
      className="-mx-[var(--page-x)] rounded-none border-x-0 px-[var(--page-x)] py-6"
      padding="none"
      variant="chalkboard"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-chalk-muted)]">
            Menu Board
          </p>
          <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--text-chalk)]">
            BEST 원두
          </h3>
          <p className="mt-1 text-sm text-[var(--text-chalk-muted)]">
            많은 분들이 선택한 DICHA 대표 원두
          </p>
        </div>
        {remainingProductCount > 0 ? (
          <Link
            className="mt-1 shrink-0 rounded-full border border-[var(--border-chalk-highlight)] px-3 py-1.5 text-xs font-semibold text-[var(--text-chalk)]"
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
              appearance="chalkboard"
              product={product}
              showAddButton={false}
            />
          ))}
        </div>
      </div>
    </AppCard>
  );
}
