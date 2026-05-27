interface ProductStorySectionProps {
  storyLines: string[];
  title: string;
}

export function ProductStorySection({
  storyLines,
  title,
}: ProductStorySectionProps) {
  return (
    <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-5">
      <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-[var(--text-chalk-muted)]">
        DICHA STORY
      </p>
      <h2 className="mt-2 text-[1.1rem] font-black text-[var(--text-chalk)]">
        {title}
      </h2>
      <div className="mt-3 space-y-1 text-[0.86rem] leading-7 text-[var(--text-chalk-muted)]">
        {storyLines.map((line, index) =>
          line ? (
            <p key={`${line}-${index}`}>{line}</p>
          ) : (
            <div key={`blank-${index}`} className="h-2" />
          ),
        )}
      </div>
    </section>
  );
}
