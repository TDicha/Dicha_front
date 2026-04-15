import { Camera, Keyboard, QrCode, ShieldAlert } from "lucide-react";

import { useAppStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { AppCard } from "@/components/common/AppCard";

export function QrPage() {
  const qrCode = useAppStore((state) => state.qrDraft.code);
  const resolvedTarget = useAppStore((state) => state.qrResolvedTarget);
  const setQrCode = useAppStore((state) => state.setQrCode);
  const resolveQrCode = useAppStore((state) => state.resolveQrCode);
  const clearQrResult = useAppStore((state) => state.clearQrResult);

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="rounded-[1.75rem] px-5 py-5" padding="none" variant="hero-green">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70">QR PICKUP</p>
            <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
              매장 QR로
              <br />
              빠르게 연결
            </h1>
            <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/78">
              픽업 코드나 블렌드 QR을 스캔하면 상품 상세 또는 나의 블렌드 흐름으로 이어집니다.
            </p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/10">
            <QrCode className="size-9 text-[#f1d08b]" />
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(29,62,43,0.08)]">
            <Camera className="size-5 text-[var(--color-primary-green)]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              카메라 스캔
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              카메라 권한을 허용하면 QR을 바로 인식해 상품 상세나 저장된 블렌드로 연결해드려요.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.3rem] bg-[linear-gradient(180deg,#f5f1e8_0%,#ebe2d3_100%)] px-4 py-8">
          <div className="mx-auto flex aspect-square max-w-[13rem] items-center justify-center rounded-[1.5rem] border-[12px] border-white bg-[repeating-linear-gradient(90deg,#173726_0,#173726_10px,#fff_10px,#fff_20px),repeating-linear-gradient(180deg,#173726_0,#173726_10px,#fff_10px,#fff_20px)] bg-blend-screen shadow-[0_16px_28px_rgba(31,37,31,0.08)]">
            <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--color-primary-green)]">
              Scan Ready
            </div>
          </div>
        </div>

        <PrimaryButton className="mt-4 w-full">카메라 열기</PrimaryButton>
      </AppCard>

      <AppCard variant="warm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/75">
            <Keyboard className="size-5 text-[var(--color-primary-green)]" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              수동 코드 입력
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              카메라를 사용할 수 없으면 매장에서 받은 코드를 직접 입력할 수 있어요.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 rounded-[1rem] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-3 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--color-muted)]"
                onChange={(event) => setQrCode(event.target.value)}
                placeholder="예: DICHA-QR-2048"
                value={qrCode}
              />
              <button
                className="rounded-[1rem] bg-[var(--color-primary-green)] px-4 py-3 text-sm font-semibold text-white"
                onClick={resolveQrCode}
                type="button"
              >
                확인
              </button>
            </div>
            {resolvedTarget ? (
              <div className="mt-3 flex items-center justify-between rounded-[1rem] bg-white/80 px-4 py-3 text-sm">
                <span className="text-[var(--color-muted)]">Mock 연결 대상</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[var(--color-primary-green)]">
                    {resolvedTarget === "my-blend" ? "나의 블렌드" : "상품 상세"}
                  </span>
                  <button
                    className="text-[var(--color-primary-green)] underline-offset-4 hover:underline"
                    onClick={clearQrResult}
                    type="button"
                  >
                    초기화
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AppCard>

      <AppCard variant="danger">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/80">
            <ShieldAlert className="size-5 text-[var(--color-primary-red)]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              권한이 거부된 경우
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              브라우저 설정에서 카메라 권한을 다시 허용하거나, 아래의 수동 입력으로 동일하게 진행할 수 있습니다.
            </p>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
