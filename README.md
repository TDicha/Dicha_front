# Dicha Coffee Frontend

2026-06-07 기준 Dicha Coffee 프론트엔드 워크스페이스입니다. 모바일 퍼스트 고객 웹앱과 관리자 콘솔을 함께 관리하는 pnpm/turbo 모노레포로 구성되어 있으며, Spring Boot 백엔드 REST API와 연동하는 방향으로 제작 중입니다.

## 프로젝트 개요

Dicha Coffee는 O2O 커스텀 로스팅 커피 플랫폼을 목표로 하는 졸업작품 프론트엔드입니다. 고객은 모바일 앱처럼 상품을 둘러보고, 취향 테스트를 통해 원두를 추천받고, 장바구니/바로구매/비회원 주문까지 진행할 수 있습니다. 관리자는 별도 콘솔에서 회원, 상품, 카테고리, 주문 상태를 관리합니다.

현재 프론트는 단순 정적 목업 단계에서 벗어나 API 어댑터, 라우팅, 인증 상태, 장바구니/구매 흐름, 관리자 CRUD 화면까지 나뉘어 있습니다. 일부 기능은 백엔드 API 연동을 전제로 구현되어 있고, 배송지처럼 아직 프론트 로컬 상태에 남아 있는 영역도 있습니다.

## 기술 스택

- Package manager: pnpm workspace
- Build orchestration: Turbo
- App framework: Vite + React 19 + TypeScript
- Routing: React Router
- Server state: TanStack Query
- Client state: Zustand
- API: Axios(client), Fetch(admin)
- Styling: Tailwind CSS v4, CSS variables, shadcn/ui 기반 설정
- UI helpers: lucide-react, Radix UI, Ant Design 일부 사용
- Metadata: favicon, SEO, Open Graph, Twitter card
- Formatting/Lint: ESLint, Prettier, prettier-plugin-tailwindcss

## 모노레포 구조

```txt
apps/
  client/                  # 고객용 모바일 퍼스트 웹앱
    src/app/               # 라우터, 프로바이더, Zustand 스토어
    src/components/        # 공통 UI와 앱 레이아웃
    src/features/          # 도메인별 기능 모듈
    src/pages/             # 라우트 단위 페이지
    src/services/          # API, 인증 관련 서비스
    src/shared/            # 공통 상수, 타입, 유틸, 환경값
  admin/                   # 관리자 콘솔
    src/app/               # 관리자 라우터, 인증 가드, 상태
    src/layout/            # 관리자 셸/사이드바
    src/pages/             # 대시보드, 회원, 상품, 주문, 로그인
    src/services/          # 관리자 API 클라이언트
packages/
  types/                   # 공통 타입 패키지 자리, 현재 EntityId 정도만 있음
  ui/                      # 공통 UI 패키지 자리, 아직 실제 컴포넌트 이동 전
  utils/                   # 공통 유틸 패키지 자리, 아직 실제 유틸 이동 전
docs/                      # 개발 계획, 데이터 모델, 작업 기록 문서
```

## 고객 앱 현재 상태

고객 앱은 `apps/client`에 있으며 `/`, `/products`, `/products/:productId`, `/cart`, `/purchase`, `/search`, `/login`, `/signup`, `/taste-test`, `/orders`, `/addresses`, `/mypage`, `/brewing-story` 등의 라우트를 가지고 있습니다. `AppShell` 안에서 헤더/하단 탭을 포함한 모바일 앱 형태로 동작하고, 상세/로그인/회원가입 같은 일부 화면은 라우트 handle의 `chrome: false`로 앱 크롬을 숨기는 구조입니다.

주요 구현 범위는 다음과 같습니다.

- 홈: 히어로, 빠른 링크, 베스트 상품, 로스터 추천, 리뷰/스토리 섹션
- 상품: 카테고리/검색/정렬/더보기 UI, 상세 페이지, 옵션 바텀시트, 장바구니 추가 다이얼로그
- 검색: 최근 검색어, 추천 키워드, 결과 그리드
- 장바구니: 수량 변경, 선택/전체선택, 삭제, 가격 계산, 구매 진입
- 구매: 장바구니/바로구매 draft 생성, 배송지, 결제수단, 주문 완료 화면
- 주문: 회원 주문 목록, 비회원 주문 조회 패널, 주문 카드/상태 표시
- 인증: 로그인, 회원가입 단계, 세션 복원, 보호 라우트
- 마이페이지: 프로필, 통계, 빠른 링크
- 배송지: 주소 폼/목록/선택 모달, Daum 우편번호 로더
- 취향 테스트: 질문 흐름, API 제출, 추천 상품 결과
- Web metadata: 현재 로고 기반 favicon, SEO description, Open Graph/Twitter metadata

## 관리자 앱 현재 상태

관리자 앱은 `apps/admin`에 있으며 `/admin/login`, `/admin/dashboard`, `/admin/orders`, `/admin/products`, `/admin/members` 중심으로 구성되어 있습니다. 로그인 후 `ProtectedRoute`와 `AdminShell`을 거쳐 접근하는 구조이고, 관리자 세션은 access token 저장소와 refresh 요청을 통해 복원합니다.

