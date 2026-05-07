import { ShieldAlert } from "lucide-react";

export function QrPermissionNotice() {
  return (
    <section className="px-4 pt-4">
      <div className="rounded-[1.45rem] border border-[var(--rgba-148-35-30-008)] bg-[var(--rgba-148-35-30-003)] px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/85">
            <ShieldAlert className="size-5 text-[var(--danger-color)]" />
          </div>
          <div>
            <h2 className="text-[1.05rem] font-bold text-[var(--palette-121212)]">
              권한이 없을 때도 진행 가능
            </h2>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--palette-666666)]">
              브라우저 카메라 권한이 꺼져 있어도 수동 입력과 최근 QR 내역으로
              주문 흐름을 이어갈 수 있어요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
