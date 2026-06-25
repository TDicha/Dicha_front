# Dicha Frontend Codex Guide

2026-06-25 기준 `Dicha_front` 저장소는 백엔드 API 서버가 아니라 Dicha Coffee의 프론트엔드 워크스페이스입니다. 고객용 모바일 퍼스트 웹앱과 관리자 콘솔을 같은 pnpm/turbo 모노레포에서 관리하며, Spring Boot REST API와 연동하는 구조입니다.

## 기존 CODEX.md와 달라진 점

- 문서의 기준 대상이 Spring Boot 백엔드 서버에서 프론트엔드 모노레포로 바뀌었습니다.
- 실제 기술 스택은 React 19, Vite 8, TypeScript 6, React Router 7, TanStack Query 5, Zustand 5, Tailwind CSS v4입니다.
- 저장소에는 `apps/client`, `apps/admin`, `packages/*`가 있으며 백엔드 Java/Spring 소스는 없습니다.
- 인증은 백엔드의 Access Token + Refresh Cookie 정책을 전제로 하되, 프론트에서는 access token 저장소와 401 refresh retry 흐름을 구현합니다.
- 고객 앱은 상품, 검색, 장바구니, 구매, 주문, 배송지, 취향 테스트, 마이페이지 화면을 갖춘 SPA입니다.
- 관리자 앱은 대시보드, 회원, 상품/카테고리, 주문 상태 관리용 별도 SPA입니다.
- 기존 문서에 길게 있던 백엔드 DB/API 상세 스펙은 이 저장소의 소스와 직접 일치하지 않으므로 제거하고, 프론트가 실제 호출하는 엔드포인트 중심으로 정리했습니다.

## 워크스페이스 개요

```txt
apps/
  client/                  # 고객용 모바일 퍼스트 웹앱
    src/app/               # 라우터, 프로바이더, Zustand 스토어
    src/components/        # 공통 UI, 앱 레이아웃
    src/features/          # 도메인별 API, 훅, 컴포넌트
    src/pages/             # 라우트 단위 페이지
    src/services/          # API 클라이언트, 인증 서비스
    src/shared/            # 공통 타입, 상수, 유틸, 환경값
  admin/                   # 관리자 콘솔
    src/app/               # 관리자 라우터, 인증 가드, 상태
    src/layout/            # AdminShell, Sidebar
    src/pages/             # Dashboard, Orders, Products, Members, Login
    src/services/          # fetch 기반 관리자 API 래퍼
packages/
  types/                   # 현재 EntityId 타입만 제공
  ui/                      # 공통 UI 패키지 자리, 아직 실 컴포넌트 없음
  utils/                   # 공통 유틸 패키지 자리, 아직 실 유틸 없음
docs/                      # 기획, 데이터 모델, 작업 기록 문서
```

루트 스크립트는 각 앱의 스크립트를 pnpm filter로 위임합니다.

```bash
pnpm install
pnpm dev:client
pnpm dev:admin
pnpm build
pnpm lint
```

개별 확인 명령:

```bash
pnpm build:client
pnpm build:admin
pnpm lint:client
pnpm lint:admin
pnpm audit:colors
```

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| Package manager | pnpm workspace |
| Build orchestration | Turbo |
| App runtime | Vite + React + TypeScript |
| Routing | React Router |
| Server state | TanStack Query |
| Client state | Zustand |
| Client API | Axios |
| Admin API | Fetch wrapper |
| Styling | Tailwind CSS v4, CSS variables, shadcn 설정 |
| UI helpers | lucide-react, Radix UI, Ant Design 일부 |
| Quality | ESLint, Prettier, prettier-plugin-tailwindcss |

`apps/client`는 Tailwind Vite 플러그인을 사용하고, `apps/admin`은 독립 CSS 기반 관리자 UI입니다. 두 앱 모두 `@` alias가 각 앱의 `src`를 가리킵니다.

## 고객 앱 흐름

