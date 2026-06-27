interface ProductHeroSectionProps {
  productImage: string;
  productName: string;
}

export function ProductHeroSection({
  productImage,
  productName,
}: ProductHeroSectionProps) {
  return (
    <section className="relative min-h-[clamp(15.5rem,48dvh,21rem)] overflow-hidden bg-[var(--surface-chalkboard)]">
      <img
        alt={productName}
        className="absolute inset-0 h-full w-full object-cover"
        src={productImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-black-0)_35%,var(--overlay-scrim)_100%)]" />
      <p className="absolute left-3 top-3 bg-[var(--surface-chalkboard)] px-3 py-1.5 text-[0.63rem] font-semibold tracking-[0.18em] text-[var(--text-chalk)]">
        DICHA ROASTERY
      </p>
      <div className="absolute inset-x-3 bottom-3 bg-[var(--surface-chalkboard)] px-3 py-2.5 text-left">
        <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-chalk-muted)]">
          TODAY&apos;S MENU
        </p>
        <p className="mt-1 break-keep text-sm font-semibold leading-5 text-[var(--text-chalk)]">
          {productName}
        </p>
      </div>
    </section>
  );
}
