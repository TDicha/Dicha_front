import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

export function ReservationClassCtaSection() {
  return (
    <section className="px-5 pt-8">
      <h2 className="text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--text-title)]">
        직접 커피를 만들어 보는건 어떨까요?
      </h2>
      <PrimaryButton
        asChild
        className="mt-6 h-12 w-full rounded-[0.95rem] text-[1rem] shadow-none"
      >
        <Link to={ROUTES.reservationClass}>클래스 신청하기</Link>
      </PrimaryButton>
    </section>
  );
}
