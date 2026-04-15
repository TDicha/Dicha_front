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
        "fixed inset-0 z-40 transition",
        open ? "pointer-events-auto bg-black/35" : "pointer-events-none bg-black/0",
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
          "absolute bottom-0 left-1/2 max-h-[82vh] w-full max-w-md -translate-x-1/2 overflow-y-auto rounded-t-[2rem] bg-[var(--color-card-strong)] px-5 pb-8 pt-4 shadow-2xl transition-transform",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[rgba(29,62,43,0.15)]" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            {title}
          </h3>
          <button
            className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1.5 text-sm text-[var(--color-primary-green)]"
            onClick={onClose}
            type="button"
          >
            닫기
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
