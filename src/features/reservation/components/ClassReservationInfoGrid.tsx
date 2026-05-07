import { Clock3, MapPin } from "lucide-react";

export function ClassReservationInfoGrid() {
  return (
    <section className="grid grid-cols-2 gap-3 text-sm">
      <div className="rounded-[1.3rem] border border-[var(--rgba-17-24-39-006)] bg-[var(--rgba-29-62-43-004)] px-4 py-4">
        <p className="text-[var(--color-muted)]">진행 시간</p>
        <p className="mt-2 flex items-center gap-2 font-medium text-[var(--color-primary-green)]">
          <Clock3 className="size-4" />
          90분 클래스
        </p>
      </div>
      <div className="rounded-[1.3rem] border border-[var(--rgba-17-24-39-006)] bg-[var(--rgba-29-62-43-004)] px-4 py-4">
        <p className="text-[var(--color-muted)]">진행 지점</p>
        <p className="mt-2 flex items-center gap-2 font-medium text-[var(--color-primary-green)]">
          <MapPin className="size-4" />
          성수 플래그십
        </p>
      </div>
    </section>
  );
}
