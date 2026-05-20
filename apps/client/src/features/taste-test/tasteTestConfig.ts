import type { RoastPreference } from "@/shared/types/models";

export const tasteQuestions = [
  {
    key: "brew",
    title: "어떤 방식으로 커피를 가장 자주 마시나요?",
    description: "일상적인 추출 방식이 취향의 방향을 가장 잘 보여줘요.",
    options: [
      {
        label: "핸드드립 / 푸어오버",
        value: "pour-over",
        description: "향의 결이 섬세하게 느껴지는 타입",
      },
      {
        label: "에스프레소 / 라떼",
        value: "espresso",
        description: "진하고 깊은 풍미를 선호하는 타입",
      },
      {
        label: "상황에 따라 다양하게",
        value: "varied",
        description: "상황별로 균형감 있는 선택을 원하는 타입",
      },
    ],
  },
  {
    key: "flavor",
    title: "가장 끌리는 향미는 어떤 쪽인가요?",
    description: "첫 모금에서 기대하는 향의 인상을 골라주세요.",
    options: [
      {
        label: "꽃향, 베리, 시트러스",
        value: "floral",
        description: "화사하고 밝은 향을 좋아하는 타입",
      },
      {
        label: "초콜릿, 견과류, 캐러멜",
        value: "chocolate",
        description: "달콤하고 고소한 계열을 좋아하는 타입",
      },
      {
        label: "둘 다 좋고 밸런스가 중요",
        value: "balanced",
        description: "극단보다 밸런스를 중요하게 보는 타입",
      },
    ],
  },
  {
    key: "mood",
    title: "오늘 원하는 커피의 무드는 무엇인가요?",
    description: "마시는 순간의 분위기를 정하면 추천이 더 정확해져요.",
    options: [
      {
        label: "가볍고 산뜻하게",
        value: "bright",
        description: "가볍고 상쾌한 하루를 원하는 타입",
      },
      {
        label: "묵직하고 깊게",
        value: "deep",
        description: "묵직하고 몰입감 있는 한 잔을 원하는 타입",
      },
      {
        label: "편안하고 데일리하게",
        value: "daily",
        description: "부담 없이 매일 마실 커피를 원하는 타입",
      },
    ],
  },
] as const;

export type TasteTestAnswerKey = (typeof tasteQuestions)[number]["key"];

export const tasteProfiles: Record<string, RoastPreference> = {
  bright: {
    roastLevel: "Light",
    acidity: "높음",
    body: "가볍고 선명함",
    notes: ["Floral", "Berry", "Citrus"],
  },
  balanced: {
    roastLevel: "Medium",
    acidity: "중간",
    body: "부드럽고 균형감 있음",
    notes: ["Chocolate", "Citrus", "Caramel"],
  },
  deep: {
    roastLevel: "Dark",
    acidity: "낮음",
    body: "묵직하고 진함",
    notes: ["Cacao", "Nutty", "Molasses"],
  },
};