고객 앱 진입점:

- `apps/client/src/main.tsx`
- `apps/client/src/App.tsx`
- `apps/client/src/app/providers/AppProviders.tsx`
- `apps/client/src/app/router/router.tsx`

실행 흐름은 다음과 같습니다.

1. `main.tsx`가 React root를 만들고 `<App />`을 렌더합니다.
2. `App`은 `<AppProviders />`만 반환합니다.
3. `AppProviders`는 앱 시작 시 `useAuthStore().hydrateSession()`을 실행하고, `QueryProvider`와 `RouterProvider`를 감쌉니다.
4. `QueryProvider`는 기본 `staleTime: 30s`, `retry: 1`인 TanStack Query client를 제공합니다.
5. 라우터는 `AppShell` 아래에 페이지를 배치합니다.

주요 라우트:

| Path | Page | 메모 |
| --- | --- | --- |
| `/` | HomePage | 홈, 추천/스토리 섹션 |
| `/products` | ProductListPage | 상품 목록, 카테고리/검색/정렬 |
| `/products/:productId` | ProductDetailPage | `chrome: false` |
| `/brewing-story` | BrewingStoryPage | 브랜드/브루잉 콘텐츠 |
| `/taste-test` | TasteTestPage | 취향 질문, 결과, 추천 상품 |
| `/cart` | CartPage | 하단 탭 숨김, 고정 CTA |
| `/purchase` | PurchasePage | 하단 탭 숨김, 구매 draft 기반 |
| `/search` | SearchPage | 최근/추천 키워드와 결과 |
| `/login` | LoginPage | `chrome: false` |
| `/signup` | SignupPage | `chrome: false` |
| `/mypage` | MyPage | 보호 라우트 |
| `/orders` | OrderListPage | 보호 라우트 |
| `/addresses` | AddressBookPage | 보호 라우트 |

`AppShell`은 항상 `AppHeader`, `<Outlet />`, `BottomTabBar`를 렌더합니다. 실제 노출 여부는 각 컴포넌트가 라우트 handle의 `chrome: false`나 현재 path를 보고 결정합니다.

## 고객 앱 주요 기능

- 홈: 히어로, 빠른 링크, 베스트 상품, 로스터 추천, 리뷰, 스토리 카드
- 상품: 카테고리 조회, 상품 목록/검색, 상세, 옵션 바텀시트, 장바구니 추가 다이얼로그
- 검색: 최근 검색어, 추천 키워드, 검색 결과 그리드
- 장바구니: 서버 장바구니 조회, 수량 변경, 선택/전체 선택, 삭제, 비우기, 가격 계산
- 구매: 장바구니 구매와 바로구매 draft, 회원/비회원 주문자 정보, 배송지, 결제수단, 주문 완료
- 주문: 회원 주문 목록, 비회원 주문 조회, 주문 취소/비회원 주문 취소 어댑터
- 배송지: 로그인 사용자는 `/api/addresses`, 비로그인 사용자는 `localStorage` 폴백
- 인증: 로그인, 회원가입, refresh 기반 세션 복원, 보호 라우트
- 마이페이지: 사용자 프로필, 취향/구매 통계, 빠른 링크
- 취향 테스트: 동적 질문 흐름, `/api/taste-test` 제출, 추천 상품 결과

## 고객 앱 상태 관리

| Store | 파일 | 역할 |
| --- | --- | --- |
| `authStore` | `apps/client/src/app/store/authStore.ts` | 로그인 상태, 세션 복원, 로그인/회원가입/로그아웃 |
| `cartStore` | `apps/client/src/app/store/cartStore.ts` | 장바구니 UI 상태와 선택 상태 |
| `checkoutStore` | `apps/client/src/app/store/checkoutStore.ts` | 구매 draft, 주문자 타입, 배송지, 결제수단 |
| `preferenceStore` | `apps/client/src/app/store/preferenceStore.ts` | 취향 테스트 진행 상태와 결과 |
| `appStore` | `apps/client/src/app/store/appStore.ts` | 검색어, 바텀시트 열림 상태 |

