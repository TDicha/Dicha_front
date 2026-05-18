import { ProductDetailActionRow } from "@/features/products/components/product-detail/ProductDetailActionRow";

interface ProductOptionSectionProps {
  basePriceLabel: string;
  defaultRoastLabel: string;
  selectedOptionName?: string;
  onOpenOptions: () => void;
}

export function ProductOptionSection({
  basePriceLabel,
  defaultRoastLabel,
  selectedOptionName,
  onOpenOptions,
}: ProductOptionSectionProps) {
  return (
    <section className="border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-4 py-5">
      <h2 className="text-[1.1rem] font-black text-[var(--text-title)]">커스텀 로스팅 옵션</h2>
      <p className="mt-1 text-[0.76rem] text-[var(--text-muted-subtle)]">
        원하는 대로 설정하거나, 매장 추천을 받아보세요
      </p>

      <button
        className="mt-4 flex w-full items-center justify-between rounded-[0.8rem] bg-[var(--brand-accent)] px-4 py-3 text-left"
        onClick={onOpenOptions}
        type="button"
      >
        <span className="text-[0.92rem] font-bold text-[var(--brand-primary)]">✨ 매장 추천 커스텀 적용</span>
        <span className="text-[0.74rem] font-medium text-[var(--brand-primary)]">바로 적용 →</span>
      </button>

      <div className="mt-4">
        <ProductDetailActionRow label="로스팅 단계" onClick={onOpenOptions} value={defaultRoastLabel} />
        <ProductDetailActionRow
          label="분쇄 옵션"
          onClick={onOpenOptions}
          value={selectedOptionName ?? "선택해주세요"}
        />
        <ProductDetailActionRow label="용량" onClick={onOpenOptions} value={basePriceLabel} />
      </div>
    </section>
  );
}
