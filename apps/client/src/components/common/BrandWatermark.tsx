import { cn } from "@/lib/utils";

const dichaProfileImage = "/dicha-face-logo.png";

interface BrandWatermarkProps {
  className?: string;
}

export function BrandWatermark({ className }: BrandWatermarkProps) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none object-contain",
        className,
      )}
      src={dichaProfileImage}
    />
  );
}
