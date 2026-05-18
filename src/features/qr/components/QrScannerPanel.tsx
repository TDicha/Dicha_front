import { Camera } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";

export function QrScannerPanel() {
  return (
    <section className="px-4 pt-5">
      <div className="rounded-[1.55rem] bg-[var(--surface-base)] px-4 py-5 shadow-[0_10px_26px_var(--shadow-neutral-alpha-6)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[1.35rem] font-black tracking-[-0.04em] text-[var(--text-title)]">
              카메라로 QR 스캔
            </h2>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--text-muted-subtle)]">
              매장 테이블, 원두 라벨, 픽업 안내문에 있는 QR을 바로 읽어오세요.
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-[var(--surface-icon-green)]">
            <Camera className="size-5 text-[var(--brand-primary)]" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.45rem] bg-[linear-gradient(180deg,var(--surface-soft-green)_0%,var(--surface-info-card)_100%)] px-4 py-6">
          <div className="mx-auto flex aspect-square max-w-[13rem] items-center justify-center rounded-[1.4rem] border-[10px] border-[var(--surface-base)] bg-[linear-gradient(135deg,var(--gradient-qr-start)_0%,var(--gradient-qr-end)_100%)] shadow-[0_12px_24px_var(--shadow-neutral-alpha-8)]">
            <div className="rounded-[1rem] border border-[var(--border-overlay-30)] px-4 py-3 text-center">
              <p className="text-sm font-semibold text-[var(--text-inverse)]">카메라 준비</p>
              <p className="mt-1 text-[0.78rem] text-[var(--overlay-white-70)]">
                QR을 화면 중앙에 맞춰주세요
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <PrimaryButton className="h-12 rounded-[1rem] shadow-none">
            카메라 열기
          </PrimaryButton>
          <button
            className="h-12 rounded-[1rem] border border-[var(--border-input-warm)] bg-[var(--surface-base)] text-sm font-semibold text-[var(--brand-primary)]"
            type="button"
          >
            최근 QR 보기
          </button>
        </div>
      </div>
    </section>
  );
}
