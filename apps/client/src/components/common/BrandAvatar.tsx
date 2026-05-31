import defaultBrandAvatarImage from "@/assets/images/image1.png";
import { cn } from "@/lib/utils";

interface BrandAvatarProps {
  alt?: string;
  className?: string;
  src?: string | null;
}

export function BrandAvatar({ alt = "", className, src }: BrandAvatarProps) {
  const imageSrc = src ?? defaultBrandAvatarImage;

  return (
    <div
      className={cn(
        "flex size-12 shrink-0 flex-col items-center justify-center overflow-hidden rounded-full bg-[var(--surface-menu-board)] text-[var(--text-cafe-ink)]",
        className,
      )}
    >
      <img alt={alt} className="size-full object-cover" src={imageSrc} />
    </div>
  );
}
