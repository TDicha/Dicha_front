import { QrCode } from "lucide-react";

interface MyBlendHeaderProps {
  blendCount: number;
}

export function MyBlendHeader({ blendCount }: MyBlendHeaderProps) {
  return (
    <section className="pt-4">
      <div className="flex items-center gap-3">
        <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          나의 블렌드
        </h1>
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--second-color)] px-3 text-[1rem] font-bold text-white">
          {blendCount}
        </span>
      </div>

      <p className="mt-8 text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
        저장해둔 나만의 커스텀 원두예요
      </p>
      <p className="mt-3 text-[1.1rem] leading-7 text-[var(--palette-6d6a64)]">
        QR 스캔으로 저장된 블렌드도 여기서 확인하세요
      </p>

      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--palette-f2e7c3)] px-3 py-1.5 text-[0.95rem] font-medium text-[var(--palette-8a6a1b)]">
        <span className="rounded-[0.3rem] bg-[var(--palette-cfa54f)] p-1 text-white">
          <QrCode className="size-3.5" />
        </span>
        매장 QR 블렌드
      </div>
    </section>
  );
}
