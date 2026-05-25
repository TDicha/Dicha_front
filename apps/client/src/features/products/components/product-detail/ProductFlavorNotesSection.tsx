const noteColorMap = [
  "var(--flavor-green)",
  "var(--brand-accent)",
  "var(--flavor-orange)",
  "var(--state-info)",
  "var(--state-danger)",
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
    <section className="border-b border-[var(--border-muted)] bg-[var(--surface-base)] px-[var(--page-x)] py-4">
      <h2 className="text-[1.1rem] font-black text-[var(--text-title)]">향미 노트</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {noteLabels.map((note, index) => (
          <span
            key={note}
            className="rounded-full px-3 py-1.5 text-[0.75rem] font-medium text-[var(--text-inverse)]"
            style={{
              backgroundColor: noteColorMap[index % noteColorMap.length],
            }}
          >
            {note}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[0.86rem] leading-7 text-[var(--text-title)]">
        {description} {descriptionSuffix ?? ""}
      </p>
    </section>
  );
}
