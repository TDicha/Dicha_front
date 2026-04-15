import type { ReactNode } from "react";

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
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 transition-[background-color,backdrop-filter] duration-300",
        open
          ? "pointer-events-auto bg-black/28 backdrop-blur-[2px]"
          : "pointer-events-none bg-black/0 backdrop-blur-none",
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
          "absolute bottom-0 left-1/2 max-h-[84vh] w-full max-w-md -translate-x-1/2 overflow-y-auto rounded-t-[1.9rem] border border-white/70 bg-[rgba(255,252,247,0.98)] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_42px_rgba(20,28,21,0.18)] transition-[transform,opacity] duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[rgba(29,62,43,0.18)]" />
        <div className="mb-5 flex items-start justify-between gap-3 border-b border-[rgba(29,62,43,0.08)] pb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-muted)]">
              CUSTOMIZE ORDER
            </p>
            <h3 className="mt-1 font-heading text-[1.1rem] font-semibold text-[var(--color-primary-green)]">
              {title}
            </h3>
          </div>
          <button
            className="rounded-full border border-[rgba(29,62,43,0.1)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--color-primary-green)] shadow-[0_6px_16px_rgba(29,62,43,0.06)]"
            onClick={onClose}
            type="button"
          >
            닫기
          </button>
        </div>
        <div className="pb-1">
          {children}
        </div>
      </section>
    </div>
  );
}
