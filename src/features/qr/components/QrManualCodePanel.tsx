import { Keyboard } from "lucide-react";

import type { QrResultTarget } from "@/shared/types/models";

interface QrManualCodePanelProps {
  qrCode: string;
  resolvedTarget?: QrResultTarget | null;
  onChangeQrCode: (code: string) => void;
  onClearResult: () => void;
  onResolve: () => void;
}

export function QrManualCodePanel({
  qrCode,
  resolvedTarget,
  onChangeQrCode,
  onClearResult,
  onResolve,
}: QrManualCodePanelProps) {
  return (
    <section className="px-4 pt-4">
      <div className="rounded-[1.55rem] bg-[var(--palette-f5edd8)] px-4 py-5 shadow-[0_10px_26px_var(--rgba-34-34-34-004)]">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/80">
            <Keyboard className="size-5 text-[var(--primary-color)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-[1.25rem] font-black tracking-[-0.04em] text-[var(--palette-121212)]">
              수동 코드 입력
            </h2>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--palette-666666)]">
              카메라를 사용할 수 없으면 바리스타가 안내한 코드를 직접 입력해도
              같은 흐름으로 연결됩니다.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 rounded-[1rem] border border-[var(--palette-ddd5c9)] bg-white px-4 py-3 text-sm text-[var(--primary-color)] placeholder:text-[var(--palette-8f897f)]"
                onChange={(event) => onChangeQrCode(event.target.value)}
                placeholder="예: DICHA-BLEND-2048"
                value={qrCode}
              />
              <button
                className="rounded-[1rem] bg-[var(--primary-color)] px-4 py-3 text-sm font-semibold text-white"
                onClick={onResolve}
                type="button"
              >
                확인
              </button>
            </div>
            {resolvedTarget ? (
              <div className="mt-3 rounded-[1rem] bg-white/85 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--palette-777169)]">
                    연결 대상
                  </span>
                  <span className="font-semibold text-[var(--primary-color)]">
                    {resolvedTarget === "my-blend" ? "나의 블렌드" : "상품 상세"}
                  </span>
                </div>
                <button
                  className="mt-2 text-sm font-medium text-[var(--primary-color)] underline-offset-4 hover:underline"
                  onClick={onClearResult}
                  type="button"
                >
                  입력 초기화
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
