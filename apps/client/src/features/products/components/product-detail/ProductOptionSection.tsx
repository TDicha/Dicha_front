import { ProductDetailActionRow } from "@/features/products/components/product-detail/ProductDetailActionRow";

interface ProductOptionSectionProps {
  enablesRoastCustomization: boolean;
  selectedGrindLabel: string;
  selectedRoastLabel: string;
  selectedWeightLabel: string;
  onApplyRecommendation: () => void;
  onOpenOptions: () => void;
}

export function ProductOptionSection({
  enablesRoastCustomization,
  selectedGrindLabel,
  selectedRoastLabel,
  selectedWeightLabel,
  onApplyRecommendation,
  onOpenOptions,
}: ProductOptionSectionProps) {
  return (
    <section className="cafe-wood-grain bg-[linear-gradient(135deg,var(--gradient-wood-start)_0%,var(--gradient-wood-end)_100%)] px-[var(--page-x)] py-5 text-[var(--text-inverse)]">
      <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[var(--text-wood-muted)]">
        CUSTOM ORDER
      </p>
      <h2 className="mt-2 text-[1.1rem] font-black text-[var(--text-inverse)]">
        {enablesRoastCustomization ? "커스텀 로스팅 옵션" : "상품 구성 옵션"}
      </h2>
      <p className="mt-1 text-[0.76rem] text-[var(--text-wood-muted)]">
        {enablesRoastCustomization
          ? "원하는 대로 설정하거나, 매장 추천을 받아보세요"
          : "원하는 구성을 선택해 주문을 완성해 보세요"}
      </p>

      {enablesRoastCustomization ? (
        <button
          className="mt-4 flex w-full items-center justify-between bg-[var(--surface-chalkboard)] px-4 py-3 text-left"
          onClick={onApplyRecommendation}
          type="button"
        >
          <span className="text-[0.92rem] font-bold text-[var(--text-chalk)]">
            매장 추천 커스텀 적용
          </span>
          <span className="text-[0.74rem] font-medium text-[var(--text-chalk-muted)]">
            바로 적용 →
          </span>
        </button>
      ) : null}

      <div className="mt-4 bg-[var(--surface-menu-board)] px-3">
        {enablesRoastCustomization ? (
          <>
            <ProductDetailActionRow
              label="로스팅 단계"
              onClick={onOpenOptions}
              value={selectedRoastLabel}
            />
            <ProductDetailActionRow
              label="분쇄 옵션"
              onClick={onOpenOptions}
              value={selectedGrindLabel}
            />
          </>
        ) : null}
        <ProductDetailActionRow
          label={enablesRoastCustomization ? "용량" : "구성 선택"}
          onClick={onOpenOptions}
          value={selectedWeightLabel}
        />
      </div>
    </section>
  );
}
