import { Camera } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";

export function QrScannerPanel() {
  return (
    <section className="px-4 pt-5">
      <div className="rounded-[1.55rem] bg-white px-4 py-5 shadow-[0_10px_26px_var(--rgba-34-34-34-006)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[1.35rem] font-black tracking-[-0.04em] text-[var(--palette-121212)]">
              카메라로 QR 스캔
            </h2>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--palette-666666)]">
              매장 테이블, 원두 라벨, 픽업 안내문에 있는 QR을 바로 읽어오세요.
            </p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
            <Camera className="size-5 text-[var(--primary-color)]" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.45rem] bg-[linear-gradient(180deg,var(--palette-eef2e8)_0%,var(--palette-e3e8dc)_100%)] px-4 py-6">
          <div className="mx-auto flex aspect-square max-w-[13rem] items-center justify-center rounded-[1.4rem] border-[10px] border-white bg-[linear-gradient(135deg,var(--palette-183824)_0%,var(--palette-2c5a40)_100%)] shadow-[0_12px_24px_var(--rgba-34-34-34-008)]">
            <div className="rounded-[1rem] border border-white/30 px-4 py-3 text-center">
              <p className="text-sm font-semibold text-white">카메라 준비</p>
              <p className="mt-1 text-[0.78rem] text-white/70">
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
            className="h-12 rounded-[1rem] border border-[var(--palette-d9d2c8)] bg-white text-sm font-semibold text-[var(--primary-color)]"
            type="button"
          >
            최근 QR 보기
          </button>
        </div>
      </div>
    </section>
  );
}
