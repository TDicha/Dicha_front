const dichaHorseImage = "/dicha-running-logo.png";

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
        className="w-[72%] object-contain"
        src={dichaHorseImage}
      />
    </div>
  );
}
