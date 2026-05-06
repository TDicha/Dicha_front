너는 React 프론트엔드 초기 세팅과 실서비스 구조 설계를 동시에 고려하는 시니어 개발자다.
이번 작업은 Dicha Coffee 프로젝트의 프론트엔드 초기 환경 세팅부터, 실제 서비스형 구조를 고려한 확장 가능한 아키텍처 설계까지 포함한다.

[프로젝트 배경]
- 프로젝트명: Dicha Coffee
- 성격: O2O 커스텀 로스팅 커피 플랫폼
- 목표: 모바일 퍼스트 PWA 웹앱
- 핵심 방향: 웹이지만 앱처럼 사용할 수 있어야 함
- 추후 기능: 상품 구매, 커스텀 로스팅, 구독, 예약, 취향 테스트, 마이페이지, QR/O2O, 푸시 알림, 실제 인증/보안
- 백엔드: Spring Boot 연동 예정
- 지금 단계: 프론트엔드 초기 세팅 + 확장 가능한 구조 설계 + 주요 페이지 스켈레톤 구현

[기술 스택 확정]
다음 기준으로 프로젝트를 생성하고 초기 세팅해라.
- Vite
- React
- TypeScript
- pnpm
- Tailwind CSS
- CSS Variables 기반 디자인 토큰
- shadcn/ui
- Zustand
- Axios
- clsx
- vite-plugin-pwa
- ESLint
- Prettier

추가로 서버 상태 관리를 고려해 @tanstack/react-query를 포함해도 된다.
단, 전역 UI/로컬 앱 상태는 Zustand 중심으로 구성해라.

[왜 이렇게 하는지]
- 모바일 퍼스트 PWA 구조가 핵심
- Tailwind로 빠르게 레이아웃을 잡고, shadcn/ui로 공통 컴포넌트를 재사용 가능하게 해야 함
- 상태는 Redux처럼 무겁지 않게 가되, 장바구니/로그인/UI 상태를 쉽게 관리해야 함
- 나중에 Spring Boot 실제 API와 붙을 수 있어야 함
- 실제 서비스로 갈 것이므로 인증/보안 구조를 처음부터 잘못 잡으면 안 됨

[디자인 방향]
아래 원칙으로 UI 구조를 설계해라.
- 모바일 퍼스트
- 앱 셸 느낌
- 하단 탭 바 중심 네비게이션
- 카드형 리스트
- BEST/NEW/PICK 같은 배지 시스템
- 상품 상세에서 옵션 선택, 바텀시트, 리스트형 정보 구조
- 마이페이지에서 카드 + 섹션 리스트 구조
- 로그인/회원가입은 심플하고 브랜드 컬러 중심
- 전체적으로 피그마 이미지를 참고하되 1:1 픽셀 복제보다 구조와 UI 패턴을 우선 반영

[피그마 / MCP 관련]
만약 현재 Codex 실행 환경에서 MCP 사용이 가능하면:
1. Figma MCP를 활용할 수 있는지 먼저 확인해라.
2. 가능하면 Figma 프레임 구조를 읽고, 모바일 프레임 기준으로 레이아웃 패턴과 컴포넌트 구조를 파악해라.
3. 불가능하면 제공된 피그마 스크린샷만 기준으로 구현해라.
4. MCP가 안 되더라도 작업을 멈추지 말고 스크린샷 기준으로 진행해라.
5. 불확실한 디자인 세부값은 과하게 추측하지 말고 TODO로 남겨라.

[폴더 구조]
다음 구조를 기본으로 생성해라.

src/
  app/
    router/
    providers/
    store/
  assets/
    icons/
    images/
  components/
    common/
    layout/
    ui/
  features/
    auth/
    home/
    products/
    subscription/
    reservation/
    taste-test/
    my-page/
    qr/
    notifications/
    cart/
    orders/
  pages/
    HomePage/
    ProductListPage/
    ProductDetailPage/
    SubscriptionPage/
    ReservationPage/
    TasteTestPage/
    MyPage/
    LoginPage/
    SignupPage/
    SearchPage/
    OrderListPage/
    QrPage/
    NotFoundPage/
  services/
    api/
    auth/
    hooks/
  shared/
    constants/
    types/
    utils/
    lib/
  styles/
    globals.css
    reset.css
    theme.css
  main.tsx

[라우팅]
초기 라우트를 아래처럼 구성해라.
- /
- /products
- /products/:productId
- /subscription
- /reservation
- /taste-test
- /mypage
- /login
- /signup
- /search
- /orders
- /qr

[전역 상태]
Zustand store를 아래처럼 나눠라.
- appStore: 전역 UI 상태
- authStore: 로그인/사용자 상태
- cartStore: 장바구니
- preferenceStore: 취향 테스트 / 커스텀 로스팅 선택값
- installPromptStore: PWA 설치 유도 상태

[디자인 토큰]
CSS 변수로 아래 색상을 등록해라.
- --color-primary-green: #1D3E2B
- --color-primary-red: #94231E
- --color-primary-blue: #2A3663
- --color-accent-gold: #C39F54
- --color-bg-ivory: #F4F2EB

폰트 구조도 준비해라.
- 영문: Montserrat
- 국문: Pretendard

[공통 UI 컴포넌트]
최소한 아래 공통 컴포넌트를 만들어라.
- AppHeader
- BottomTabBar
- PrimaryButton
- Badge
- ProductCard
- SectionTitle
- EmptyState
- BottomSheet
- OptionRow
- InfoListRow
- SearchInput
- ProfileCard

