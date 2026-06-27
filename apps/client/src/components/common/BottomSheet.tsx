import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: BottomSheetProps) {
  const sheet = (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 transition-[background-color,backdrop-filter] duration-300",
        open
          ? "pointer-events-auto bg-[var(--overlay-black-28)] backdrop-blur-[2px]"
          : "pointer-events-none bg-[var(--overlay-black-0)] backdrop-blur-none",
      )}
    >
      <button
        aria-label="바텀시트 닫기"
        className="absolute inset-0 h-full w-full"
        onClick={onClose}
        type="button"
      />
      <section
        className={cn(
          "absolute bottom-0 left-1/2 max-h-[88dvh] w-full max-w-[var(--app-max-width)] -translate-x-1/2 overflow-y-auto bg-[var(--surface-menu-board)] px-[var(--page-x)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 shadow-[var(--shadow-bottom-sheet)] transition-[transform,opacity] duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto mb-4 h-1 w-12 bg-[var(--text-cafe-ink)]" />
        <div className="mb-5 flex items-start justify-between gap-3 pb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
              CUSTOMIZE ORDER
            </p>
            <h3 className="mt-1 font-heading text-[1.1rem] font-semibold text-[var(--text-cafe-ink)]">
              {title}
            </h3>
          </div>
          <button
            className="bg-[var(--surface-cafe-tile)] px-3 py-1.5 text-sm font-medium text-[var(--text-cafe-ink)]"
            onClick={onClose}
            type="button"
          >
            닫기
          </button>
        </div>
        <div className="pb-1">{children}</div>
      </section>
    </div>
  );

  return typeof document === "undefined"
    ? sheet
    : createPortal(sheet, document.body);
}
