import { StatCard } from "@/components/common/StatCard";

export function MyStatsSection() {
  return (
    <section className="my-8 grid grid-cols-3 gap-3">
      <StatCard label="주문 횟수" value="12" />
      <StatCard label="저장 블렌드" value="4" />
      <StatCard label="멤버십" value="Gold" />
    </section>
  );
}
