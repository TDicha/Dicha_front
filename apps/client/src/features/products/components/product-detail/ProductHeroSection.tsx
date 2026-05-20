interface ProductHeroSectionProps {
  productName: string;
}

export function ProductHeroSection({ productName }: ProductHeroSectionProps) {
  return (
    <section className="relative flex min-h-[clamp(21rem,72vh,24.4rem)] flex-col items-center justify-center overflow-hidden bg-[var(--surface-product-hero)] px-[var(--page-x)] text-center">
      <div className="text-[clamp(4.8rem,22vw,5.8rem)]">☕</div>
      <p className="mt-4 max-w-full truncate text-[0.72rem] text-[var(--brand-primary)]">DICHA × {productName}</p>
      <div className="absolute bottom-3 flex gap-2">
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-95)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
        <span className="size-1.5 rounded-full bg-[var(--overlay-white-65)]" />
      </div>
    </section>
  );
}
