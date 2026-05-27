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
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
      <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-[var(--text-muted)]">
        TASTING NOTE
      </p>
      <h2 className="mt-2 text-[1.1rem] font-black text-[var(--text-cafe-ink)]">
        향미 노트
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {noteLabels.map((note) => (
          <span
            key={note}
            className="bg-[var(--surface-cafe-tile)] px-3 py-1.5 text-[0.75rem] font-medium text-[var(--text-cafe-ink)]"
          >
            {note}
          </span>
        ))}
      </div>
      <p className="mt-4 pt-4 text-[0.86rem] leading-7 text-[var(--text-cafe-ink)]">
        {description} {descriptionSuffix ?? ""}
      </p>
    </section>
  );
}
