interface ProductHeroSectionProps {
  productName: string;
}

export function ProductHeroSection({ productName }: ProductHeroSectionProps) {
  return (
    <section className="relative flex min-h-[24.4rem] flex-col items-center justify-center overflow-hidden bg-[var(--palette-dae3d1)] px-6 text-center">
      <div className="text-[5.8rem]">☕</div>
      <p className="mt-4 text-[0.72rem] text-[var(--primary-color)]">DICHA × {productName}</p>
      <div className="absolute bottom-3 flex gap-2">
        <span className="size-1.5 rounded-full bg-white/95" />
        <span className="size-1.5 rounded-full bg-white/65" />
        <span className="size-1.5 rounded-full bg-white/65" />
        <span className="size-1.5 rounded-full bg-white/65" />
      </div>
    </section>
  );
}
