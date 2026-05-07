import { CreditCard } from "lucide-react";

interface PaymentOption {
  id: string;
  label: string;
  description: string;
}

interface PurchasePaymentMethodSectionProps<TOption extends PaymentOption> {
  options: readonly TOption[];
  selectedPaymentId: TOption["id"];
  onSelectPayment: (paymentId: TOption["id"]) => void;
}

export function PurchasePaymentMethodSection<TOption extends PaymentOption>({
  options,
  selectedPaymentId,
  onSelectPayment,
}: PurchasePaymentMethodSectionProps<TOption>) {
  return (
    <section className="mt-4 bg-white px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
          <CreditCard className="size-5 text-[var(--second-color)]" />
        </div>
        <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">결제 수단 선택</h2>
      </div>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const isSelected = option.id === selectedPaymentId;

          return (
            <button
              key={option.id}
              className={[
                "flex w-full items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition",
                isSelected
                  ? "border-[var(--second-color)] bg-[var(--palette-f7faf6)]"
                  : "border-[var(--palette-e5dfd5)] bg-white",
              ].join(" ")}
              onClick={() => onSelectPayment(option.id)}
              type="button"
            >
              <div>
                <p className="text-[1rem] font-semibold text-[var(--palette-171717)]">{option.label}</p>
                <p className="mt-1 text-[0.92rem] text-[var(--palette-6d6a64)]">{option.description}</p>
              </div>
              <span
                className={[
                  "flex size-6 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-[var(--second-color)] bg-[var(--second-color)]"
                    : "border-[var(--palette-cdc5b8)] bg-white",
                ].join(" ")}
              >
                {isSelected ? <span className="size-2 rounded-full bg-white" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
