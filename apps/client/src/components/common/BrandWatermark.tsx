import { cn } from "@/lib/utils";

const dichaProfileImage = "/dichaprofile.webp";

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