서버에서 다시 가져와야 하는 상품/장바구니/주문/배송지 데이터는 TanStack Query 훅을 사용합니다. 즉시 UI 반응이 중요한 선택 상태와 구매 draft는 Zustand에 둡니다.

## 고객 앱 API 흐름

기본 설정:

- API base URL: `VITE_API_BASE_URL`, 기본값 `http://localhost:8082`
- API client: `apps/client/src/services/api/client.ts`
- 엔드포인트 상수: `apps/client/src/services/api/endpoints.ts`
- 인증 서비스: `apps/client/src/services/auth/authService.ts`
- access token storage: `apps/client/src/services/auth/tokenStorage.ts`

Axios 인스턴스는 `withCredentials: true`, `timeout: 10000`, `X-Requested-With: XMLHttpRequest`를 기본값으로 사용합니다. 요청 인터셉터는 저장된 access token을 `Authorization: Bearer ...`로 붙이고, 응답 인터셉터는 401을 받으면 `/api/members/refresh`를 한 번 공유 promise로 호출한 뒤 원 요청을 재시도합니다. refresh 실패 시 access token을 지웁니다.

도메인별 API 계층:

| 도메인 | 파일 | 호출 계열 |
| --- | --- | --- |
| 인증 | `services/auth/authService.ts` | `/api/members/*` |
| 상품 | `features/products/adapters/apiProductAdapter.ts` | `/api/products`, `/api/products/search`, `/api/categories` |
| 상품 옵션/리뷰 | `features/products/hooks/*` | `/api/products/{id}/options`, `/reviews` |
| 장바구니 | `features/cart/cartApi.ts` | `/api/cart`, `/api/cart/items` |
| 주문 | `features/orders/adapters/apiOrderAdapter.ts` | `/api/orders`, `/api/guest-orders` |
| 배송지 | `features/address/addressApi.ts` | `/api/addresses` |
| 취향 테스트 | `features/taste-test/tasteTestApi.ts` | `/api/taste-test` |

상품 어댑터는 백엔드 필드 변형을 프론트 모델로 정규화합니다. 예를 들어 `imageUrl`, `thumbnailUrl`, `image`를 모두 처리하고, `LIGHT/MEDIUM/DARK`를 `Light/Medium/Dark`와 한글 roast label로 변환합니다. 검색어, roastLevel, 가격 조건이 있으면 `/api/products/search`를 사용하고, 일반 목록은 `/api/products`를 사용합니다.

주문 어댑터는 회원 주문 생성은 `/api/orders`, 비회원 주문 생성은 `/api/guest-orders`로 보냅니다. 프론트 전용 옵션 키는 백엔드 `productOptionId`로 보내지 않도록 숫자 옵션 id만 전송합니다.

## 관리자 앱 흐름

관리자 앱 진입점:

- `apps/admin/src/main.tsx`
- `apps/admin/src/app/App.tsx`
- `apps/admin/src/app/router.tsx`

실행 흐름:

1. `App`이 mount되면 `useAdminAuthStore().hydrate()`로 세션을 복원합니다.
2. 라우터는 `/`를 `/admin/dashboard`로 리다이렉트합니다.
3. `/admin/login`은 이미 로그인된 세션이면 대시보드로 보냅니다.
4. 관리자 페이지들은 `ProtectedRoute` 아래에서만 접근됩니다.
5. 보호된 페이지는 `AdminShell` 안에서 렌더됩니다.

주요 라우트:

| Path | Page |
| --- | --- |
| `/admin/login` | LoginPage |
| `/admin/dashboard` | DashboardPage |
| `/admin/orders` | OrdersPage |
| `/admin/products` | ProductsPage |
| `/admin/members` | MembersPage |

관리자 기능:

