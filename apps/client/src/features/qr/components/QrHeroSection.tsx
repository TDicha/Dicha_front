import { QrCode } from "lucide-react";

export function QrHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-primary)] px-[var(--page-x)] pb-8 pt-5 text-[var(--text-inverse)]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--brand-primary)_0%,var(--brand-primary-muted)_100%)]" />

      <p className="relative text-[0.8rem] font-semibold text-[var(--text-primary-inverse)]">
        QR / O2O
      </p>
      <h1 className="relative mt-3 text-[clamp(1.8rem,8vw,2.15rem)] font-bold leading-[1.2]">
        매장에서 찍고,
        <br />
        앱에서 바로 이어가기
      </h1>
      <p className="relative mt-4 max-w-[15rem] text-[0.94rem] leading-7 text-[var(--text-primary-inverse)]">
        메뉴 QR, 블렌드 QR, 픽업 QR을 한 번에 모아 매장 경험과 앱 주문 흐름을
        자연스럽게 연결합니다.
      </p>

      <div className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-3 py-1.5 text-[0.8rem] font-bold text-[var(--text-on-accent)]">
        <QrCode className="size-3.5" />
        메뉴 · 블렌드 · 픽업 QR 지원
      </div>
    </section>
  );
}
