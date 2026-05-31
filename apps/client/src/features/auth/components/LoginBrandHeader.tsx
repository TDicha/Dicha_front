import { AuthLogoMark } from "@/features/auth/components/AuthLogoMark";

export function LoginBrandHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <AuthLogoMark />
      <h2 className="mt-4 font-heading text-[2.15rem] font-semibold tracking-[-0.04em] text-[var(--brand-primary)]">
        DICHA
      </h2>
      <p className="mt-1 text-sm text-[var(--text-disabled)]">한 잔의 커피, 향으로 기억되다</p>
    </div>
  );
}