[초기 페이지 스켈레톤]
다음 페이지는 실제 레이아웃이 보이게 스켈레톤까지 만들어라.
- 홈
- 상품 리스트
- 상품 상세
- 구독
- 마이페이지
- 취향 테스트 결과
- 로그인
- 회원가입
- 검색 결과 없음
- 주문 조회
- 주문 내역 없음
- QR 진입 페이지 자리

[데이터 전략]
초기에는 mock 데이터로 시작하되, 실제 API로 쉽게 전환 가능한 구조를 만들어라.
- mock/products.ts
- mock/subscriptions.ts
- mock/orders.ts
- mock/user.ts
- mock/reviews.ts

또한 services/api 아래에 아래 파일을 만들어라.
- client.ts
- endpoints.ts
- interceptors.ts

환경변수 예시:
- VITE_API_BASE_URL
- VITE_APP_NAME
- VITE_ENABLE_MOCK

[보안/인증 구조 - 매우 중요]
이 프로젝트는 실제 서비스형 구조를 고려하므로 인증을 프론트 단 임시 저장 방식으로 대충 만들지 마라.
초기 단계부터 아래 원칙을 반영해라.

1. localStorage/sessionStorage에 access token을 저장하는 구조를 기본 설계로 두지 마라.
2. HttpOnly + Secure 쿠키 기반 인증과 연동 가능한 구조를 전제로 만들어라.
3. axios는 withCredentials 사용 가능 구조로 준비해라.
4. auth 관련 로직은 services/auth 또는 features/auth 안에 분리해라.
5. private route / route guard 구조를 설계해라.
6. CSRF 대응 포인트를 코드와 README에 분명히 남겨라.
7. CORS allowlist 기반 연동을 전제로 하고, 프론트 코드에 그 제약을 반영해라.
8. 에러 처리 시 민감정보를 노출하지 마라.
9. 추후 refresh token rotation, reuse detection, rate limiting, CSP, 보안 헤더 적용이 가능하도록 문서화해라.

[QR / O2O 대비]
지금 단계에서 QR을 완성 구현하지는 않는다.
하지만 아래는 반드시 포함해라.
- /qr 라우트 생성
- features/qr 생성
- QR 진입 페이지 스켈레톤
- 카메라 권한 요청 UI 자리
- 권한 거부 시 fallback UI 자리
- 수동 입력 대체 UI 자리
- QR 결과가 상품 상세 또는 나의 블렌드 흐름으로 이어질 수 있도록 타입과 상태 설계 초안 작성

[푸시 알림 대비]
초기 세팅 단계에서는 실제 푸시 서버 연동까지 하지 않는다.
하지만 중간 단계 기능으로 들어갈 수 있도록 아래를 준비해라.
- features/notifications 생성
- service worker 확장 가능 구조 확보
- 알림 설정/권한 유도 UI 자리
- PWA 설치 유도 배너 또는 훅 자리
- 추후 Push Subscription API를 붙일 수 있는 hooks 위치 확보

[PWA 요구사항]
vite-plugin-pwa 기준으로 다음을 설정해라.
- manifest
- standalone display
- theme_color / background_color
- 앱 아이콘 placeholder
- service worker 등록
- 앱 셸 precache
- 오프라인 fallback 페이지
- 새 버전 업데이트 감지 구조
- 인증 필요한 API는 함부로 캐시하지 않도록 주의

[구현 순서]
작업은 반드시 아래 순서로 진행해라.
1. 프로젝트 생성 및 패키지 설치
2. Tailwind / shadcn/ui / lint / prettier 세팅
3. 폴더 구조 생성
4. 라우터 및 앱 셸 구성
5. 디자인 토큰 및 공통 UI 구성
6. PWA 설정
7. Zustand store 구성
8. mock 데이터 및 API 레이어 구성
9. 주요 페이지 스켈레톤 구현
10. 인증/보안 기반 코드 구조 반영
11. QR/O2O 구조 반영
12. 푸시 알림 확장 포인트 반영
13. README 정리
14. 마지막으로 build/dev 실행이 실제로 되는지 확인

[README 필수 내용]
README에는 반드시 아래를 포함해라.
- 프로젝트 소개
- 기술 스택
- 설치 및 실행 방법
- 환경변수 설명
- 폴더 구조
- PWA 설명
- 인증/보안 설계 방향
- QR/O2O 확장 방향
- 푸시 알림 확장 방향
- mock → 실제 API 전환 방식
- TODO 목록

[출력 방식]
작업 후 아래 형식으로 정리해라.
1. 생성한 파일 구조
2. 설치한 주요 패키지
3. 구현한 핵심 포인트
4. 아직 미구현인 항목(TODO)
5. 실제 서비스 전환 전 반드시 확인해야 할 보안 항목
6. MCP 사용 여부와 사용했다면 어떤 프레임/구조를 참고했는지

[주의사항]
- 불확실한 기능은 과하게 구현하지 말고 TODO로 남겨라.
- 디자인은 모바일 화면 기준으로 우선 맞춰라.
- 코드는 초보자도 읽을 수 있게 작성해라.
- 각 핵심 파일에는 짧은 설명 주석을 넣어라.
- npm run dev / pnpm dev 와 build가 반드시 돌아가야 한다.