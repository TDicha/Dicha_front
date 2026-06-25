import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { formatPrice } from "@/shared/utils/format";
import type { Product } from "@/shared/types/models";
import { productDetailPath } from "@/shared/utils/productRoutes";

interface ProductTileCardProps {
  product: Product;
  href?: string;
  compact?: boolean;
  appearance?: "default" | "chalkboard";
  showOrigin?: boolean;
  showRating?: boolean;
  showAddButton?: boolean;
  className?: string;
  onSelect?: () => void;
}

export function ProductTileCard({
  product,
  href = productDetailPath(product),
  compact = false,
  appearance = "default",
  showOrigin = true,
  showRating = true,
  showAddButton = true,
  className,
  onSelect,
}: ProductTileCardProps) {
  const imageHeightClassName = compact ? "h-32" : "h-36";
  const isChalkboard = appearance === "chalkboard";

  return (
    <Link
      className={["motion-clickable motion-image-parent block min-w-0", className]
        .filter(Boolean)
        .join(" ")}
      onClick={onSelect}
      to={href}
    >
      <AppCard
        className={[
          "overflow-hidden",
          isChalkboard
            ? "border-[var(--border-chalk-highlight)] bg-[var(--surface-chalkboard-highlight)] shadow-none"
            : "",
        ].join(" ")}
        padding="none"
        variant={isChalkboard ? "chalkboard" : "default"}
      >
        <div
          className={[
            "relative flex items-center justify-center bg-[linear-gradient(180deg,var(--gradient-product-tile-start)_0%,var(--gradient-product-tile-end)_100%)]",
            imageHeightClassName,
          ].join(" ")}
        >
          <img
            alt={product.name}
            className="motion-image absolute inset-0 h-full w-full object-cover"
            src={product.image}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,var(--overlay-black-0)_0%,var(--overlay-scrim)_100%)]" />
          {product.roastLabel ? (
            <span
              className={[
                "absolute bottom-3 left-2 rounded-[var(--radius-control)] px-2 py-1 text-[11px] font-medium",
                isChalkboard
                  ? "border border-[var(--border-chalk-highlight)] bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                  : "bg-[var(--surface-card-glass-strong)] text-[var(--brand-primary)]",
              ].join(" ")}
            >
              {product.roastLabel}
            </span>
          ) : null}
          {product.badges[0] ? (
            <span className="absolute left-2 top-2 rounded-[var(--radius-control)] bg-[var(--badge-bg)] px-1.5 py-1 text-[10px] font-bold text-[var(--badge-text)]">
              {product.badges[0]}
            </span>
          ) : null}
          {product.badges.includes("PICK") ? (
            <Heart
              className={[
                "absolute right-2 top-2 size-3.5",
                isChalkboard
                  ? "text-[var(--text-chalk)]"
                  : "text-[var(--state-danger)]",
              ].join(" ")}
            />
          ) : null}
        </div>

        <div className={compact ? "px-3 pb-3 pt-2.5" : "px-2.5 pb-2.5 pt-2.5"}>
          {showOrigin && product.originLabel ? (
            <span
              className={[
                "inline-flex rounded-md px-2 py-1 text-[11px] font-medium",
                isChalkboard
                  ? "border border-[var(--border-chalk-highlight)] text-[var(--text-chalk)]"
                  : "bg-[var(--surface-brand-tint-6)] text-[var(--brand-primary)]",
              ].join(" ")}
            >
              {product.originLabel}
            </span>
          ) : null}
          <h3
            className={[
              "mt-2 min-h-10 break-keep text-[0.97rem] font-semibold leading-5",
              isChalkboard
                ? "text-[var(--text-chalk)]"
                : "text-[var(--text-ink)]",
            ].join(" ")}
          >
            {product.name}
          </h3>
          {showRating ? (
            <div
              className={[
                "mt-1 flex items-center gap-1 text-[11px]",
                isChalkboard
                  ? "text-[var(--text-chalk-muted)]"
                  : "text-[var(--text-muted)]",
              ].join(" ")}
            >
              <span
                className={[
                  "font-semibold",
                  isChalkboard
                    ? "text-[var(--text-chalk)]"
                    : "text-[var(--brand-primary)]",
                ].join(" ")}
              >
                ★{product.rating?.toFixed(1) ?? "4.8"}
              </span>
              <span>({product.reviewCount ?? 0})</span>
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span
              className={[
                "min-w-0 truncate font-semibold",
                compact ? "text-sm" : "text-base",
                isChalkboard
                  ? "text-[var(--text-chalk)]"
                  : "text-[var(--brand-primary)]",
              ].join(" ")}
            >
              {formatPrice(product.price)}원
            </span>
            {showAddButton ? (
              <span
                className={[
                  "flex size-6 items-center justify-center rounded-full",
                  isChalkboard
                    ? "bg-[var(--text-chalk)] text-[var(--surface-chalkboard)]"
                    : "bg-[var(--brand-primary)] text-[var(--text-inverse)]",
                ].join(" ")}
              >
                <Plus className="size-3.5" />
              </span>
            ) : null}
          </div>
        </div>
      </AppCard>
    </Link>
  );
}