현재 구현된 관리 기능은 다음과 같습니다.

- 대시보드: 회원 수, 상품 수, 카테고리 수 집계
- 회원 관리: 회원 목록 조회, 강제 탈퇴 처리
- 상품 관리: 상품 목록, 등록, 수정, 삭제
- 카테고리 관리: 카테고리 목록, 등록, 삭제
- 주문 관리: 주문 목록 조회, 주문 상세 펼침, 주문 상태 변경
- 관리자 인증: 로그인, 로그아웃, 세션 복원, 401 refresh retry

## 데이터/API 연동 방식

고객 앱은 `apps/client/src/services/api`의 Axios 인스턴스를 중심으로 API를 호출합니다. 기본 API 주소는 `VITE_API_BASE_URL`이며, 값이 없으면 `http://localhost:8082`를 사용합니다. 요청은 `withCredentials: true`로 쿠키 기반 인증/refresh 흐름을 고려하고, access token은 별도 token storage를 통해 Authorization 헤더에 실립니다.

도메인별 API 접근은 화면에서 직접 호출하기보다 adapter/repository로 감싸는 방식입니다.

- 상품: `features/products/adapters/apiProductAdapter.ts`
- 장바구니: `features/cart/cartApi.ts`
- 주문: `features/orders/adapters/apiOrderAdapter.ts`
- 취향 테스트: `features/taste-test/tasteTestApi.ts`
- 인증: `services/auth/authService.ts`

관리자 앱은 `apps/admin/src/services/api/client.ts`의 `apiFetch` 래퍼를 사용합니다. 401 응답을 받으면 refresh token 요청을 한 번 수행하고, 성공 시 원 요청을 재시도합니다.

현재 주요 백엔드 엔드포인트는 다음 계열을 전제로 합니다.

- `/api/members/*`
- `/api/products`
- `/api/categories`
- `/api/cart`
- `/api/orders`
- `/api/guest-orders`
- `/api/taste-test`
- `/api/admin/members`
- `/api/admin/orders`

## 상태 관리 방식

- `authStore`: 고객 로그인 상태, 세션 확인/복원, 로그인/로그아웃
- `cartStore`: 장바구니 아이템, 수량/선택/삭제/비우기
- `checkoutStore`: 장바구니 구매와 바로구매 draft, 배송지/결제수단/주문자 타입
- `preferenceStore`: 앱 선호 상태
- `adminAuthStore`: 관리자 세션, 로그인/로그아웃/복원

서버에서 다시 받아야 하는 데이터는 TanStack Query를 사용하는 방향이고, 즉시 UI 반응이 필요한 장바구니/구매 draft 같은 값은 Zustand에 둡니다.

## 실행 방법

```bash
pnpm install
pnpm dev:client
pnpm dev:admin
```

빌드와 린트는 다음 명령을 사용합니다.

```bash
pnpm build
pnpm lint
pnpm build:client
pnpm build:admin
pnpm lint:client
pnpm lint:admin
```

고객 앱만 미리보기 할 때는 `pnpm preview:client`, 관리자 앱은 `pnpm preview:admin`을 사용합니다. 고객 앱 색상 사용량 점검 스크립트는 `pnpm audit:colors`입니다.

## 환경 변수

`apps/client`와 `apps/admin` 모두 Vite 환경 변수를 사용합니다.

```bash
VITE_API_BASE_URL=http://localhost:8082
VITE_APP_NAME=Dicha Coffee
```

`VITE_API_BASE_URL`을 지정하지 않으면 두 앱 모두 기본적으로 `http://localhost:8082`를 바라봅니다.

## 보안/인증 메모

- 백엔드의 refresh token은 HttpOnly + Secure 쿠키 기반을 전제로 합니다.
- access token은 프론트 token storage에 저장하고 Authorization 헤더로 전송합니다.
- API 요청은 credentials 포함 설정으로 쿠키 연동을 고려합니다.
- 401 응답 시 refresh 요청 후 재시도하는 흐름이 준비되어 있습니다.
- Spring Boot 연동 시 CORS allowlist, SameSite, Secure, CSRF 정책을 백엔드와 함께 확정해야 합니다.
- 운영 전 refresh token rotation, reuse detection, rate limiting, CSP, 보안 헤더 적용이 필요합니다.

## 현재 남은 작업

- Spring Boot 실제 API와 전체 화면 플로우를 끝까지 통합 테스트
- 배송지 기능을 localStorage에서 백엔드 API 기반으로 전환
- 결제 연동 또는 결제 mock 정책 확정
- 주문 취소/환불, 주문 상세, 비회원 주문 보안 정책 보강
- 상품 이미지 업로드와 관리자 업로드 API 연결
- `packages/types`, `packages/ui`, `packages/utils`에 실제 공통 코드 이동
- 배포 도메인 확정 후 canonical URL과 OG 이미지 절대 경로 적용
- 접근성, 모바일 실기기 터치 영역, 로딩/에러 상태 점검
- 테스트 코드와 CI 검증 흐름 추가
