import { ChevronRight } from "lucide-react";

interface ProductBrewingGuideSectionProps {
  brewingGuide: string;
}

export function ProductBrewingGuideSection({ brewingGuide }: ProductBrewingGuideSectionProps) {
  return (
    <section className="border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-4 py-4">
      <button className="flex w-full items-center justify-between text-left" type="button">
        <div>
          <h2 className="text-[1rem] font-bold text-[var(--text-title)]">브루잉 가이드</h2>
          <p className="mt-1 text-[0.7rem] text-[var(--text-muted-subtle)]">{brewingGuide}</p>
        </div>
        <ChevronRight className="size-4 text-[var(--text-muted-subtle)]" />
      </button>
    </section>
  );
}
