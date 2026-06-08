export type TasteLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface TasteQuestionOption {
  label: string;
  value: string;
  description: string;
}

export interface TasteQuestion {
  key: string;
  questionId: string;
  title: string;
  description: string;
  options: TasteQuestionOption[];
}

export type TasteTestAnswerKey = string;
export type TasteTestAnswers = Partial<Record<TasteTestAnswerKey, string>>;

export const tasteLevelQuestion: TasteQuestion = {
  key: "level",
  questionId: "q0_level",
  title: "커피를 어느 정도 알고 계신가요?",
  description: "익숙한 표현 수준에 맞춰 질문을 다르게 구성해드릴게요.",
  options: [
    {
      label: "초보자",
      value: "BEGINNER",
      description: "원두, 산미, 바디감 같은 표현이 아직 익숙하지 않아요.",
    },
    {
      label: "중급자",
      value: "INTERMEDIATE",
      description: "산미, 바디감, 로스팅 정도는 어느 정도 알고 있어요.",
    },
    {
      label: "고급자",
      value: "ADVANCED",
      description: "원산지, 가공 방식, 로스팅 포인트까지 보고 고르는 편이에요.",
    },
  ],
};

export const beginnerTasteQuestions: TasteQuestion[] = [
  {
    key: "beginnerCafeStyle",
    questionId: "beginner_cafe_style",
    title: "어떤 카페 커피 느낌이 가장 익숙하세요?",
    description: "평소 떠올리는 카페 커피의 인상을 골라주세요.",
    options: [
      {
        label: "진하고 묵직한 프랜차이즈 커피 느낌",
        value: "BEGINNER_CAFE_DARK",
        description:
          "쓴맛이 어느 정도 있고, 스타벅스 아메리카노처럼 묵직한 느낌에 가까워요.",
      },
      {
        label: "무난하고 편하게 마시는 동네 카페 느낌",
        value: "BEGINNER_CAFE_BALANCED",
        description:
          "이디야나 일반 동네 카페 아메리카노처럼 튀는 맛 없이 편한 느낌이에요.",
      },
      {
        label: "달달하고 부드러운 저가형 프랜차이즈 커피 느낌",
        value: "BEGINNER_CAFE_SWEET",
        description:
          "메가커피, 컴포즈커피의 라떼나 달달한 메뉴처럼 부드러운 느낌이에요.",
      },
      {
        label: "산뜻하고 향이 좋은 스페셜티 카페 느낌",
        value: "BEGINNER_CAFE_SPECIALTY",
        description:
          "블루보틀이나 스페셜티 카페의 핸드드립처럼 산뜻하고 향이 좋은 느낌이에요.",
      },
      {
        label: "아직 잘 모르겠어요",
        value: "BEGINNER_CAFE_UNKNOWN",
        description: "브랜드나 커피 맛 차이를 아직 잘 모르겠어요.",
      },
    ],
  },
  {
    key: "beginnerDrink",
    questionId: "beginner_drink",
    title: "평소 어떤 커피를 자주 드시나요?",
    description: "가장 자주 고르는 메뉴를 기준으로 선택해주세요.",
    options: [
      {
        label: "아메리카노",
        value: "BEGINNER_DRINK_AMERICANO",
        description: "깔끔하게 마시는 커피를 선호하는 편이에요.",
      },
      {
        label: "카페라떼",
        value: "BEGINNER_DRINK_LATTE",
        description: "우유가 들어간 부드러운 커피를 선호하는 편이에요.",
      },
      {
        label: "바닐라라떼 / 달달한 커피",
        value: "BEGINNER_DRINK_SWEET_LATTE",
        description: "쓴맛보다는 달달하고 부드러운 커피를 선호하는 편이에요.",
      },
      {
        label: "핸드드립 / 원두커피",
        value: "BEGINNER_DRINK_HAND_DRIP",
        description: "커피의 향이나 깔끔한 맛을 느끼는 것을 선호하는 편이에요.",
      },
    ],
  },
  {
    key: "beginnerAcidity",
    questionId: "beginner_acidity",
    title: "커피에서 신맛이 느껴지는 건 괜찮으세요?",
    description: "산미에 대한 편안함을 골라주세요.",
    options: [
      {
        label: "신맛은 별로예요",
        value: "BEGINNER_ACIDITY_LOW",
        description: "산미가 강한 커피보다 고소하고 부드러운 커피가 좋아요.",
      },
      {
        label: "약간은 괜찮아요",
        value: "BEGINNER_ACIDITY_MEDIUM",
        description: "너무 강하지 않은 정도의 산미는 괜찮아요.",
      },
      {
        label: "상큼한 신맛도 좋아요",
        value: "BEGINNER_ACIDITY_HIGH",
        description: "과일처럼 산뜻한 느낌의 커피도 좋아요.",
      },
    ],
  },
  {
    key: "beginnerFlavor",
    questionId: "beginner_flavor",
    title: "가장 끌리는 맛이나 향은 무엇인가요?",
    description: "커피에서 기대하는 첫 인상을 골라주세요.",
    options: [
      {
        label: "고소한 견과류 느낌",
        value: "BEGINNER_FLAVOR_NUTTY",
        description: "아몬드, 땅콩, 곡물처럼 고소한 느낌이에요.",
      },
      {
        label: "초콜릿 같은 묵직한 느낌",
        value: "BEGINNER_FLAVOR_CHOCOLATE",
        description: "초콜릿, 카카오처럼 진하고 묵직한 느낌이에요.",
      },
      {
        label: "과일처럼 산뜻한 느낌",
        value: "BEGINNER_FLAVOR_FRUITY",
        description: "베리, 오렌지, 감귤처럼 산뜻하고 밝은 느낌이에요.",
      },
      {
        label: "부드럽고 무난한 느낌",
        value: "BEGINNER_FLAVOR_BALANCED",
        description: "튀는 맛 없이 편하게 마실 수 있는 느낌이에요.",
      },
    ],
  },
];

