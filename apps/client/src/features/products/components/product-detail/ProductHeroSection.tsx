interface ProductHeroSectionProps {
  productImage: string;
  productName: string;
}

export function ProductHeroSection({ productImage, productName }: ProductHeroSectionProps) {
  return (
    <section className="relative flex min-h-[clamp(18rem,62vh,23rem)] flex-col items-center justify-end overflow-hidden bg-[var(--surface-product-hero)] px-[var(--page-x)] pb-9 text-center">
      <img alt={productName} className="absolute inset-0 h-full w-full object-cover" src={productImage} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-black-0)_20%,var(--overlay-scrim)_100%)]" />
      <p className="relative max-w-full truncate rounded-full bg-[var(--surface-card-glass-strong)] px-3 py-1.5 text-xs font-medium text-[var(--brand-primary)]">DICHA / {productName}</p>
      <div className="absolute bottom-3 flex gap-2">
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-95)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
      </div>
    </section>
  );
}
