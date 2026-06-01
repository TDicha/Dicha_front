const dichaHorseImage = "/image2.webp";

interface AuthLogoMarkProps {
  sizeClassName?: string;
}

export function AuthLogoMark({
  sizeClassName = "size-[5.5rem]",
}: AuthLogoMarkProps) {
  return (
    <div
      className={[
        "flex items-center justify-center overflow-hidden rounded-full bg-[var(--surface-cream)] shadow-[inset_0_0_0_10px_var(--overlay-white-65)]",
        sizeClassName,
      ].join(" ")}
    >
      <img
        alt=""
        aria-hidden="true"
        className=" object-contain"
        src={dichaHorseImage}
      />
    </div>
  );
}
