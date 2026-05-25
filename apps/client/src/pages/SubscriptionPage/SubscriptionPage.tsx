import { useState } from "react";

import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import {
  SubscriptionCycleSection,
  SubscriptionDangerActions,
  SubscriptionDeliveryHistorySection,
  SubscriptionEmptyState,
  SubscriptionManageSection,
  SubscriptionSummaryCard,
  getDeliveryDayLabel,
  useActiveSubscription,
} from "@/features/subscription";

export function SubscriptionPage() {
  const { activePlan, subscriptionDetail } = useActiveSubscription();
  const [selectedCycle, setSelectedCycle] = useState(
    subscriptionDetail?.selectedCycle ??
      subscriptionDetail?.cycleOptions[0] ??
      "",
  );
  const [implementationFeature, setImplementationFeature] = useState<string | null>(null);

  if (
    !activePlan ||
    !subscriptionDetail ||
    subscriptionDetail.status === "empty"
  ) {
    return (
      <>
        <SubscriptionEmptyState onStart={() => setImplementationFeature("구독 시작")} />
        <ImplementationNoticeModal
          featureLabel={implementationFeature}
          onClose={() => setImplementationFeature(null)}
        />
      </>
    );
  }

  return (
    <div className="bg-[var(--surface-page)] pb-10">
      <SubscriptionSummaryCard
        activePlan={activePlan}
        deliveryDayLabel={getDeliveryDayLabel(activePlan.nextDeliveryLabel)}
        subscriptionDetail={subscriptionDetail}
      />
      <SubscriptionManageSection
        onAction={setImplementationFeature}
        perks={activePlan.perks}
      />
      <SubscriptionCycleSection
        cycleOptions={subscriptionDetail.cycleOptions}
        onSelectCycle={setSelectedCycle}
        selectedCycle={selectedCycle}
      />
      <SubscriptionDangerActions onAction={setImplementationFeature} />
      <SubscriptionDeliveryHistorySection
        deliveryHistory={subscriptionDetail.deliveryHistory}
        onViewAll={() => setImplementationFeature("배송 내역 전체보기")}
      />
      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
