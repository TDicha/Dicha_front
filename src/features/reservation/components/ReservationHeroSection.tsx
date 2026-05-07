export function ReservationHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--primary-color)] px-5 pb-7 pt-4 text-white">
      <div className="absolute right-[-2.75rem] top-[3.5rem] size-[15.5rem] rounded-full bg-[var(--rgba-68-108-76-028)]" />
      <div className="absolute right-[1.25rem] top-[6.5rem] size-[10.25rem] rounded-full bg-[var(--rgba-96-128-100-022)]" />
      <div className="absolute bottom-0 left-0 h-8 w-full bg-[var(--rgba-10-20-13-024)]" />

      <p className="relative text-center text-[1.45rem] font-black tracking-[-0.03em]">
        커피 구독
      </p>

      <div className="relative mt-8 inline-flex rounded-full bg-[var(--accent-color)] px-3.5 py-1.5 text-[0.8rem] font-bold text-[var(--primary-color)]">
        🎉 첫 구독 20% 할인
      </div>

      <div className="relative mt-5 flex items-start justify-between gap-3">
        <div className="max-w-[13.75rem]">
          <h1 className="text-[2.8rem] font-black leading-[1.18] tracking-[-0.07em]">
            나만의 커피,
            <br />
            정기적으로
          </h1>
          <p className="mt-5 text-[0.92rem] text-white/80">
            원두 선택부터 로스팅까지 DICHA가 책임집니다
          </p>
        </div>
        <div className="relative mt-4 flex h-[8.75rem] w-[8.75rem] shrink-0 items-center justify-center">
          <div className="text-[5.6rem]">☕</div>
        </div>
      </div>
    </section>
  );
}
