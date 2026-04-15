import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { formatPrice } from "@/shared/utils/format";
import type { Product } from "@/shared/types/models";

interface ProductTileCardProps {
  product: Product;
  href?: string;
  compact?: boolean;
  showOrigin?: boolean;
  showRating?: boolean;
  showAddButton?: boolean;
  className?: string;
}

export function ProductTileCard({
  product,
  href = `/products/${product.id}`,
  compact = false,
  showOrigin = true,
  showRating = true,
  showAddButton = true,
  className,
}: ProductTileCardProps) {
  const imageHeightClassName = compact ? "h-32" : "h-36";

  return (
    <Link className={className} to={href}>
      <AppCard className="overflow-hidden rounded-[1.35rem]" padding="none">
        <div
          className={[
            "relative flex items-center justify-center bg-[linear-gradient(180deg,#efebe2_0%,#dcd5c9_100%)]",
            imageHeightClassName,
          ].join(" ")}
        >
          <img
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            src={product.image}
          />
          <span className="relative text-4xl">☕</span>
          {product.roastLabel ? (
            <span className="absolute bottom-3 left-2 rounded-md bg-[rgba(255,255,255,0.82)] px-2 py-1 text-[11px] font-medium text-[var(--color-primary-green)]">
              {product.roastLabel}
            </span>
          ) : null}
          {product.badges[0] ? (
            <span className="absolute left-2 top-2 rounded-md bg-[var(--color-badge-bg)] px-1.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--color-badge-text)]">
              {product.badges[0]}
            </span>
          ) : null}
          {product.badges.includes("PICK") ? (
            <Heart className="absolute right-2 top-2 size-3.5 text-[var(--color-primary-red)]" />
          ) : null}
        </div>

        <div className={compact ? "px-3 pb-3 pt-2.5" : "px-2.5 pb-2.5 pt-2.5"}>
          {showOrigin && product.originLabel ? (
            <span className="inline-flex rounded-md bg-[rgba(29,62,43,0.06)] px-2 py-1 text-[11px] font-medium text-[var(--color-primary-green)]">
              {product.originLabel}
            </span>
          ) : null}
          <h3 className="mt-2 min-h-10 text-[0.97rem] font-semibold leading-5 text-[var(--color-ink)]">
            {product.name}
          </h3>
          {showRating ? (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-primary-green)]">
                ★{product.rating?.toFixed(1) ?? "4.8"}
              </span>
              <span>({product.reviewCount ?? 0})</span>
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between">
            <span className={compact ? "text-sm font-semibold text-[var(--color-primary-green)]" : "text-base font-semibold text-[var(--color-primary-green)]"}>
              {formatPrice(product.price)}원
            </span>
            {showAddButton ? (
              <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-primary-green)] text-white">
                <Plus className="size-3.5" />
              </span>
            ) : null}
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
