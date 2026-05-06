const noteColorMap = [
  "var(--palette-488972)",
  "var(--accent-color)",
  "var(--palette-d89647)",
  "var(--info-color)",
  "var(--danger-color)",
];

interface ProductFlavorNotesSectionProps {
  description: string;
  descriptionSuffix?: string;
  noteLabels: string[];
}

export function ProductFlavorNotesSection({
  description,
  descriptionSuffix,
  noteLabels,
}: ProductFlavorNotesSectionProps) {
  return (
    <section className="border-b border-[var(--line-color)] bg-white px-4 py-4">
      <h2 className="text-[1.1rem] font-black text-[var(--palette-121212)]">향미 노트</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {noteLabels.map((note, index) => (
          <span
            key={note}
            className="rounded-full px-3 py-1.5 text-[0.75rem] font-medium text-white"
            style={{
              backgroundColor: noteColorMap[index % noteColorMap.length],
            }}
          >
            {note}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[0.86rem] leading-7 text-[var(--palette-121212)]">
        {description} {descriptionSuffix ?? ""}
      </p>
    </section>
  );
}
