interface ProductStorySectionProps {
  storyLines: string[];
}

export function ProductStorySection({ storyLines }: ProductStorySectionProps) {
  return (
    <section className="border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-[var(--page-x)] py-4">
      <h2 className="text-[1.1rem] font-black text-[var(--text-title)]">원두 스토리</h2>
      <div className="mt-3 space-y-1 text-[0.86rem] leading-7 text-[var(--text-title)]">
        {storyLines.map((line, index) =>
          line ? <p key={`${line}-${index}`}>{line}</p> : <div key={`blank-${index}`} className="h-2" />,
        )}
      </div>
    </section>
  );
}
