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
    <section className="border-b border-[var(--line-color)] bg-white px-4 py-4">
      <div className="flex flex-wrap gap-1.5">
        {product.originLabel ? (
          <span className="rounded-full bg-[var(--palette-e8efe5)] px-2.5 py-1 text-[0.56rem] text-[var(--primary-color)]">
            {product.originLabel}
          </span>
        ) : null}
        {product.roastLabel ? (
          <span className="rounded-full bg-[var(--palette-f5edd8)] px-2.5 py-1 text-[0.56rem] text-[var(--accent-color)]">
            {product.roastLabel}
          </span>
        ) : null}
        {product.categoryLabel ? (
          <span className="rounded-full bg-[var(--palette-ede8f5)] px-2.5 py-1 text-[0.56rem] text-[var(--palette-5a3a8a)]">
            {product.categoryLabel.replace(" ", "")}
          </span>
        ) : null}
      </div>

      <h1 className="mt-4 text-[1.7rem] font-black tracking-[-0.05em] text-[var(--palette-121212)]">
        {product.name}
      </h1>
      <p className="mt-1 text-[0.82rem] text-[var(--palette-666666)]">{product.subtitle}</p>

      <div className="mt-3 flex items-end gap-2">
        <p className="text-[2.1rem] font-black tracking-[-0.05em] text-[var(--danger-color)]">
          ₩{formatPrice(product.price)}
        </p>
        <p className="pb-1 text-[0.7rem] text-[var(--palette-666666)]">{baseWeightLabel} 기준</p>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <p className="text-[0.92rem] font-bold text-[var(--accent-color)]">
          ★ {product.rating?.toFixed(1) ?? "4.8"}
        </p>
        <p className="text-[0.78rem] text-[var(--palette-666666)]">
          리뷰 {reviewTotal}건 · 판매 {salesCount.toLocaleString()}건
        </p>
      </div>
    </section>
  );
}
