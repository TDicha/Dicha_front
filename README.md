# Dicha Coffee Workspace

모바일 퍼스트 PWA 기반의 O2O 커스텀 로스팅 커피 플랫폼 프론트엔드 워크스페이스입니다. 현재는 고객용 앱을 `apps/client`로 이동했고, 이후 관리자 앱을 `apps/admin`에 추가할 수 있도록 모노레포 뼈대를 준비했습니다.

## Structure

```txt
apps/
  client/       # 기존 Dicha 고객용 PWA 앱
  admin/        # Dicha 관리자 콘솔 앱
packages/
  types/        # client/admin 공통 타입 자리
  ui/           # client/admin 공통 UI 컴포넌트 자리
  utils/        # client/admin 공통 유틸 자리
```

## Stack

- Vite
- React + TypeScript
- pnpm workspace
- Tailwind CSS v4
- shadcn/ui
- Zustand
- Axios
- React Router
- TanStack Query
- vite-plugin-pwa

## Scripts

```bash
pnpm dev:client
pnpm dev:admin
pnpm build:client
pnpm build:admin
pnpm lint:client
pnpm lint:admin
pnpm preview:client
pnpm preview:admin
```

루트의 `pnpm build`와 `pnpm lint`는 현재 client/admin 앱을 함께 검증합니다.

## Environment

고객용 앱 환경 변수는 `apps/client` 기준으로 둡니다.

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Dicha Coffee
VITE_ENABLE_MOCK=true
```

## Security Notes

- 액세스 토큰을 `localStorage` 또는 `sessionStorage`에 저장하는 구조를 기본값으로 두지 않았습니다.
- 인증은 `HttpOnly + Secure` 쿠키 기반 세션 연동을 전제로 설계했습니다.
- Axios 클라이언트는 `withCredentials: true`로 준비했습니다.
- 민감한 에러 응답은 인터셉터에서 일반화된 메시지로 정리합니다.
- Route Guard 구조를 분리해 private route 확장이 가능하도록 만들었습니다.
- Spring Boot 연동 시 CORS allowlist 정책이 필요합니다.
- CSRF 대응 포인트는 백엔드와 함께 쿠키 전략, CSRF 토큰 헤더, SameSite 정책을 확정해야 합니다.
- 추후 refresh token rotation, reuse detection, rate limiting, CSP, 보안 헤더 적용을 문서화 대상으로 남겨두었습니다.

## PWA Notes

- `vite-plugin-pwa`로 manifest와 service worker 등록을 설정했습니다.
- 앱 아이콘은 현재 placeholder SVG입니다.
- 앱 셸 자산이 precache 대상이 되도록 `globPatterns`를 지정했습니다.
- 푸시 알림은 아직 미연동이며, 권한 유도와 설치 프롬프트 훅만 준비했습니다.

## TODO

- `apps/admin` 관리자 목업 CRUD 화면 구현
- `packages/types`, `packages/ui`, `packages/utils`에 실제 공유 코드 이동
- Figma MCP 가능 시 모바일 프레임 구조 기준으로 spacing, typography, component token 정밀화
- Spring Boot 실 API 연결과 react-query query key 전략 확정
- QR 스캔 실구현과 카메라 권한 플로우 연결
- 인증/세션/CSRF 연동 문서 보강
