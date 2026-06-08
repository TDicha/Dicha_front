import { ProductDetailActionRow } from "@/features/products/components/product-detail/ProductDetailActionRow";

interface ProductOptionSectionProps {
  enablesRoastCustomization: boolean;
  tasteRecommendationDescription: string;
  selectedGrindLabel: string;
  selectedRoastLabel: string;
  selectedWeightLabel: string;
  onApplyRecommendation: () => void;
  onApplyTasteRecommendation: () => void;
  onOpenOptions: () => void;
}

export function ProductOptionSection({
  enablesRoastCustomization,
  tasteRecommendationDescription,
  selectedGrindLabel,
  selectedRoastLabel,
  selectedWeightLabel,
  onApplyRecommendation,
  onApplyTasteRecommendation,
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
        <div className="mt-4 grid gap-2">
          <button
            className="flex w-full items-center justify-between bg-[var(--surface-chalkboard)] px-4 py-3 text-left"
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
          <button
            className="flex w-full items-center justify-between bg-[var(--surface-menu-board)] px-4 py-3 text-left text-[var(--text-cafe-ink)]"
            onClick={onApplyTasteRecommendation}
            type="button"
          >
            <span>
              <span className="block text-[0.92rem] font-bold">
                내 취향 자동 옵션 적용
              </span>
              <span className="mt-1 block text-[0.72rem] font-medium text-[var(--text-muted)]">
                {tasteRecommendationDescription}
              </span>
            </span>
            <span className="shrink-0 text-[0.74rem] font-semibold text-[var(--brand-primary)]">
              적용 →
            </span>
          </button>
        </div>
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
