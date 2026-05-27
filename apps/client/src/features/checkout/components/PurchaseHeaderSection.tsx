export function PurchaseHeaderSection() {
  return (
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Checkout
      </p>
      <h1 className="mt-1 text-[clamp(1.6rem,6vw,1.85rem)] font-bold tracking-[-0.04em] text-[var(--text-cafe-ink)]">
        주문 상세
      </h1>
      <p className="mt-2 text-[1rem] text-[var(--text-muted-warm)]">
        배송 정보와 결제 수단을 확인하고 결제를 진행하세요
      </p>
    </section>
  );
}
