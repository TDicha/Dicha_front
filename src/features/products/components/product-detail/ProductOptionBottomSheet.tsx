import { Minus, Plus } from "lucide-react";

import { BottomSheet } from "@/components/common/BottomSheet";
import { OptionRow } from "@/components/common/OptionRow";
import type { ProductOption } from "@/shared/types/models";
import { formatPrice } from "@/shared/utils/format";

interface ProductOptionBottomSheetProps {
  baseWeightLabel: string;
  open: boolean;
  options: ProductOption[];
  productName: string;
  quantity: number;
  selectedOptionId: string;
  onClose: () => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onSelectOption: (optionId: string) => void;
}

export function ProductOptionBottomSheet({
  baseWeightLabel,
  open,
  options,
  productName,
  quantity,
  selectedOptionId,
  onClose,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onSelectOption,
}: ProductOptionBottomSheetProps) {
  return (
    <BottomSheet onClose={onClose} open={open} title="커스텀 옵션 선택">
      <div className="space-y-5">
        <section className="rounded-[1.15rem] border border-[var(--surface-brand-tint-8)] bg-[var(--surface-base)] px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-base font-semibold text-[var(--brand-primary)]">{productName}</h4>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                분쇄 옵션과 수량을 선택한 뒤 바로 주문할 수 있어요.
              </p>
            </div>
            <span className="rounded-full bg-[var(--surface-brand-tint-5)] px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
              {baseWeightLabel}
            </span>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-base font-semibold text-[var(--brand-primary)]">분쇄 옵션</h4>
            <span className="rounded-full bg-[var(--surface-brand-tint-5)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-primary)]">
              필수
            </span>
          </div>
          <div className="space-y-2.5">
            {options.map((option) => (
              <OptionRow
                key={option.id}
                description={option.description}
                label={option.name}
                onClick={() => onSelectOption(option.id)}
                price={option.extraPrice ? `+${formatPrice(option.extraPrice)}원` : "추가금액 없음"}
                selected={selectedOptionId === option.id}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[1.15rem] border border-[var(--surface-brand-tint-8)] bg-[var(--surface-brand-tint-35)] px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-[var(--brand-primary)]">수량</h4>
              <p className="mt-1 text-xs text-[var(--text-muted)]">필요한 만큼 바로 조절해 주세요.</p>
            </div>
            <div className="flex items-center rounded-full border border-[var(--surface-brand-tint-10)] bg-[var(--surface-base)] px-1 py-1">
              <button
                className="flex size-9 items-center justify-center rounded-full text-[var(--brand-primary)] disabled:text-[var(--text-muted)]"
                disabled={quantity === 1}
                onClick={onDecreaseQuantity}
                type="button"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-10 text-center text-sm font-semibold text-[var(--brand-primary)]">
                {quantity}
              </span>
              <button
                className="flex size-9 items-center justify-center rounded-full text-[var(--brand-primary)]"
                onClick={onIncreaseQuantity}
                type="button"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </BottomSheet>
  );
}
