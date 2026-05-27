import { ChevronRight } from "lucide-react";

interface ProductBrewingGuideSectionProps {
  brewingGuide: string;
  onClick?: () => void;
}

export function ProductBrewingGuideSection({
  brewingGuide,
  onClick,
}: ProductBrewingGuideSectionProps) {
  return (
    <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onClick}
        type="button"
      >
        <div>
          <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-[var(--text-chalk-muted)]">
            BREWING GUIDE
          </p>
          <h2 className="mt-1 text-[1rem] font-bold text-[var(--text-chalk)]">
            브루잉 가이드
          </h2>
          <p className="mt-1 text-[0.7rem] text-[var(--text-chalk-muted)]">
            {brewingGuide}
          </p>
        </div>
        <ChevronRight className="size-4 text-[var(--text-chalk)]" />
      </button>
    </section>
  );
}
