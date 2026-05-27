import { ChevronRight, MapPin } from "lucide-react";

export function PurchaseShippingAddressSection() {
  return (
    <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-1 flex size-10 shrink-0 items-center justify-center bg-[var(--surface-cafe-tile)]">
            <MapPin className="size-5 text-[var(--text-cafe-ink)]" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Shipping
            </p>
            <h2 className="mt-1 text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">배송지</h2>
            <p className="mt-2 text-[1rem] font-medium text-[var(--text-cafe-ink)]">우석 / 010-0000-0000</p>
            <p className="mt-1 text-[0.98rem] leading-7 text-[var(--text-muted-subtle)]">
              서울 성동구 연무장길 00, DICHA Studio 302호
            </p>
          </div>
        </div>
        <button className="text-[var(--text-action-subtle)]" type="button">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
