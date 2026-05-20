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
    <Link className={["min-w-0", className].filter(Boolean).join(" ")} to={href}>
      <AppCard className="overflow-hidden rounded-[1.35rem]" padding="none">
        <div
          className={[
            "relative flex items-center justify-center bg-[linear-gradient(180deg,var(--gradient-product-tile-start)_0%,var(--gradient-product-tile-end)_100%)]",
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
            <span className="absolute bottom-3 left-2 rounded-md bg-[var(--surface-card-glass)] px-2 py-1 text-[11px] font-medium text-[var(--brand-primary)]">
              {product.roastLabel}
            </span>
          ) : null}
          {product.badges[0] ? (
            <span className="absolute left-2 top-2 rounded-md bg-[var(--badge-bg)] px-1.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[var(--badge-text)]">
              {product.badges[0]}
            </span>
          ) : null}
          {product.badges.includes("PICK") ? (
            <Heart className="absolute right-2 top-2 size-3.5 text-[var(--state-danger)]" />
          ) : null}
        </div>

        <div className={compact ? "px-3 pb-3 pt-2.5" : "px-2.5 pb-2.5 pt-2.5"}>
          {showOrigin && product.originLabel ? (
            <span className="inline-flex rounded-md bg-[var(--surface-brand-tint-6)] px-2 py-1 text-[11px] font-medium text-[var(--brand-primary)]">
              {product.originLabel}
            </span>
          ) : null}
          <h3 className="mt-2 min-h-10 break-keep text-[0.97rem] font-semibold leading-5 text-[var(--text-ink)]">
            {product.name}
          </h3>
          {showRating ? (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--brand-primary)]">
                ★{product.rating?.toFixed(1) ?? "4.8"}
              </span>
              <span>({product.reviewCount ?? 0})</span>
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className={compact ? "min-w-0 truncate text-sm font-semibold text-[var(--brand-primary)]" : "min-w-0 truncate text-base font-semibold text-[var(--brand-primary)]"}>
              {formatPrice(product.price)}원
            </span>
            {showAddButton ? (
              <span className="flex size-6 items-center justify-center rounded-full bg-[var(--brand-primary)] text-[var(--text-inverse)]">
                <Plus className="size-3.5" />
              </span>
            ) : null}
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
