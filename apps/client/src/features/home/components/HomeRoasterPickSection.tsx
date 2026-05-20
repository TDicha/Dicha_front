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
    <AppCard className="overflow-hidden rounded-[1.6rem] p-0" padding="none" variant="warm">
      <Link
        className="grid grid-cols-[minmax(0,1fr)_7rem] gap-4 p-4"
        to={`${ROUTES.products}/${product.id}`}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--text-muted)]">
            이달의 베스트 원두
          </p>
          <h3 className="mt-1 break-keep font-heading text-[clamp(1.25rem,5.5vw,1.4rem)] font-semibold tracking-[-0.04em] text-[var(--brand-primary)]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 break-keep text-xs leading-5 text-[var(--text-muted)]">
            {product.subtitle}
          </p>
          <p className="mt-3 text-sm font-bold text-[var(--brand-primary)]">
            {formatPrice(product.price)}원
          </p>
          <span className="mt-3 inline-flex items-center rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-inverse)]">
            자세히 보기
            <ArrowRight className="ml-1 size-3.5" />
          </span>
        </div>
        <div className="relative min-h-[7rem] overflow-hidden rounded-[1.2rem] bg-[var(--surface-cart-image)]">
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
