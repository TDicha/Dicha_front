export function PurchaseHeaderSection() {
  return (
    <section className="border-b border-[var(--border-section-strong)] bg-[var(--surface-base)] px-[var(--page-x)] py-6">
      <h1 className="text-[clamp(1.6rem,6vw,1.85rem)] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
        주문 상세
      </h1>
      <p className="mt-2 text-[1rem] text-[var(--text-muted-warm)]">
        배송 정보와 결제 수단을 확인하고 결제를 진행하세요
      </p>
    </section>
  );
}
