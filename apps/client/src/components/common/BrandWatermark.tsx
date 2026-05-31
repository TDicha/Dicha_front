import dichaProfileImage from "@/assets/images/dichaprofile.png";
import { cn } from "@/lib/utils";

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