export const intermediateTasteQuestions: TasteQuestion[] = [
  {
    key: "intermediateAcidity",
    questionId: "intermediate_acidity",
    title: "산미는 어느 정도가 좋으세요?",
    description: "커피의 밝고 상큼한 정도를 골라주세요.",
    options: [
      {
        label: "낮은 산미",
        value: "INT_ACIDITY_LOW",
        description: "상큼하고 화사한 산미보다는 고소하고 편한 커피를 선호해요.",
      },
      {
        label: "적당한 산미",
        value: "INT_ACIDITY_MEDIUM",
        description: "은은하게 느껴지는 산미는 괜찮은 편이에요.",
      },
      {
        label: "높은 산미",
        value: "INT_ACIDITY_HIGH",
        description: "상큼하고 화사한 산미를 즐기는 편이에요.",
      },
    ],
  },
  {
    key: "intermediateBody",
    questionId: "intermediate_body",
    title: "바디감은 어떤 쪽이 좋으세요?",
    description: "입안에서 느껴지는 무게감과 질감을 골라주세요.",
    options: [
      {
        label: "가벼운 바디감",
        value: "INT_BODY_LIGHT",
        description: "깔끔하고 산뜻하게 넘어가는 커피를 선호해요.",
      },
      {
        label: "부드러운 바디감",
        value: "INT_BODY_MEDIUM",
        description: "너무 가볍지도 무겁지도 않은 균형 잡힌 질감을 선호해요.",
      },
      {
        label: "묵직한 바디감",
        value: "INT_BODY_HEAVY",
        description: "입안에 남는 무게감이 있는 진한 커피를 선호해요.",
      },
    ],
  },
  {
    key: "intermediateSweetness",
    questionId: "intermediate_sweetness",
    title: "단맛은 얼마나 원하세요?",
    description: "커피에서 느껴지는 단맛의 강도를 골라주세요.",
    options: [
      {
        label: "단맛 없는 깔끔함",
        value: "INT_SWEETNESS_LOW",
        description: "단맛보다는 깔끔하고 담백한 커피를 선호해요.",
      },
      {
        label: "은은한 단맛",
        value: "INT_SWEETNESS_MEDIUM",
        description: "마신 뒤 은근히 단맛이 남는 커피를 선호해요.",
      },
      {
        label: "강한 단맛",
        value: "INT_SWEETNESS_HIGH",
        description: "과일, 꿀, 초콜릿처럼 단맛이 분명한 커피를 선호해요.",
      },
    ],
  },
  {
    key: "intermediateFlavor",
    questionId: "intermediate_flavor",
    title: "가장 끌리는 향미는 무엇인가요?",
    description: "첫 모금에서 기대하는 향의 인상을 골라주세요.",
    options: [
      {
        label: "과일",
        value: "INT_FLAVOR_FRUITY",
        description: "베리, 오렌지, 감귤 같은 산뜻한 향미를 선호해요.",
      },
      {
        label: "꽃",
        value: "INT_FLAVOR_FLORAL",
        description: "자스민, 꽃향처럼 화사한 향미를 선호해요.",
      },
      {
        label: "견과류",
        value: "INT_FLAVOR_NUTTY",
        description: "아몬드, 땅콩, 곡물처럼 고소한 향미를 선호해요.",
      },
      {
        label: "초콜릿",
        value: "INT_FLAVOR_CHOCOLATE",
        description: "초콜릿, 카카오처럼 묵직하고 달콤쌉싸름한 향미를 선호해요.",
      },
    ],
  },
];

