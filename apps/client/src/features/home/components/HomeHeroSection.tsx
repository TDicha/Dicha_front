import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { homeHeroSlides } from "@/mock/home";

interface HomeHeroSectionProps {
  heroSlide: (typeof homeHeroSlides)[number];
  heroSlides: typeof homeHeroSlides;
}

export function HomeHeroSection({ heroSlide, heroSlides }: HomeHeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-b-[2rem] rounded-t-none bg-[linear-gradient(180deg,var(--gradient-home-hero-start)_0%,var(--gradient-home-hero-end)_100%)] px-[var(--page-x)] pb-5 pt-6 text-[var(--text-inverse)]">
      <div className="absolute right-2 top-5 size-[clamp(7.5rem,36vw,10rem)] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--surface-accent-glow),var(--surface-accent-glow-soft)_58%,transparent_70%)] opacity-90" />
      <div className="absolute right-8 top-12 size-[clamp(4.5rem,24vw,6rem)] rounded-full border border-[var(--overlay-white-20)] bg-[var(--overlay-white-10)]" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-[var(--surface-hero-chip)] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[var(--text-hero-eyebrow)]">
          {heroSlide.eyebrow}
        </span>
        <h2 className="mt-3 max-w-[clamp(12rem,62vw,13.5rem)] font-heading text-[clamp(1.65rem,7vw,1.9rem)] font-semibold leading-[1.2] tracking-[-0.04em]">
          {heroSlide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-[clamp(1.75rem,9vw,2.5rem)] max-w-[clamp(12rem,70vw,16rem)] text-xs font-medium tracking-[0.04em] text-[var(--overlay-white-74)]">
          {heroSlide.description}
        </p>
        <Link
          className="mt-3 inline-flex h-9 items-center rounded-full bg-[var(--surface-base)] px-4 text-sm font-semibold text-[var(--brand-primary)]"
          to={heroSlide.ctaTo}
        >
          {heroSlide.ctaLabel}
          <ArrowRight className="ml-1 size-4" />
        </Link>
        <div className="mt-3 flex justify-center gap-2">
          {heroSlides.map((slide) => (
            <span
              key={slide.id}
              className={["size-1.5 rounded-full", slide.id === heroSlide.id ? "bg-[var(--overlay-white-65)]" : "bg-[var(--overlay-white-35)]"].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
