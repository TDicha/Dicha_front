import { PrimaryButton } from "@/components/common/PrimaryButton";

interface ReservationClassCtaSectionProps {
  onApply: () => void;
}

export function ReservationClassCtaSection({ onApply }: ReservationClassCtaSectionProps) {
  return (
    <section className="px-[var(--page-x)] pt-8">
      <h2 className="text-[clamp(1.25rem,5.5vw,1.45rem)] font-bold text-[var(--text-title)]">
        직접 커피를 만들어 보는건 어떨까요?
      </h2>
      <PrimaryButton
        className="mt-6 h-12 w-full text-[var(--text-muted)] text-[1rem] shadow-none"
        onClick={onApply}
      >
        클래스 신청하기
      </PrimaryButton>
    </section>
  );
}