export const advancedTasteQuestions: TasteQuestion[] = [
  {
    key: "advancedRoast",
    questionId: "advanced_roast",
    title: "선호하는 로스팅 정도는 무엇인가요?",
    description: "로스팅 포인트로 기대하는 맛의 방향을 골라주세요.",
    options: [
      {
        label: "라이트 로스팅",
        value: "ADV_ROAST_LIGHT",
        description: "산미와 향미가 선명한 커피를 선호해요.",
      },
      {
        label: "미디엄 로스팅",
        value: "ADV_ROAST_MEDIUM",
        description: "산미, 단맛, 바디감이 균형 잡힌 커피를 선호해요.",
      },
      {
        label: "다크 로스팅",
        value: "ADV_ROAST_DARK",
        description: "쓴맛, 바디감, 고소함이 강한 커피를 선호해요.",
      },
    ],
  },
  {
    key: "advancedProcess",
    questionId: "advanced_process",
    title: "선호하는 가공 방식은 무엇인가요?",
    description: "가공 방식에서 기대하는 향미 방향을 골라주세요.",
    options: [
      {
        label: "워시드",
        value: "ADV_PROCESS_WASHED",
        description: "깔끔하고 선명한 산미, 클린한 맛을 선호해요.",
      },
      {
        label: "내추럴",
        value: "ADV_PROCESS_NATURAL",
        description: "과일향, 단맛, 발효감이 있는 커피를 선호해요.",
      },
      {
        label: "허니 / 펄프드 내추럴",
        value: "ADV_PROCESS_HONEY",
        description: "단맛과 밸런스가 좋은 커피를 선호해요.",
      },
      {
        label: "상관없음",
        value: "ADV_PROCESS_ANY",
        description: "가공 방식보다는 맛과 향미 기준으로 추천받고 싶어요.",
      },
    ],
  },
  {
    key: "advancedOrigin",
    questionId: "advanced_origin",
    title: "선호하는 원산지 계열은 무엇인가요?",
    description: "원산지에서 기대하는 대표 향미를 골라주세요.",
    options: [
      {
        label: "아프리카 계열",
        value: "ADV_ORIGIN_AFRICA",
        description: "에티오피아, 케냐처럼 과일향과 꽃향이 있는 커피를 선호해요.",
      },
      {
        label: "중남미 계열",
        value: "ADV_ORIGIN_LATIN",
        description: "브라질, 콜롬비아, 과테말라처럼 고소하고 밸런스 좋은 커피를 선호해요.",
      },
      {
        label: "아시아 계열",
        value: "ADV_ORIGIN_ASIA",
        description: "인도네시아, 베트남처럼 묵직하고 개성 있는 향미의 커피를 선호해요.",
      },
      {
        label: "상관없음",
        value: "ADV_ORIGIN_ANY",
        description: "원산지보다는 맛과 향미 기준으로 추천받고 싶어요.",
      },
    ],
  },
  {
    key: "advancedBrew",
    questionId: "advanced_brew",
    title: "주로 어떤 방식으로 추출하시나요?",
    description: "자주 사용하는 추출 방식에 맞춰 추천 방향을 조정해요.",
    options: [
      {
        label: "핸드드립",
        value: "ADV_BREW_HAND_DRIP",
        description: "향미와 깔끔함을 중요하게 생각해요.",
      },
      {
        label: "에스프레소 머신",
        value: "ADV_BREW_ESPRESSO",
        description: "크레마, 바디감, 농도를 중요하게 생각해요.",
      },
      {
        label: "모카포트 / 프렌치프레스",
        value: "ADV_BREW_HEAVY",
        description: "진하고 묵직한 질감의 커피를 선호해요.",
      },
      {
        label: "자동 커피머신 / 캡슐 대체용",
        value: "ADV_BREW_AUTO",
        description: "간편하게 내려도 맛이 안정적인 커피를 선호해요.",
      },
    ],
  },
];

export const tasteQuestionsByLevel: Record<TasteLevel, TasteQuestion[]> = {
  BEGINNER: beginnerTasteQuestions,
  INTERMEDIATE: intermediateTasteQuestions,
  ADVANCED: advancedTasteQuestions,
};

export function isTasteLevel(value?: string): value is TasteLevel {
  return value === "BEGINNER" || value === "INTERMEDIATE" || value === "ADVANCED";
}

export function getTasteQuestions(answers: TasteTestAnswers): TasteQuestion[] {
  const level = answers.level;
  if (!isTasteLevel(level)) {
    return [tasteLevelQuestion];
  }

  return [tasteLevelQuestion, ...tasteQuestionsByLevel[level]];
}

export const maxTasteQuestionCount = 1 + beginnerTasteQuestions.length;

export const tasteQuestions = getTasteQuestions({ level: "INTERMEDIATE" });

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