- 대시보드: 요약 지표, 매출 차트, 최근 주문/리뷰/알림 계열 API
- 회원 관리: 회원 목록 조회, 회원 삭제
- 상품 관리: 상품 목록, 등록, 수정, 삭제, 이미지 업로드, 옵션 CRUD
- 카테고리 관리: 목록, 등록, 삭제
- 주문 관리: 주문 목록, 주문 상태 변경
- 관리자 인증: 로그인, 로그아웃, 세션 복원, 401 refresh retry

## 관리자 API 흐름

관리자 앱은 Axios가 아니라 `apps/admin/src/services/api/client.ts`의 `apiFetch`를 사용합니다.

- API base URL: `VITE_API_BASE_URL`, 기본값 `http://localhost:8082`
- 기본 요청은 `credentials: include`
- JSON body는 자동으로 `Content-Type: application/json`을 설정
- access token이 있으면 `Authorization` 헤더 추가
- 401 응답이면 `/api/members/refresh` 호출 후 원 요청 1회 재시도
- access token 저장은 remember 옵션에 따라 localStorage/sessionStorage를 사용

관리자 엔드포인트 상수는 `apps/admin/src/services/api/endpoints.ts`에 있습니다. 주요 계열은 `/api/admin/members`, `/api/admin/orders`, `/api/admin/dashboard/*`, `/api/products`, `/api/categories`입니다.

## 환경 변수

두 앱 모두 Vite 환경 변수를 사용합니다.

```bash
VITE_API_BASE_URL=http://localhost:8082
VITE_APP_NAME=Dicha Coffee
```

`VITE_APP_NAME`은 현재 고객 앱 `env`에서만 읽습니다. `VITE_API_BASE_URL`이 없으면 고객/관리자 모두 `http://localhost:8082`를 사용합니다.

## 개발 시 주의사항

- 이 저장소에는 백엔드 서버 코드가 없으므로 API 계약 변경은 백엔드 저장소와 함께 확인해야 합니다.
- 고객 앱의 `shared/types/models.ts`에는 구형 `Order` 타입이 남아 있지만, 실제 주문 기능은 `features/orders/types.ts`를 중심으로 동작합니다.
- 배송지는 로그인 상태에서는 API를 사용하고, 비로그인 상태에서는 `dicha.addresses` localStorage를 사용합니다.
- 고객 앱 cart store의 item count는 로컬 store 기준입니다. 서버 cart query와 동기화되는 화면 흐름을 수정할 때는 store/query 양쪽 영향을 확인해야 합니다.
- 상품 상세는 numeric id가 아니면 전체 목록을 조회한 뒤 slug/route key 매칭으로 fallback합니다.
- 이미지 URL은 `resolveApiMediaUrl`을 거쳐 상대 경로를 API base URL과 조합합니다.
- 관리자 로그인은 `/api/members/me` 조회 후 `/api/admin/members` 접근이 되는지 확인해 관리자 권한을 검증합니다.
- 운영 배포 전 CORS allowlist, HttpOnly refresh cookie의 `Secure`/`SameSite`, CSRF 정책, refresh token rotation 정책을 백엔드와 맞춰야 합니다.

## 현재 남은 작업 후보

- 실제 Spring Boot API와 고객 앱 전체 구매/비회원 주문/주문 취소 플로우 통합 테스트
- 관리자 대시보드 API 응답 형태와 화면 표시값 최종 검증
- 상품 리뷰 작성/조회 정책과 프론트 UI 연결 범위 확정
- 결제 연동 또는 mock 결제 정책 확정
- access token 저장 위치와 XSS 대응 정책 재검토
- `packages/types`, `packages/ui`, `packages/utils`에 실제 공통 코드 이동 여부 결정
- 테스트 코드와 CI 검증 흐름 추가
- 모바일 실기기에서 헤더/하단 탭/safe-area/고정 CTA 레이아웃 점검
- 배포 도메인 확정 후 SEO, canonical, Open Graph 이미지 절대 경로 정리
