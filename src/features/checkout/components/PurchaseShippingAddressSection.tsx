import { ChevronRight, MapPin } from "lucide-react";

export function PurchaseShippingAddressSection() {
  return (
    <section className="mt-4 bg-white px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
            <MapPin className="size-5 text-[var(--second-color)]" />
          </div>
          <div>
            <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">배송지</h2>
            <p className="mt-2 text-[1rem] font-medium text-[var(--palette-171717)]">우석 / 010-0000-0000</p>
            <p className="mt-1 text-[0.98rem] leading-7 text-[var(--palette-666666)]">
              서울 성동구 연무장길 00, DICHA Studio 302호
            </p>
          </div>
        </div>
        <button className="text-[var(--palette-6f6b63)]" type="button">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
