export function ReservationHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-primary)] px-[var(--page-x)] pb-7 pt-4 text-[var(--text-inverse)]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--brand-primary)_0%,var(--brand-primary-muted)_100%)]" />

      <p className="relative text-center text-[1.3rem] font-bold">
        커피 구독
      </p>

      <div className="relative mt-8 inline-flex rounded-full bg-[var(--brand-accent)] px-3.5 py-1.5 text-[0.8rem] font-bold text-[var(--brand-primary)]">
        🎉 첫 구독 20% 할인
      </div>

      <div className="relative mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0 max-w-[13.75rem]">
          <h1 className="break-keep text-[clamp(1.9rem,8vw,2.3rem)] font-bold leading-[1.22]">
            나만의 커피,
            <br />
            정기적으로
          </h1>
          <p className="mt-5 text-[0.92rem] text-[var(--overlay-white-80)]">
            원두 선택부터 로스팅까지 DICHA가 책임집니다
          </p>
        </div>
        <div className="relative mt-4 flex size-[clamp(6.25rem,32vw,8.75rem)] shrink-0 items-center justify-center">
          <div className="text-[clamp(4rem,20vw,5.6rem)]">☕</div>
        </div>
      </div>
    </section>
  );
}
