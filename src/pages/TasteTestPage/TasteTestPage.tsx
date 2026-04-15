import { ArrowLeft, ArrowRight, CheckCircle2, Coffee, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { usePreferenceStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";

const tasteQuestions = [
  {
    key: "brew" as const,
    title: "어떤 방식으로 커피를 가장 자주 마시나요?",
    description: "일상적인 추출 방식이 취향의 방향을 가장 잘 보여줘요.",
    options: [
      { label: "핸드드립 / 푸어오버", value: "pour-over" },
      { label: "에스프레소 / 라떼", value: "espresso" },
      { label: "상황에 따라 다양하게", value: "varied" },
    ],
  },
  {
    key: "flavor" as const,
    title: "가장 끌리는 향미는 어떤 쪽인가요?",
    description: "첫 모금에서 기대하는 향의 인상을 골라주세요.",
    options: [
      { label: "꽃향, 베리, 시트러스", value: "floral" },
      { label: "초콜릿, 견과류, 캐러멜", value: "chocolate" },
      { label: "둘 다 좋고 밸런스가 중요", value: "balanced" },
    ],
  },
  {
    key: "mood" as const,
    title: "오늘 원하는 커피의 무드는 무엇인가요?",
    description: "마시는 순간의 분위기를 정하면 추천이 더 정확해져요.",
    options: [
      { label: "가볍고 산뜻하게", value: "bright" },
      { label: "묵직하고 깊게", value: "deep" },
      { label: "편안하고 데일리하게", value: "daily" },
    ],
  },
];

export function TasteTestPage() {
  const step = usePreferenceStore((state) => state.step);
  const preference = usePreferenceStore((state) => state.preference);
  const currentQuestionIndex = usePreferenceStore((state) => state.currentQuestionIndex);
  const answers = usePreferenceStore((state) => state.answers);
  const startTest = usePreferenceStore((state) => state.startTest);
  const answerQuestion = usePreferenceStore((state) => state.answerQuestion);
  const goToPreviousQuestion = usePreferenceStore((state) => state.goToPreviousQuestion);
  const completeTest = usePreferenceStore((state) => state.completeTest);
  const resetTest = usePreferenceStore((state) => state.resetTest);

  const recommendedProducts = mockProducts
    .filter((product) => product.roastLevel === preference.roastLevel)
    .slice(0, 3);

  const currentQuestion = tasteQuestions[currentQuestionIndex];
  const selectedValue = currentQuestion ? answers[currentQuestion.key] : undefined;

  function handleSelect(value: string) {
    if (!currentQuestion) return;

    if (currentQuestionIndex === tasteQuestions.length - 1) {
      answerQuestion(currentQuestion.key, value);
      completeTest();
      return;
    }

    answerQuestion(currentQuestion.key, value);
  }

  if (step === "intro") {
    return (
      <div className="page-content space-y-5 bg-white pt-4">
        <AppCard className="rounded-[1.8rem] px-5 py-6" padding="none" variant="hero-blue">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-white/70">TASTE TEST</p>
              <h1 className="mt-2 font-heading text-[1.9rem] font-semibold tracking-[-0.04em]">
                당신에게 맞는
                <br />
                오늘의 원두 찾기
              </h1>
              <p className="mt-3 max-w-[14rem] text-sm leading-6 text-white/82">
                세 가지 질문만 답하면 취향에 맞는 로스팅과 추천 원두를 바로 보여드려요.
              </p>
            </div>
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/12">
              <Sparkles className="size-9 text-[#f1d08b]" />
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            이런 분께 추천해요
          </h2>
          <div className="mt-4 space-y-3">
            {[
              "취향에 맞는 원두를 빠르게 고르고 싶은 분",
              "산미, 바디감, 향미 방향을 먼저 정하고 싶은 분",
              "디차 원두 중 어디서 시작할지 고민되는 분",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3 text-sm text-[var(--color-primary-green)]"
              >
                <CheckCircle2 className="size-4 text-[var(--color-primary-green)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard variant="warm">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/75">
              <Coffee className="size-5 text-[var(--color-primary-green)]" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                테스트는 약 30초 걸려요
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                결과를 보면 바로 추천 원두를 확인하고 상품 리스트로 이어서 볼 수 있어요.
              </p>
            </div>
          </div>
        </AppCard>

        <PrimaryButton className="w-full" onClick={startTest}>
          테스트 시작하기
          <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
    );
  }

  if (step === "question" && currentQuestion) {
    return (
      <div className="page-content space-y-5 bg-white pt-4">
        <AppCard className="rounded-[1.8rem] px-5 py-6" padding="none" variant="hero-blue">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/70">
            QUESTION {currentQuestionIndex + 1} / {tasteQuestions.length}
          </p>
          <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
            {currentQuestion.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/82">{currentQuestion.description}</p>
          <div className="mt-5 h-2 rounded-full bg-white/15">
            <div
              className="h-2 rounded-full bg-[#f1d08b] transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / tasteQuestions.length) * 100}%` }}
            />
          </div>
        </AppCard>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              className={[
                "w-full rounded-[1.25rem] border px-4 py-4 text-left transition",
                selectedValue === option.value
                  ? "border-[var(--color-primary-green)] bg-[rgba(29,62,43,0.06)]"
                  : "border-[rgba(17,24,39,0.08)] bg-white",
              ].join(" ")}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[var(--color-primary-green)]">
                    {option.label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {option.value === "pour-over" && "향의 결이 섬세하게 느껴지는 타입"}
                    {option.value === "espresso" && "진하고 깊은 풍미를 선호하는 타입"}
                    {option.value === "varied" && "상황별로 균형감 있는 선택을 원하는 타입"}
                    {option.value === "floral" && "화사하고 밝은 향을 좋아하는 타입"}
                    {option.value === "chocolate" && "달콤하고 고소한 계열을 좋아하는 타입"}
                    {option.value === "balanced" && "극단보다 밸런스를 중요하게 보는 타입"}
                    {option.value === "bright" && "가볍고 상쾌한 하루를 원하는 타입"}
                    {option.value === "deep" && "묵직하고 몰입감 있는 한 잔을 원하는 타입"}
                    {option.value === "daily" && "부담 없이 매일 마실 커피를 원하는 타입"}
                  </p>
                </div>
                <ArrowRight className="size-4 text-[var(--color-muted)]" />
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <PrimaryButton
            className="flex-1 bg-white text-[var(--color-primary-green)]"
            onClick={currentQuestionIndex === 0 ? resetTest : goToPreviousQuestion}
            variant="outline"
          >
            <ArrowLeft className="size-4" />
            {currentQuestionIndex === 0 ? "처음으로" : "이전"}
          </PrimaryButton>
          <PrimaryButton asChild className="flex-1">
            <Link to={ROUTES.home}>나중에 할게요</Link>
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content space-y-5 bg-white pt-4">
      <AppCard className="rounded-[1.8rem] px-5 py-6" padding="none" variant="hero-blue">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70">TASTE TEST RESULT</p>
            <h1 className="mt-2 font-heading text-[1.8rem] font-semibold tracking-[-0.04em]">
              당신의 취향은
              <br />
              {preference.roastLevel === "Light"
                ? "산뜻한 라이트 로스트"
                : preference.roastLevel === "Dark"
                  ? "묵직한 다크 로스트"
                  : "균형감 있는 미디엄 로스트"}
            </h1>
            <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/82">
              선택한 답변을 바탕으로 지금의 기분과 잘 맞는 원두 방향을 추천했어요.
            </p>
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/12">
            <Sparkles className="size-9 text-[#f1d08b]" />
          </div>
        </div>
      </AppCard>

      <AppCard>
        <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
          추천 프로파일
        </h2>
        <div className="mt-4 space-y-3">
          {[
            ["로스팅", preference.roastLevel],
            ["산미", preference.acidity],
            ["바디감", preference.body],
            ["선호 노트", preference.notes.join(", ")],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3 text-sm"
            >
              <span className="text-[var(--color-muted)]">{label}</span>
              <span className="font-medium text-[var(--color-primary-green)]">{value}</span>
            </div>
          ))}
        </div>
      </AppCard>

      <AppCard variant="warm">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/75">
            <CheckCircle2 className="size-5 text-[var(--color-primary-green)]" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              잘 맞는 추천 원두
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
              현재 결과와 비슷한 결의 향미를 가진 디차 원두를 골라봤어요.
            </p>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              취향 스펙트럼
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              현재 결과 기준으로 산미, 바디, 향미 밸런스를 요약했어요.
            </p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(29,62,43,0.06)]">
            <Sparkles className="size-5 text-[var(--color-primary-green)]" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {[
            ["산미", preference.acidity, preference.roastLevel === "Light" ? "w-full" : preference.roastLevel === "Medium" ? "w-[68%]" : "w-[35%]", "bg-[linear-gradient(90deg,#a8d4ff_0%,#2a6db3_100%)]"],
            ["바디감", preference.body, preference.roastLevel === "Dark" ? "w-full" : preference.roastLevel === "Medium" ? "w-[72%]" : "w-[45%]", "bg-[linear-gradient(90deg,#e5c99c_0%,#8f5e2a_100%)]"],
            ["향미", preference.notes.join(" · "), "w-[82%]", "bg-[linear-gradient(90deg,#d8c1ff_0%,#5e4aa8_100%)]"],
          ].map(([label, value, widthClassName, barClassName]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[var(--color-primary-green)]">{label}</span>
                <span className="text-[var(--color-muted)]">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-[rgba(29,62,43,0.08)]">
                <div className={`h-2 rounded-full ${widthClassName} ${barClassName}`} />
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              추천 원두
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              현재 취향과 잘 맞는 디차 원두를 골라봤어요.
            </p>
          </div>
          <Link className="text-sm font-medium text-[var(--color-primary-green)]" to={ROUTES.products}>
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map((product) => (
            <ProductTileCard
              key={product.id}
              compact
              product={product}
              showAddButton={false}
            />
          ))}
        </div>
      </section>

      <div className="space-y-3">
        <PrimaryButton asChild className="w-full">
          <Link to={ROUTES.products}>
            추천 원두 보러가기
            <ArrowRight className="size-4" />
          </Link>
        </PrimaryButton>
        <PrimaryButton
          className="w-full bg-white text-[var(--color-primary-green)]"
          onClick={resetTest}
          variant="outline"
        >
          다시 테스트해보기
          <RotateCcw className="size-4" />
        </PrimaryButton>
        <PrimaryButton asChild className="w-full bg-white text-[var(--color-primary-green)]" variant="outline">
          <Link to={ROUTES.home}>홈으로 돌아가기</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
