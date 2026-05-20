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
    <section className="border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-4 py-4">
      <div className="flex flex-wrap gap-1.5">
        {product.originLabel ? (
          <span className="rounded-full bg-[var(--surface-badge-green)] px-2.5 py-1 text-[0.56rem] text-[var(--brand-primary)]">
            {product.originLabel}
          </span>
        ) : null}
        {product.roastLabel ? (
          <span className="rounded-full bg-[var(--surface-badge-accent)] px-2.5 py-1 text-[0.56rem] text-[var(--brand-accent)]">
            {product.roastLabel}
          </span>
        ) : null}
        {product.categoryLabel ? (
          <span className="rounded-full bg-[var(--surface-purple)] px-2.5 py-1 text-[0.56rem] text-[var(--flavor-purple)]">
            {product.categoryLabel.replace(" ", "")}
          </span>
        ) : null}
      </div>

      <h1 className="mt-4 text-[1.7rem] font-black tracking-[-0.05em] text-[var(--text-title)]">
        {product.name}
      </h1>
      <p className="mt-1 text-[0.82rem] text-[var(--text-muted-subtle)]">{product.subtitle}</p>

      <div className="mt-3 flex items-end gap-2">
        <p className="text-[2.1rem] font-black tracking-[-0.05em] text-[var(--state-danger)]">
          ₩{formatPrice(product.price)}
        </p>
        <p className="pb-1 text-[0.7rem] text-[var(--text-muted-subtle)]">{baseWeightLabel} 기준</p>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <p className="text-[0.92rem] font-bold text-[var(--brand-accent)]">
          ★ {product.rating?.toFixed(1) ?? "4.8"}
        </p>
        <p className="text-[0.78rem] text-[var(--text-muted-subtle)]">
          리뷰 {reviewTotal}건 · 판매 {salesCount.toLocaleString()}건
        </p>
      </div>
    </section>
  );
}
