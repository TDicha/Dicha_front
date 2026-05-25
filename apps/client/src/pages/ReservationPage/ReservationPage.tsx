import { useState } from "react";

import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import {
  ReservationClassCtaSection,
  ReservationHeroSection,
  ReservationPlanSelectionSection,
  type ReservationPlanId,
} from "@/features/reservation";

export function ReservationPage() {
  const [selectedPlanId, setSelectedPlanId] =
    useState<ReservationPlanId>("home");
  const [implementationFeature, setImplementationFeature] = useState<string | null>(null);

  function handleSubscriptionRequest(planId: ReservationPlanId) {
    setSelectedPlanId(planId);
    setImplementationFeature("구독 신청");
  }

  return (
    <div className="bg-[var(--surface-app)] pb-8">
      <ReservationHeroSection />
      <ReservationPlanSelectionSection
        onSubscribe={handleSubscriptionRequest}
        selectedPlanId={selectedPlanId}
      />
      <ReservationClassCtaSection onApply={() => setImplementationFeature("클래스 신청")} />
      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
