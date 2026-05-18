import { QrCode } from "lucide-react";

interface MyBlendHeaderProps {
  blendCount: number;
}

export function MyBlendHeader({ blendCount }: MyBlendHeaderProps) {
  return (
    <section className="pt-4">
      <div className="flex items-center gap-3">
        <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          나의 블렌드
        </h1>
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--brand-secondary)] px-3 text-[1rem] font-bold text-[var(--text-inverse)]">
          {blendCount}
        </span>
      </div>

      <p className="mt-8 text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
        저장해둔 나만의 커스텀 원두예요
      </p>
      <p className="mt-3 text-[1.1rem] leading-7 text-[var(--text-muted-warm)]">
        QR 스캔으로 저장된 블렌드도 여기서 확인하세요
      </p>

      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--surface-notice)] px-3 py-1.5 text-[0.95rem] font-medium text-[var(--text-notice)]">
        <span className="rounded-[0.3rem] bg-[var(--brand-accent-strong)] p-1 text-[var(--text-inverse)]">
          <QrCode className="size-3.5" />
        </span>
        매장 QR 블렌드
      </div>
    </section>
  );
}
