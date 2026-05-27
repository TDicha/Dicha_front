import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";
import type { Product } from "@/shared/types/models";

interface HomeRoasterPickSectionProps {
  product?: Product;
}

export function HomeRoasterPickSection({
  product,
}: HomeRoasterPickSectionProps) {
  if (!product) {
    return null;
  }

  return (
    <AppCard className="rounded-[0.45rem] p-0" padding="none" variant="wood">
      <Link
        className="grid grid-cols-[minmax(0,1fr)_7rem] gap-4 p-4"
        to={`${ROUTES.products}/${product.id}`}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-wood-muted)]">
            Roaster's Pick
          </p>
          <h3 className="mt-2 break-keep font-heading text-[clamp(1.25rem,5.5vw,1.4rem)] font-semibold tracking-[-0.04em] text-[var(--text-inverse)]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 break-keep text-xs leading-5 text-[var(--text-wood-muted)]">
            {product.subtitle}
          </p>
          <p className="mt-3 text-sm font-bold text-[var(--text-inverse)]">
            {formatPrice(product.price)}원
          </p>
          <span className="mt-3 inline-flex items-center border border-[var(--text-wood-muted)] bg-[var(--surface-chalkboard)] px-3 py-1.5 text-xs font-semibold text-[var(--text-chalk)]">
            자세히 보기
            <ArrowRight className="ml-1 size-3.5" />
          </span>
        </div>
        <div className="relative min-h-[7rem] overflow-hidden rounded-[0.25rem] border border-[var(--text-wood-muted)] bg-[var(--surface-cart-image)]">
          <img
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            src={product.image}
          />
        </div>
      </Link>
    </AppCard>
  );
}
