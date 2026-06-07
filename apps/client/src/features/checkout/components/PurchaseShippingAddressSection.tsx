import { ChevronRight, MapPin } from "lucide-react";

import type { AddressSnapshot } from "@/features/checkout/types";

interface PurchaseShippingAddressSectionProps {
  address: AddressSnapshot | null;
  actionLabel?: string;
  onEdit: () => void;
}

export function PurchaseShippingAddressSection({
  address,
  actionLabel = "변경",
  onEdit,
}: PurchaseShippingAddressSectionProps) {
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
            <h2 className="mt-1 text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">
              배송지
            </h2>

            {address ? (
              <>
                <p className="mt-2 text-[1rem] font-medium text-[var(--text-cafe-ink)]">
                  {address.recipientName} / {address.phone}
                </p>
                <p className="mt-1 text-[0.98rem] leading-7 text-[var(--text-muted-subtle)]">
                  {address.postalCode ? `(${address.postalCode}) ` : ""}
                  {address.address}
                  {address.detailAddress ? ` ${address.detailAddress}` : ""}
                </p>
              </>
            ) : (
              <p className="mt-2 text-[0.98rem] leading-7 text-[var(--text-muted-subtle)]">
                배송지를 등록해 주세요.
              </p>
            )}
          </div>
        </div>
        <button
          className="flex shrink-0 items-center gap-1 text-[0.9rem] font-semibold text-[var(--text-action-subtle)]"
          onClick={onEdit}
          type="button"
        >
          {address ? actionLabel : "등록"}
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
