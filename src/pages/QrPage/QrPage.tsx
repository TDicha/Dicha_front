import { Camera, Coffee, CupSoda, Keyboard, QrCode, ShieldAlert, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

const qrUseCases = [
  {
    icon: CupSoda,
    title: "매장 메뉴 받기",
    description: "테이블 QR이나 카운터 QR을 찍으면 오늘 추천 메뉴와 원두 상세로 바로 이어집니다.",
  },
  {
    icon: Sparkles,
    title: "나의 블렌드 저장",
    description: "바리스타가 추천한 블렌드를 QR로 받아두고 나중에 다시 주문할 수 있어요.",
  },
  {
    icon: Coffee,
    title: "픽업 · 구독 확인",
    description: "픽업 안내 QR이나 구독 박스 QR로 주문 상태와 원두 정보를 빠르게 확인합니다.",
  },
] as const;

export function QrPage() {
  const navigate = useNavigate();
  const qrCode = useAppStore((state) => state.qrDraft.code);
  const qrTargetId = useAppStore((state) => state.qrDraft.targetId);
  const resolvedTarget = useAppStore((state) => state.qrResolvedTarget);
  const setQrCode = useAppStore((state) => state.setQrCode);
  const resolveQrCode = useAppStore((state) => state.resolveQrCode);
  const clearQrResult = useAppStore((state) => state.clearQrResult);

  function handleResolve() {
    const normalized = qrCode.trim();

    if (!normalized) {
      return;
    }

    resolveQrCode();

    const target = normalized.toLowerCase().includes("blend")
      ? ROUTES.myBlend
      : `${ROUTES.products}/${qrTargetId ?? "ethiopia-yirgacheffe"}`;

    navigate(target);
  }

  return (
    <div className="bg-[#f4f2eb] pb-8">
      <section className="relative overflow-hidden bg-[#1d3e2b] px-5 pb-8 pt-5 text-white">
        <div className="absolute right-[-2rem] top-[4rem] size-[12rem] rounded-full bg-[rgba(92,125,101,0.22)]" />
        <div className="absolute right-[1.25rem] top-[7rem] size-[8rem] rounded-full bg-[rgba(92,125,101,0.18)]" />

        <p className="text-[0.8rem] font-semibold tracking-[0.22em] text-white/70">QR / O2O</p>
        <h1 className="mt-3 text-[2.35rem] font-black leading-[1.18] tracking-[-0.06em]">
          매장에서 찍고,
          <br />
          앱에서 바로 이어가기
        </h1>
        <p className="mt-4 max-w-[15rem] text-[0.96rem] leading-7 text-white/82">
          메뉴 QR, 블렌드 QR, 픽업 QR을 한 번에 모아 매장 경험과 앱 주문 흐름을 자연스럽게 연결합니다.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c39f54] px-3 py-1.5 text-[0.8rem] font-bold text-[#1d3e2b]">
          <QrCode className="size-3.5" />
          메뉴 · 블렌드 · 픽업 QR 지원
        </div>
      </section>

      <section className="px-4 pt-5">
        <div className="rounded-[1.55rem] bg-white px-4 py-5 shadow-[0_10px_26px_rgba(34,34,34,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[1.35rem] font-black tracking-[-0.04em] text-[#121212]">
                카메라로 QR 스캔
              </h2>
              <p className="mt-1 text-[0.92rem] leading-6 text-[#666666]">
                매장 테이블, 원두 라벨, 픽업 안내문에 있는 QR을 바로 읽어오세요.
              </p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-full bg-[#edf3ec]">
              <Camera className="size-5 text-[#1d3e2b]" />
            </div>
          </div>

          <div className="mt-5 rounded-[1.45rem] bg-[linear-gradient(180deg,#eef2e8_0%,#e3e8dc_100%)] px-4 py-6">
            <div className="mx-auto flex aspect-square max-w-[13rem] items-center justify-center rounded-[1.4rem] border-[10px] border-white bg-[linear-gradient(135deg,#183824_0%,#2c5a40_100%)] shadow-[0_12px_24px_rgba(34,34,34,0.08)]">
              <div className="rounded-[1rem] border border-white/30 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-white">카메라 준비</p>
                <p className="mt-1 text-[0.78rem] text-white/70">QR을 화면 중앙에 맞춰주세요</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <PrimaryButton className="h-12 rounded-[1rem] shadow-none">카메라 열기</PrimaryButton>
            <button
              className="h-12 rounded-[1rem] border border-[#d9d2c8] bg-white text-sm font-semibold text-[#1d3e2b]"
              type="button"
            >
              최근 QR 보기
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="rounded-[1.55rem] bg-white px-4 py-5 shadow-[0_10px_26px_rgba(34,34,34,0.06)]">
          <h2 className="text-[1.35rem] font-black tracking-[-0.04em] text-[#121212]">
            언제 QR을 쓰면 좋을까요?
          </h2>
          <div className="mt-4 space-y-3">
            {qrUseCases.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-[1.2rem] border border-[#ece6dc] bg-[#fcfbf8] px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#edf3ec]">
                    <Icon className="size-4.5 text-[#1d3e2b]" />
                  </div>
                  <div>
                    <h3 className="text-[1.05rem] font-bold text-[#121212]">{title}</h3>
                    <p className="mt-1 text-[0.92rem] leading-6 text-[#666666]">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="rounded-[1.55rem] bg-[#f5edd8] px-4 py-5 shadow-[0_10px_26px_rgba(34,34,34,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/80">
              <Keyboard className="size-5 text-[#1d3e2b]" />
            </div>
            <div className="flex-1">
              <h2 className="text-[1.25rem] font-black tracking-[-0.04em] text-[#121212]">
                수동 코드 입력
              </h2>
              <p className="mt-1 text-[0.92rem] leading-6 text-[#666666]">
                카메라를 사용할 수 없으면 바리스타가 안내한 코드를 직접 입력해도 같은 흐름으로 연결됩니다.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  className="flex-1 rounded-[1rem] border border-[#ddd5c9] bg-white px-4 py-3 text-sm text-[#1d3e2b] placeholder:text-[#8f897f]"
                  onChange={(event) => setQrCode(event.target.value)}
                  placeholder="예: DICHA-BLEND-2048"
                  value={qrCode}
                />
                <button
                  className="rounded-[1rem] bg-[#1d3e2b] px-4 py-3 text-sm font-semibold text-white"
                  onClick={handleResolve}
                  type="button"
                >
                  확인
                </button>
              </div>
              {resolvedTarget ? (
                <div className="mt-3 rounded-[1rem] bg-white/85 px-4 py-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-[#777169]">연결 대상</span>
                    <span className="font-semibold text-[#1d3e2b]">
                      {resolvedTarget === "my-blend" ? "나의 블렌드" : "상품 상세"}
                    </span>
                  </div>
                  <button
                    className="mt-2 text-sm font-medium text-[#1d3e2b] underline-offset-4 hover:underline"
                    onClick={clearQrResult}
                    type="button"
                  >
                    입력 초기화
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="rounded-[1.45rem] border border-[rgba(148,35,30,0.08)] bg-[rgba(148,35,30,0.03)] px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/85">
              <ShieldAlert className="size-5 text-[#94231e]" />
            </div>
            <div>
              <h2 className="text-[1.05rem] font-bold text-[#121212]">권한이 없을 때도 진행 가능</h2>
              <p className="mt-1 text-[0.92rem] leading-6 text-[#666666]">
                브라우저 카메라 권한이 꺼져 있어도 수동 입력과 최근 QR 내역으로 주문 흐름을 이어갈 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
