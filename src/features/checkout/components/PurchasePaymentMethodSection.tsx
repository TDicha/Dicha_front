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
    <section className="mt-4 bg-[var(--surface-base)] px-[var(--page-x)] py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--surface-icon-green)]">
          <CreditCard className="size-5 text-[var(--brand-secondary)]" />
        </div>
        <h2 className="text-[1.2rem] font-bold text-[var(--text-heading)]">결제 수단 선택</h2>
      </div>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const isSelected = option.id === selectedPaymentId;

          return (
            <button
              key={option.id}
              className={[
                "flex w-full items-center justify-between gap-3 rounded-[1.25rem] border px-4 py-4 text-left transition",
                isSelected
                  ? "border-[var(--brand-secondary)] bg-[var(--surface-page-green)]"
                  : "border-[var(--border-payment)] bg-[var(--surface-base)]",
              ].join(" ")}
              onClick={() => onSelectPayment(option.id)}
              type="button"
            >
              <div className="min-w-0">
                <p className="break-keep text-[1rem] font-semibold text-[var(--text-heading)]">{option.label}</p>
                <p className="mt-1 text-[0.92rem] text-[var(--text-muted-warm)]">{option.description}</p>
              </div>
              <span
                className={[
                  "flex size-6 shrink-0 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-[var(--brand-secondary)] bg-[var(--brand-secondary)]"
                    : "border-[var(--border-warm-strong)] bg-[var(--surface-base)]",
                ].join(" ")}
              >
                {isSelected ? <span className="size-2 rounded-full bg-[var(--surface-base)]" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
