import { QrCode, Coffee } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockMyBlendRecipes } from "@/mock/user";
import { ROUTES } from "@/shared/constants/routes";

const blendCards = [
  {
    id: "morning",
    title: "나의 모닝 블렌드",
    savedAt: "2026.03.15",
    source: "직접 저장",
    beanName: "에티오피아 예가체프 G1",
    method: "핸드드립",
    amount: "200g",
    isQr: false,
  },
  {
    id: "office",
    title: "오피스 블렌드",
    savedAt: "2026.02.28",
    source: "직접 저장",
    beanName: "콜롬비아 수프리모",
    method: "에스프레소",
    amount: "500g",
    isQr: false,
  },
  {
    id: "weekend",
    title: "주말 스페셜",
    savedAt: "2026.02.14",
    source: "QR 블렌드",
    beanName: "케냐 AA 키암부",
    method: "푸어오버",
    amount: "200g",
    isQr: true,
  },
  {
    id: "basic",
    title: "기본 원두",
    savedAt: "2026.01.30",
    source: "직접 저장",
    beanName: "과테말라 안티구아",
    method: "프렌치프레스",
    amount: "200g",
    isQr: false,
  },
] as const;

export function MyBlendPage() {
  const [mode, setMode] = useState<"filled" | "empty">("filled");

  if (mode === "empty") {
    return (
      <div className="bg-white px-5 pb-10 pt-4">
        <div className="flex justify-end">
          <button
            className="rounded-full bg-[#f2efe8] px-4 py-2 text-sm font-medium text-[#204a32]"
            onClick={() => setMode("filled")}
            type="button"
          >
            저장 목록 보기
          </button>
        </div>

        <section className="px-1 pb-10 pt-28 text-center">
          <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-[#dde7d6]">
            <div className="text-[4rem]">☕</div>
          </div>
          <h2 className="mt-10 text-[2.1rem] font-bold tracking-[-0.04em] text-[#171717]">
            저장된 블렌드가 없습니다
          </h2>
          <p className="mt-4 text-[1.15rem] leading-8 text-[#6d6a64]">
            상품 주문 시 '나의 블렌드로 저장'을
            <br />
            눌러 나만의 레시피를 보관해 보세요!
          </p>
        </section>

        <section className="rounded-[1.5rem] bg-[#f5f0e7] px-5 py-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-[0.4rem] bg-[#cfa54f] p-1 text-[#fffaf1]">
              <QrCode className="size-4" />
            </div>
            <div>
              <h3 className="text-[1.45rem] font-bold tracking-[-0.03em] text-[#21422f]">
                매장 QR로도 저장 가능!
              </h3>
              <p className="mt-2 text-[1rem] text-[#6d6a64]">
                매장에서 받은 QR을 스캔하면 자동 저장돼요
              </p>
            </div>
          </div>
        </section>

        <PrimaryButton asChild className="mt-8 h-16 w-full rounded-[1.2rem] text-[1.2rem] shadow-none">
          <Link to={ROUTES.products}>원두 쇼핑하러 가기</Link>
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f1] px-5 pb-8 pt-4">
      <div className="flex justify-end">
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#204a32]"
          onClick={() => setMode("empty")}
          type="button"
        >
          빈 상태 보기
        </button>
      </div>

      <section className="pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[#171717]">나의 블렌드</h1>
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#204a32] px-3 text-[1rem] font-bold text-white">
            {blendCards.length}
          </span>
        </div>

        <p className="mt-8 text-[1.55rem] font-bold tracking-[-0.04em] text-[#171717]">
          저장해둔 나만의 커스텀 원두예요
        </p>
        <p className="mt-3 text-[1.1rem] leading-7 text-[#6d6a64]">
          QR 스캔으로 저장된 블렌드도 여기서 확인하세요
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f2e7c3] px-3 py-1.5 text-[0.95rem] font-medium text-[#8a6a1b]">
          <span className="rounded-[0.3rem] bg-[#cfa54f] p-1 text-white">
            <QrCode className="size-3.5" />
          </span>
          매장 QR 블렌드
        </div>
      </section>

      <section className="mt-4 space-y-4">
        {blendCards.map((blend, index) => {
          const recipe = mockMyBlendRecipes[index % mockMyBlendRecipes.length];

          return (
            <article
              key={blend.id}
              className="overflow-hidden rounded-[1.75rem] border-2 border-[#204a32] bg-white shadow-[0_8px_20px_rgba(32,74,50,0.05)]"
            >
              <div className="flex items-start justify-between gap-3 bg-[#dfe8d6] px-5 py-4">
                <div>
                  <h2 className="text-[1.75rem] font-bold tracking-[-0.04em] text-[#204a32]">
                    {blend.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-[0.95rem] text-[#6f6a61]">
                    {blend.isQr ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#cfa54f] px-3 py-1 text-[#173726]">
                        <QrCode className="size-3.5" />
                        {blend.source}
                      </span>
                    ) : (
                      <>
                        <Coffee className="size-3.5" />
                        <span>{blend.source}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className="pt-1 text-[1rem] text-[#6f6a61]">{blend.savedAt}</span>
              </div>

              <div className="px-5 py-4">
                <p className="text-[1.55rem] font-bold tracking-[-0.04em] text-[#173726]">
                  {blend.beanName}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="min-w-[5.5rem] rounded-full bg-[#204a32] px-5 py-2 text-center text-[1rem] font-semibold text-white">
                    {recipe.notes[0]}
                  </span>
                  <span className="rounded-full bg-[#f3f2ef] px-4 py-2 text-[1rem] text-[#6f6a61]">
                    {blend.method}
                  </span>
                  <span className="rounded-full bg-[#f3f2ef] px-4 py-2 text-[1rem] text-[#6f6a61]">
                    {blend.amount}
                  </span>
                </div>

                <div className="mt-4 border-t border-[#ebe6dd] pt-4">
                  <div className="grid grid-cols-[1.65fr_1fr] gap-3">
                    <PrimaryButton
                      asChild
                      className="h-[3.25rem] rounded-[1rem] text-[1.15rem] shadow-none"
                    >
                      <Link to={`${ROUTES.products}/ethiopia-yirgacheffe`}>주문하기</Link>
                    </PrimaryButton>
                    <button
                      className="h-[3.25rem] rounded-[1rem] border border-[#d9d3c8] bg-white text-[1.1rem] font-medium text-[#c1bdb5]"
                      type="button"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
