import { ChevronRight, Sparkles, WandSparkles } from "lucide-react";

import { ProductDetailActionRow } from "@/features/products/components/product-detail/ProductDetailActionRow";
import { formatPrice } from "@/shared/utils/format";

interface ProductOptionSectionProps {
  enablesRoastCustomization: boolean;
  quantity: number;
  selectedSummary: string;
  tasteRecommendationDescription: string;
  totalPrice: number;
  selectedGrindLabel: string;
  selectedRoastLabel: string;
  selectedWeightLabel: string;
  onApplyRecommendation: () => void;
  onApplyTasteRecommendation: () => void;
  onOpenOptions: () => void;
}

export function ProductOptionSection({
  enablesRoastCustomization,
  quantity,
  selectedSummary,
  tasteRecommendationDescription,
  totalPrice,
  selectedGrindLabel,
  selectedRoastLabel,
  selectedWeightLabel,
  onApplyRecommendation,
  onApplyTasteRecommendation,
  onOpenOptions,
}: ProductOptionSectionProps) {
  return (
    <section className="cafe-wood-grain bg-[linear-gradient(135deg,var(--gradient-wood-start)_0%,var(--gradient-wood-end)_100%)] px-[var(--page-x)] py-5 text-[var(--text-inverse)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[var(--text-wood-muted)]">
            CUSTOM ORDER
          </p>
          <h2 className="mt-2 text-[1.1rem] font-black text-[var(--text-inverse)]">
            {enablesRoastCustomization ? "커스텀 로스팅 옵션" : "상품 구성 옵션"}
          </h2>
          <p className="mt-1 text-[0.76rem] leading-5 text-[var(--text-wood-muted)]">
            {enablesRoastCustomization
              ? "원하는 대로 설정하거나, 매장 추천을 받아보세요"
              : "원하는 구성을 선택해 주문을 완성해 보세요"}
          </p>
        </div>
        <button
          className="flex shrink-0 items-center gap-1.5 bg-[var(--surface-menu-board)] px-3 py-2 text-[0.74rem] font-bold text-[var(--text-cafe-ink)]"
          onClick={onOpenOptions}
          type="button"
        >
          옵션
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      {enablesRoastCustomization ? (
        <div className="mt-4 grid gap-2">
          <button
            className="flex w-full items-center justify-between gap-3 bg-[var(--surface-chalkboard)] px-4 py-3 text-left"
            onClick={onApplyRecommendation}
            type="button"
          >
            <span className="flex min-w-0 items-center gap-2 text-[0.92rem] font-bold text-[var(--text-chalk)]">
              <Sparkles className="size-4 shrink-0" />
              <span>매장 추천 커스텀 적용</span>
            </span>
            <span className="shrink-0 text-[0.74rem] font-medium text-[var(--text-chalk-muted)]">
              바로 적용
            </span>
          </button>
          <button
            className="flex w-full items-center justify-between gap-3 bg-[var(--surface-menu-board)] px-4 py-3 text-left text-[var(--text-cafe-ink)]"
            onClick={onApplyTasteRecommendation}
            type="button"
          >
            <span className="flex min-w-0 gap-2">
              <WandSparkles className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]" />
              <span className="min-w-0">
                <span className="block text-[0.92rem] font-bold">
                  내 취향 자동 옵션 적용
                </span>
                <span className="mt-1 block text-[0.72rem] font-medium text-[var(--text-muted)]">
                  {tasteRecommendationDescription}
                </span>
              </span>
            </span>
            <span className="shrink-0 text-[0.74rem] font-semibold text-[var(--brand-primary)]">
              적용
            </span>
          </button>
        </div>
      ) : null}

      <button
        className="mt-4 w-full bg-[var(--surface-menu-board)] p-3 text-left text-[var(--text-cafe-ink)]"
        onClick={onOpenOptions}
        type="button"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.7rem] font-semibold text-[var(--text-muted)]">
              현재 선택
            </p>
            <p className="mt-1 break-keep text-[0.95rem] font-black leading-6 text-[var(--text-cafe-ink)]">
              {selectedSummary}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[0.7rem] font-semibold text-[var(--text-muted)]">
              수량 {quantity}개
            </p>
            <p className="mt-1 text-[1rem] font-black text-[var(--brand-primary)]">
              ₩{formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </button>

      <div className="mt-2 bg-[var(--surface-menu-board)] px-3 text-[var(--text-cafe-ink)]">
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
