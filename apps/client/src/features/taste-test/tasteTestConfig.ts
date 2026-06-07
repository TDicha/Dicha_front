// 질문/옵션 값(value)은 백엔드 TasteTestService 가 그대로 해석하는 값과 1:1로 일치한다.
// - q1_acidity / q2_body / q3_sweetness: 한글 문자열을 점수로 환산
// - q4_flavor: FlavorNote enum 이름(대문자)로 변환
export const tasteQuestions = [
  {
    key: "acidity",
    questionId: "q1_acidity",
    title: "산미는 어느 정도가 좋으세요?",
    description: "커피의 밝고 상큼한 정도를 골라주세요.",
    options: [
      {
        label: "높은 산미",
        value: "높은 산미",
        description: "상큼하고 화사한 산미를 즐기는 편",
      },
      {
        label: "적당한 산미",
        value: "적당한 산미",
        description: "은은하게 느껴지는 산미가 좋은 편",
      },
      {
        label: "낮은 산미",
        value: "낮은 산미",
        description: "산미는 거의 없는 편이 좋은 편",
      },
    ],
  },
  {
    key: "body",
    questionId: "q2_body",
    title: "바디감은 어떤 쪽이 좋으세요?",
    description: "입안에서 느껴지는 무게감과 질감을 골라주세요.",
    options: [
      {
        label: "묵직한 바디감",
        value: "묵직한 바디감",
        description: "진하고 묵직한 한 잔을 선호",
      },
      {
        label: "부드러운 바디감",
        value: "부드러운 바디감",
        description: "부드럽고 균형 잡힌 질감을 선호",
      },
      {
        label: "가벼운 바디감",
        value: "가벼운 바디감",
        description: "깔끔하고 가벼운 질감을 선호",
      },
    ],
  },
  {
    key: "sweetness",
    questionId: "q3_sweetness",
    title: "단맛은 얼마나 원하세요?",
    description: "커피에서 느껴지는 단맛의 강도를 골라주세요.",
    options: [
      {
        label: "강한 단맛",
        value: "강한 단맛",
        description: "달콤함이 또렷하게 느껴지는 편이 좋아요",
      },
      {
        label: "은은한 단맛",
        value: "은은한 단맛",
        description: "은은하게 단맛이 받쳐주면 좋아요",
      },
      {
        label: "단맛 없는",
        value: "단맛 없는",
        description: "단맛 없이 깔끔한 편이 좋아요",
      },
    ],
  },
  {
    key: "flavor",
    questionId: "q4_flavor",
    title: "가장 끌리는 향미는 무엇인가요?",
    description: "첫 모금에서 기대하는 향의 인상을 골라주세요.",
    options: [
      { label: "과일", value: "FRUITY", description: "잘 익은 과일의 달콤한 향" },
      { label: "꽃", value: "FLORAL", description: "화사하게 퍼지는 꽃 향" },
      { label: "견과류", value: "NUTTY", description: "고소한 견과류 계열의 향" },
      { label: "초콜릿", value: "CHOCOLATY", description: "달콤 쌉싸름한 초콜릿 향" },
      { label: "향신료", value: "SPICY", description: "은은하게 퍼지는 스파이시한 향" },
      { label: "카라멜", value: "CARAMEL", description: "달콤하게 졸인 카라멜 향" },
      { label: "시트러스", value: "CITRUS", description: "상큼한 감귤 계열의 향" },
      { label: "베리", value: "BERRY", description: "새콤달콤한 베리류의 향" },
      { label: "로스티", value: "ROASTY", description: "깊게 볶은 로스티한 향" },
    ],
  },
] as const;

export type TasteTestAnswerKey = (typeof tasteQuestions)[number]["key"];

/** 향미 노트(enum) → 한글 라벨 */
export const flavorNoteLabels: Record<string, string> = {
  FRUITY: "과일",
  FLORAL: "꽃",
  NUTTY: "견과류",
  CHOCOLATY: "초콜릿",
  SPICY: "향신료",
  CARAMEL: "카라멜",
  CITRUS: "시트러스",
  BERRY: "베리",
  ROASTY: "로스티",
};
