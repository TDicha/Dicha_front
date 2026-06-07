import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { BrandWatermark } from "@/components/common/BrandWatermark";
import { homeHeroSlides } from "@/features/home/homeConfig";

interface HomeHeroSectionProps {
  heroSlide: (typeof homeHeroSlides)[number];
}

export function HomeHeroSection({ heroSlide }: HomeHeroSectionProps) {
  return (
    <section className="cafe-tile-bg relative -mx-[var(--page-x)] grid min-h-[21rem] place-items-center overflow-hidden border-y-[6px] border-[var(--border-cafe-stripe)] px-[var(--page-x)] py-8 text-center text-[var(--text-cafe-ink)]">
      <BrandWatermark className="absolute left-1/2 top-1/2 size-[20rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] mix-blend-multiply" />
      <div className="relative mx-auto flex w-full max-w-[22rem] flex-col items-center">
        <p className="font-heading text-[clamp(2.35rem,11vw,3.1rem)] font-bold leading-none tracking-[0.18em]">
          DICHA
        </p>
        <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-[var(--text-muted)]">
          Special Blending Coffee
        </p>
        <span className="mt-7 inline-flex rounded-full bg-[var(--surface-chalkboard)] px-3 py-1 text-[10px] font-semibold text-[var(--text-chalk)]">
          {heroSlide.eyebrow}
        </span>
        <h2 className="mt-3 font-heading text-[clamp(1.48rem,6.5vw,1.75rem)] font-semibold leading-[1.3]">
          {heroSlide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-3 text-xs font-medium text-[var(--text-muted)]">
          {heroSlide.description}
        </p>
        <Link
          className="relative z-10 mt-4 inline-flex h-10 items-center border border-[var(--border-cafe-stripe)] bg-[var(--surface-menu-board)] px-5 text-sm font-semibold text-[var(--text-cafe-ink)]"
          to={heroSlide.ctaTo}
        >
          {heroSlide.ctaLabel}
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </div>
    </section>
  );
}
