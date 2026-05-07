import { QrCode } from "lucide-react";

export function QrHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--primary-color)] px-5 pb-8 pt-5 text-white">
      <div className="absolute right-[-2rem] top-[4rem] size-[12rem] rounded-full bg-[var(--rgba-92-125-101-022)]" />
      <div className="absolute right-[1.25rem] top-[7rem] size-[8rem] rounded-full bg-[var(--rgba-92-125-101-018)]" />

      <p className="text-[0.8rem] font-semibold tracking-[0.22em] text-white/70">
        QR / O2O
      </p>
      <h1 className="mt-3 text-[2.35rem] font-black leading-[1.18] tracking-[-0.06em]">
        매장에서 찍고,
        <br />
        앱에서 바로 이어가기
      </h1>
      <p className="mt-4 max-w-[15rem] text-[0.96rem] leading-7 text-white/82">
        메뉴 QR, 블렌드 QR, 픽업 QR을 한 번에 모아 매장 경험과 앱 주문 흐름을
        자연스럽게 연결합니다.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-color)] px-3 py-1.5 text-[0.8rem] font-bold text-[var(--primary-color)]">
        <QrCode className="size-3.5" />
        메뉴 · 블렌드 · 픽업 QR 지원
      </div>
    </section>
  );
}
