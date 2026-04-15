import { ROUTES } from "@/shared/constants/routes";

export const accountSections = [
  {
    id: "payment",
    label: "결제 수단 관리",
    title: "결제 수단 관리",
    description: "스타벅스 앱처럼 자주 쓰는 결제 수단과 기본 결제 방식을 정리하는 화면입니다.",
    statusLabel: "기본 카드 1개",
    items: ["DICHA Card ending 2048", "신용카드 빠른 결제", "기본 결제수단 설정"],
    ctaLabel: "결제 수단 추가",
  },
  {
    id: "favorites",
    label: "관심 원두 / 즐겨찾기",
    title: "관심 원두 / 즐겨찾기",
    description: "빠르게 다시 주문할 수 있도록 저장한 원두와 좋아요 목록을 관리합니다.",
    statusLabel: "저장 6개",
    items: ["에티오피아 예가체프", "콜롬비아 후일라", "나의 블렌드 즐겨찾기"],
    ctaLabel: "즐겨찾기 더 보기",
  },
  {
    id: "notifications",
    label: "알림 설정",
    title: "알림 설정",
    description: "주문 상태, 구독 배송, 프로모션 알림을 앱 스타일에 맞게 관리합니다.",
    statusLabel: "3개 활성화",
    items: ["주문 진행 알림", "구독 배송 알림", "혜택 및 프로모션 알림"],
    ctaLabel: "알림 세부 설정",
  },
  {
    id: "security",
    label: "보안 및 인증 설정",
    title: "보안 및 인증 설정",
    description: "로그인 기기와 본인 인증 상태를 확인하고 보안 옵션을 관리합니다.",
    statusLabel: "정상",
    items: ["비밀번호 변경", "휴대폰 본인 인증", "최근 로그인 기기 확인"],
    ctaLabel: "보안 점검 시작",
  },
  {
    id: "app-settings",
    label: "앱 설정",
    title: "앱 설정",
    description: "앱 테마, 접근성, 자동 로그인 같은 사용 환경을 조절하는 화면입니다.",
    statusLabel: "개인화",
    items: ["자동 로그인", "접근성 설정", "앱 버전 및 업데이트"],
    ctaLabel: "설정 저장",
  },
] as const;

export const accountSectionRoute = (sectionId: string) => `${ROUTES.myPage}/manage/${sectionId}`;
