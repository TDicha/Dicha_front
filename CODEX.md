# 현재 대화 요약

- Figma MCP 연결은 정상 확인됨.
- Figma 계정은 `kwoos3333@gmail.com` / `wooseokKang`으로 연결되어 있음.
- Figma 디자인은 프레임 또는 컴포넌트를 선택한 상태에서 `node-id`가 포함된 링크로 전달하는 방식이 가장 정확함.
- 여러 화면을 한 번에 구현하려면 `CODEX.md`에 화면별 Figma 링크, 목적, 주요 UI, 목업 데이터, 클릭/전환 동작을 모아두는 방식이 좋음.
- 목표는 React 기반 관리자 페이지를 현재프로젝트에서 추가로 제작하는 것임.
- 우선 백엔드 연결은 고려하지 않고 목업 데이터로 화면을 구성함.
- 기본 반응형은 필요하며, 사이드바 축소와 카드 크기 조정 같은 관리자 화면 수준의 반응을 적용함.
- 대시보드 내부는 사이드바 메뉴를 통해 여러 관리 화면으로 이동하는 구조가 필요함.
- Figma 파일에는 이미 대시보드, 주문 관리, 상품 관리, 구독 관리, 예약 관리, 회원 관리, 리뷰 관리, 쿠폰 관리, 통계, 설정 화면이 포함되어 있음.
- 기존 Figma 디자인의 주요 스타일은 짙은 녹색 `#1D3E2B`, 골드 `#C39F54`, 밝은 회색 배경 `#F5F5F5`, 흰색 카드와 약한 그림자 중심임. - 색상구현시 디자인 변수를 참고


# Admin React UI 작업 요청

모노레포(Monorepo) 도입은 장기적인 서비스 확장성과 코드 보안을 고려했을 때 아주 탁월한 선택입니다.

프론트엔드 개발을 혼자 전담하시면서도 2명의 백엔드 개발자와 API를 연동해야 하는 현재 상황에서, 모노레포는 코드 중복을 줄이고 생산성을 극대화하는 강력한 무기가 될 것입니다. Dicha 커피 프로젝트에 모노레포를 도입하기 위한 구체적인 전략과 세팅 방법을 단계별로(Step-by-step) 안내해 드리겠습니다.

Step 1: 모노레포 툴 체인 선택 (Turborepo + pnpm)
React와 TypeScript, Tailwind CSS 생태계에서 현재 가장 추천하는 조합은 Turborepo + pnpm입니다.

Turborepo: 빌드 캐싱을 통해 변경된 패키지만 빌드하므로 속도가 매우 빠릅니다.

pnpm (Workspace): 패키지 간의 의존성(Symlink) 관리가 뛰어나고 설치 속도가 빠르며 디스크 용량을 적게 차지합니다.

Step 2: Dicha 프로젝트의 모노레포 폴더 구조 설계
저장소를 크게 실제 배포되는 앱(apps)과 공통으로 사용하는 패키지(packages)로 나눕니다.

Plaintext
dicha-monorepo/
├── apps/
│   ├── client/          # Dicha 커피 일반 고객용 PWA 앱 (React Router / Next.js)
│   └── admin/           # 관리자 대시보드 앱 (무거운 차트 라이브러리 포함)
├── packages/
│   ├── ui/              # 공통 UI 컴포넌트 (버튼, 인풋, Tailwind CSS 설정 등)
│   ├── types/           # 🌟 공통 TypeScript 타입 (백엔드 2명과 조율된 DTO 등)
│   └── store/           # 공통 상태 관리 로직 (Zustand store 등)
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
Step 3: 핵심 장점 활용 방법 및 구현 예시
1. 타입(Types) 공유로 백엔드와의 소통 비용 감소
백엔드에서 내려주는 데이터 인터페이스를 packages/types에 한 번만 정의해 두면, client와 admin 양쪽에서 모두 가져다 쓸 수 있습니다.

TypeScript
// packages/types/src/index.ts

// Define the core coffee bean interface shared across the system
export interface CoffeeBean {
  id: string;
  name: string;
  roastLevel: 'LIGHT' | 'MEDIUM' | 'DARK';
  price: number;
  stock: number;
}

