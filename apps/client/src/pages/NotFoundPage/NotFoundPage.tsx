import { NotFoundCard } from "@/features/not-found";

export function NotFoundPage() {
  return (
    <div className="page-shell items-center justify-center bg-[var(--surface-base)] px-5 py-10 text-center">
      <NotFoundCard />
    </div>
  );
}
