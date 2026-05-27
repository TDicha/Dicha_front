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
    <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center bg-[var(--surface-cafe-tile)]">
          <CreditCard className="size-5 text-[var(--text-cafe-ink)]" />
        </div>
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Payment
          </p>
          <h2 className="mt-1 text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">결제 수단 선택</h2>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const isSelected = option.id === selectedPaymentId;

          return (
            <button
              key={option.id}
              className={[
                "flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition",
                isSelected
                  ? "bg-[var(--surface-chalkboard)]"
                  : "bg-[var(--surface-cafe-tile)]",
              ].join(" ")}
              onClick={() => onSelectPayment(option.id)}
              type="button"
            >
              <div className="min-w-0">
                <p
                  className={[
                    "break-keep text-[1rem] font-semibold",
                    isSelected ? "text-[var(--text-chalk)]" : "text-[var(--text-cafe-ink)]",
                  ].join(" ")}
                >
                  {option.label}
                </p>
                <p
                  className={[
                    "mt-1 text-[0.92rem]",
                    isSelected ? "text-[var(--text-chalk-muted)]" : "text-[var(--text-muted-warm)]",
                  ].join(" ")}
                >
                  {option.description}
                </p>
              </div>
              <span
                className={[
                  "flex size-6 shrink-0 items-center justify-center",
                  isSelected
                    ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                    : "bg-[var(--surface-menu-board)] text-transparent",
                ].join(" ")}
              >
                <span className="size-2 bg-current" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
