import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { homeHeroSlides } from "@/mock/home";

interface HomeHeroSectionProps {
  heroImage?: string;
  heroSlide: (typeof homeHeroSlides)[number];
  heroSlides: typeof homeHeroSlides;
}

export function HomeHeroSection({ heroImage, heroSlide, heroSlides }: HomeHeroSectionProps) {
  return (
    <section className="relative min-h-[18rem] overflow-hidden rounded-b-[var(--radius-hero)] rounded-t-none bg-[var(--brand-primary)] px-[var(--page-x)] pb-5 pt-6 text-[var(--text-inverse)]">
      {heroImage ? (
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={heroImage} />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--brand-primary)_0%,var(--surface-brand-solid-alpha)_52%,var(--overlay-scrim)_100%)]" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-[var(--surface-hero-chip)] px-3 py-1 text-[10px] font-semibold text-[var(--text-hero-eyebrow)]">
          {heroSlide.eyebrow}
        </span>
        <h2 className="mt-3 max-w-[clamp(12rem,62vw,13.5rem)] font-heading text-[clamp(1.65rem,7vw,1.9rem)] font-semibold leading-[1.2]">
          {heroSlide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-[clamp(1.75rem,9vw,2.5rem)] max-w-[clamp(12rem,70vw,16rem)] text-xs font-medium text-[var(--text-primary-inverse)]">
          {heroSlide.description}
        </p>
        <Link
          className="relative z-10 mt-3 inline-flex h-9 items-center rounded-[var(--radius-control)] bg-[var(--surface-base)] px-4 text-sm font-semibold !text-[var(--brand-primary)]"
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
