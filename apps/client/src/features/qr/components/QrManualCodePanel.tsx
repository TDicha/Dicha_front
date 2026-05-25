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
    <section className="px-[var(--page-x)] pt-4">
      <div className="rounded-[var(--radius-card)] bg-[var(--surface-badge-accent)] px-4 py-5 shadow-[0_10px_26px_var(--shadow-neutral-alpha-4)]">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--overlay-white-80)]">
            <Keyboard className="size-5 text-[var(--brand-primary)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-title)]">
              수동 코드 입력
            </h2>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--text-muted-subtle)]">
              카메라를 사용할 수 없으면 바리스타가 안내한 코드를 직접 입력해도
              같은 흐름으로 연결됩니다.
            </p>
            <div className="mt-4 flex flex-col gap-2 min-[360px]:flex-row">
              <input
                className="min-w-0 flex-1 rounded-[var(--radius-control)] border border-[var(--border-input-qr)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder-warm)]"
                onChange={(event) => onChangeQrCode(event.target.value)}
                placeholder="예: DICHA-BLEND-2048"
                value={qrCode}
              />
              <button
                className="rounded-[var(--radius-control)] bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--text-inverse)]"
                onClick={onResolve}
                type="button"
              >
                확인
              </button>
            </div>
            {resolvedTarget ? (
              <div className="mt-3 rounded-[var(--radius-control)] bg-[var(--overlay-white-85)] px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--text-list-muted)]">
                    연결 대상
                  </span>
                  <span className="font-semibold text-[var(--brand-primary)]">
                    {resolvedTarget === "my-blend" ? "나의 블렌드" : "상품 상세"}
                  </span>
                </div>
                <button
                  className="mt-2 text-sm font-medium text-[var(--brand-primary)] underline-offset-4 hover:underline"
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
