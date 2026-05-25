import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ImplementationNoticeModalProps {
  featureLabel: string | null;
  onClose: () => void;
}

export function ImplementationNoticeModal({
  featureLabel,
  onClose,
}: ImplementationNoticeModalProps) {
  if (!featureLabel || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-black-28)] px-[var(--page-x)]">
      <button
        aria-label="안내 닫기"
        className="absolute inset-0 h-full w-full"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="relative w-full max-w-[20rem] rounded-[var(--radius-card)] bg-[var(--surface-base)] px-5 pb-5 pt-4 shadow-[var(--shadow-bottom-sheet)]"
        role="dialog"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-[var(--text-title)]">{featureLabel}</h2>
          <button
            aria-label="안내 닫기"
            className="flex size-8 items-center justify-center rounded-full text-[var(--text-muted)]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
          현재 구현 중입니다. 준비가 완료되면 이용할 수 있어요.
        </p>
      </section>
    </div>,
    document.body,
  );
}
