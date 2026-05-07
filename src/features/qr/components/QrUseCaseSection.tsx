import { Coffee, CupSoda, Sparkles } from "lucide-react";

const qrUseCases = [
  {
    icon: CupSoda,
    title: "매장 메뉴 받기",
    description:
      "테이블 QR이나 카운터 QR을 찍으면 오늘 추천 메뉴와 원두 상세로 바로 이어집니다.",
  },
  {
    icon: Sparkles,
    title: "나의 블렌드 저장",
    description:
      "바리스타가 추천한 블렌드를 QR로 받아두고 나중에 다시 주문할 수 있어요.",
  },
  {
    icon: Coffee,
    title: "픽업 · 구독 확인",
    description:
      "픽업 안내 QR이나 구독 박스 QR로 주문 상태와 원두 정보를 빠르게 확인합니다.",
  },
] as const;

export function QrUseCaseSection() {
  return (
    <section className="px-4 pt-4">
      <div className="rounded-[1.55rem] bg-white px-4 py-5 shadow-[0_10px_26px_var(--rgba-34-34-34-006)]">
        <h2 className="text-[1.35rem] font-black tracking-[-0.04em] text-[var(--palette-121212)]">
          언제 QR을 쓰면 좋을까요?
        </h2>
        <div className="mt-4 space-y-3">
          {qrUseCases.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-[1.2rem] border border-[var(--palette-ece6dc)] bg-[var(--palette-fcfbf8)] px-4 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
                  <Icon className="size-4.5 text-[var(--primary-color)]" />
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-bold text-[var(--palette-121212)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-[0.92rem] leading-6 text-[var(--palette-666666)]">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