// Define the order status for the O2O platform
export type OrderStatus = 'PENDING' | 'ROASTING' | 'READY_FOR_PICKUP' | 'COMPLETED';
2. 공통 UI 컴포넌트 공유 (packages/ui)
Tailwind CSS가 적용된 버튼이나 모달을 한 번만 만들어두면, 프론트엔드 혼자서 두 개의 앱을 유지보수하는 부담이 절반으로 줄어듭니다.

TypeScript
// packages/ui/src/Button.tsx
import React from 'react';

// Define props for the shared button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  // Apply Tailwind classes dynamically based on the variant
  const baseStyle = "px-4 py-2 rounded font-bold transition-colors";
  const variantStyle = variant === 'primary' 
    ? "bg-amber-600 text-white hover:bg-amber-700" 
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
};
3. 앱에서 공통 패키지 불러오기
apps/client나 apps/admin에서는 위에서 만든 패키지를 마치 외부 라이브러리인 것처럼 npm install (또는 pnpm add) 하여 사용합니다.

TypeScript
// apps/admin/src/pages/Dashboard.tsx
import { Button } from '@dicha/ui';
import { CoffeeBean } from '@dicha/types';

export default function Dashboard() {
  // Mock data for the admin chart
  const recentBeans: CoffeeBean[] = [];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Use the shared button component */}
      <Button variant="primary">Generate Report</Button>
    </div>
  );
}
Step 4: 초기 세팅 실행 방법
기존 프로젝트를 당장 엎기보다는, 새로운 폴더에 Turborepo 뼈대를 만들어 두고 기존 코드를 옮기는 방식을 추천합니다.

터미널에서 아래 명령어를 실행하여 기본 구조를 생성할 수 있습니다. (초기 테스트 및 학습용으로 가볍게 시작하기 좋습니다.)

Bash
# Initialize a new Turborepo project using pnpm
npx create-turbo@latest dicha-workspace --use pnpm
생성 후 apps 폴더 안에 기존 React Router 프로젝트를 client로 복사해 넣고, admin 폴더를 새로 만들어 관리자 페이지 구축을 시작하시면 됩니다. 모노레포 세팅 중 Tailwind CSS 설정 공유나 Zustand 스토어 분리 등 특정 부분의 세팅 코드가 필요하시다면 언제든 말씀해 주세요.

## 공통 조건
- 백엔드 연결 있음 

백엔드 예상 조건


- 목업 데이터 사용
- 기본 반응형 지원
- 로그인 화면 필요
- 로그인 후 대시보드 진입
- 대시보드 내부는 사이드바로 화면 이동
- 디자인은 Figma 기준으로 구현

## Figma 링크

### 로그인 화면
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=2007-273&t=g3XRavxejzBvq7hg-0

### 대시보드 메인
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-1759&t=g3XRavxejzBvq7hg-0

### 주문 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-1960&t=g3XRavxejzBvq7hg-0

### 상품 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-2163&t=g3XRavxejzBvq7hg-0

### 구독 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-2366&t=g3XRavxejzBvq7hg-0

### 예약 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-2550&t=g3XRavxejzBvq7hg-0

### 회원 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-3880&t=g3XRavxejzBvq7hg-0

### 리뷰 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-4074&t=g3XRavxejzBvq7hg-0

### 쿠폰 관리
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-4232&t=g3XRavxejzBvq7hg-0

### 통계
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-4647&t=g3XRavxejzBvq7hg-0

### 설정
https://www.figma.com/design/bzjySCwH2sVZADCiXAaEtt/Untitled--Copy-?node-id=78-4851&t=g3XRavxejzBvq7hg-0


## 필요한 화면

로그인 화면
대시보드 메인
주문 관리
상품 관리
구독 관리
예약 관리
회원 관리
리뷰 관리
쿠폰 관리
통계
설정

## 사이드바 메뉴
대시보드
주문 관리
상품 관리
구독 관리
예약 관리
회원 관리
리뷰 관리
쿠폰 관리
통계
설정
로그아웃

## 구현 방식
- React Router 사용 가능
- 목업 데이터는 코드 내부에 작성
- 컴포넌트 재사용 가능하게 구성
- 모바일에서는 사이드바 접힘 또는 상단 메뉴 형태
