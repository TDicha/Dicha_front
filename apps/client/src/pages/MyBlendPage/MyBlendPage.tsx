import { useState } from "react";

import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import {
  MyBlendCardList,
  MyBlendEmptyState,
  MyBlendHeader,
  useMyBlendCards,
} from "@/features/my-page";

export function MyBlendPage() {
  const blendCards = useMyBlendCards();
  const [implementationFeature, setImplementationFeature] = useState<string | null>(null);

  if (!blendCards.length) {
    return <MyBlendEmptyState />;
  }

  return (
    <div className="bg-[var(--surface-blend-page)] px-[var(--page-x)] pb-8 pt-4">
      <MyBlendHeader blendCount={blendCards.length} />
      <MyBlendCardList
        blendCards={blendCards}
        onDelete={setImplementationFeature}
      />
      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
