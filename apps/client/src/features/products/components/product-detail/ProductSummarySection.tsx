import type { Product } from "@/shared/types/models";
import { formatPrice } from "@/shared/utils/format";

interface ProductSummarySectionProps {
  baseWeightLabel: string;
  product: Product;
  reviewTotal: number;
  salesCount: number;
}

export function ProductSummarySection({
  baseWeightLabel,
  product,
  reviewTotal,
  salesCount,
}: ProductSummarySectionProps) {
  return (
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
      <div className="flex flex-wrap gap-1.5">
        {product.originLabel ? (
          <span className="bg-[var(--surface-cafe-tile)] px-2.5 py-1 text-[0.6rem] font-semibold text-[var(--text-cafe-ink)]">
            {product.originLabel}
          </span>
        ) : null}
        {product.roastLabel ? (
          <span className="bg-[var(--surface-cafe-tile)] px-2.5 py-1 text-[0.6rem] font-semibold text-[var(--text-cafe-ink)]">
            {product.roastLabel}
          </span>
        ) : null}
        {product.categoryLabel ? (
          <span className="bg-[var(--surface-chalkboard)] px-2.5 py-1 text-[0.6rem] font-semibold text-[var(--text-chalk)]">
            {product.categoryLabel.replace(" ", "")}
          </span>
        ) : null}
      </div>

      <p className="mt-5 text-[0.62rem] font-semibold tracking-[0.18em] text-[var(--text-muted)]">
        MENU DETAIL
      </p>
      <h1 className="mt-2 text-[clamp(1.35rem,6vw,1.6rem)] font-bold text-[var(--text-cafe-ink)]">
        {product.name}
      </h1>
      <p className="mt-1 text-[0.82rem] text-[var(--text-muted-subtle)]">
        {product.subtitle}
      </p>

      <div className="mt-3 flex items-end gap-2">
        <p className="text-[clamp(1.55rem,7vw,1.9rem)] font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(product.price)}
        </p>
        <p className="pb-1 text-[0.7rem] text-[var(--text-muted-subtle)]">
          {baseWeightLabel} 기준
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 pt-3">
        <p className="text-[0.92rem] font-bold text-[var(--text-cafe-ink)]">
          ★ {product.rating?.toFixed(1) ?? "4.8"}
        </p>
        <p className="text-[0.78rem] text-[var(--text-muted-subtle)]">
          리뷰 {reviewTotal}건 · 판매 {salesCount.toLocaleString()}건
        </p>
      </div>
    </section>
  );
}
