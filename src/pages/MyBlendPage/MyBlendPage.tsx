import {
  MyBlendCardList,
  MyBlendEmptyState,
  MyBlendHeader,
  useMyBlendCards,
} from "@/features/my-page";

export function MyBlendPage() {
  const blendCards = useMyBlendCards();

  if (!blendCards.length) {
    return <MyBlendEmptyState />;
  }

  return (
    <div className="bg-[var(--surface-blend-page)] px-5 pb-8 pt-4">
      <MyBlendHeader blendCount={blendCards.length} />
      <MyBlendCardList blendCards={blendCards} />
    </div>
  );
}
