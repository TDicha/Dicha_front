import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { homeHeroSlides } from "@/mock/home";

interface HomeHeroSectionProps {
  heroSlide: (typeof homeHeroSlides)[number];
  heroSlides: typeof homeHeroSlides;
}

export function HomeHeroSection({ heroSlide, heroSlides }: HomeHeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-b-[2rem] rounded-t-none bg-[linear-gradient(180deg,var(--palette-214d38)_0%,var(--palette-143826)_100%)] px-5 pb-5 pt-6 text-white">
      <div className="absolute right-2 top-5 size-40 rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--rgba-239-208-119-095),var(--rgba-239-208-119-015)_58%,transparent_70%)] opacity-90" />
      <div className="absolute right-8 top-12 size-24 rounded-full border border-white/20 bg-white/10" />
      <div className="relative">
        <span className="inline-flex rounded-full bg-[var(--rgba-247-244-232-018)] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[var(--palette-f6edcf)]">
          {heroSlide.eyebrow}
        </span>
        <h2 className="mt-3 max-w-[13rem] font-heading text-[1.9rem] font-semibold leading-[1.2] tracking-[-0.04em]">
          {heroSlide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-10 text-xs font-medium tracking-[0.04em] text-white/74">{heroSlide.description}</p>
        <Link
          className="mt-3 inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-[var(--color-primary-green)]"
          to={heroSlide.ctaTo}
        >
          {heroSlide.ctaLabel}
          <ArrowRight className="ml-1 size-4" />
        </Link>
        <div className="mt-3 flex justify-center gap-2">
          {heroSlides.map((slide) => (
            <span
              key={slide.id}
              className={["size-1.5 rounded-full", slide.id === heroSlide.id ? "bg-white/65" : "bg-white/35"].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
