import dichaLoadingImage from "@/assets/images/dichaloading.png";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  className?: string;
  message?: string;
}

export function LoadingScreen({
  className,
  message = "불러오는 중입니다",
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "cafe-tile-bg flex min-h-[12rem] flex-col items-center justify-center gap-4 px-[var(--page-x)] py-8 text-center",
        className,
      )}
      role="status"
    >
      <div aria-hidden="true" className="dicha-loading-window">
        <img alt="" className="dicha-loading-sprite" src={dichaLoadingImage} />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-cafe-ink)]">
        {message}
      </p>
    </div>
  );
}
