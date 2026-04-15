import { ArrowRight, Camera, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "@/app/store";
import { AppCard } from "@/components/common/AppCard";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";

export function HomePage() {
  const status = useAuthStore((state) => state.status);
  const bestProducts = mockProducts.slice(0, 3);
  const quickLinks =
    status === "authenticated"
      ? [
          { label: "주문 조회", description: "최근 주문과 상태 확인", to: ROUTES.orders },
          { label: "구독 관리", description: "배송 주기와 상품 변경", to: ROUTES.subscription },
          { label: "QR / O2O", description: "매장 QR 진입과 수동 입력", to: ROUTES.qr },
          { label: "나의 블렌드", description: "저장한 블렌드 확인", to: ROUTES.myBlend },
        ]
      : [
          { label: "로그인", description: "주문/구독/블렌드 이어보기", to: ROUTES.login },
          { label: "회원가입", description: "취향 저장과 주문 관리 시작", to: ROUTES.signup },
          { label: "QR / O2O", description: "매장 코드로 빠르게 연결", to: ROUTES.qr },
          { label: "픽업 예약", description: "예약 가능한 시간 확인", to: ROUTES.reservation },
        ];
  const reviews = [
    {
      id: "review-1",
      rating: "★★★★★",
      content: '"향이 정말 진해요. 매일 아침 생각나는 커피"',
    },
    {
      id: "review-2",
      rating: "★★★★☆",
      content: '"커스텀 로스팅이 정말 만족스러워요"',
    },
  ];

  return (
    <div className="page-content space-y-7 bg-white pb-24 pt-0">
      <section className="relative overflow-hidden rounded-b-[2rem] rounded-t-none bg-[linear-gradient(180deg,#214d38_0%,#143826_100%)] px-5 pb-5 pt-6 text-white">
        <div className="absolute right-2 top-5 size-40 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(239,208,119,0.95),rgba(239,208,119,0.15)_58%,transparent_70%)] opacity-90" />
        <div className="absolute right-8 top-12 size-24 rounded-full border border-white/20 bg-white/10" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-[rgba(247,244,232,0.18)] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#f6edcf]">
            NEW ARRIVAL
          </span>
          <h2 className="mt-3 max-w-[13rem] font-heading text-[1.9rem] font-semibold leading-[1.2] tracking-[-0.04em]">
            한 잔의 커피,
            <br />
            향으로 기억되다
          </h2>
          <p className="mt-10 text-xs font-medium tracking-[0.04em] text-white/74">
            O2O 커스텀 로스팅 원두 플랫폼
          </p>
          <Link
            className="mt-3 inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-[var(--color-primary-green)]"
            to={ROUTES.tasteTest}
          >
            취향 테스트하기
            <ArrowRight className="ml-1 size-4" />
          </Link>
          <div className="mt-3 flex justify-center gap-2">
            <span className="size-1.5 rounded-full bg-white/65" />
            <span className="size-1.5 rounded-full bg-white/35" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
              빠른 진입
            </h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              구현된 주요 화면으로 바로 이동해 볼 수 있어요.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to}>
              <AppCard className="h-full rounded-[1.25rem]">
                <p className="text-sm font-semibold text-[var(--color-primary-green)]">{item.label}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{item.description}</p>
              </AppCard>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
          BEST 원두
        </h3>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          많은 분들이 선택한 DICHA 대표 원두
        </p>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {bestProducts.map((product) => (
            <ProductTileCard
              key={product.id}
              className="w-[8.25rem] shrink-0"
              compact
              product={product}
              showOrigin={false}
              showRating={false}
            />
          ))}
        </div>
      </section>

      <AppCard className="relative overflow-hidden rounded-[1.6rem]" variant="warm">
        <span className="absolute right-4 top-4 flex size-[5.25rem] items-center justify-center rounded-full bg-[rgba(193,162,97,0.24)]">
          <Coffee className="size-9 text-[var(--color-primary-green)]" />
        </span>
        <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-primary-green)]">
          Roaster&apos;s Pick
        </span>
        <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">이달의 추천</p>
        <h3 className="mt-1 font-heading text-[1.4rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
          케냐 키암부 AA
        </h3>
        <p className="mt-1 max-w-[12rem] text-xs leading-5 text-[var(--color-muted)]">
          블랙커런트 · 자스민 · 밝은 산미
        </p>
        <Link
          className="mt-3 inline-flex items-center rounded-full bg-[var(--color-primary-green)] px-3 py-1.5 text-xs font-semibold text-white"
          to={ROUTES.products}
        >
          자세히 보기
          <ArrowRight className="ml-1 size-3.5" />
        </Link>
      </AppCard>

      <section>
        <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
          포토 리뷰
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {reviews.map((review) => (
            <AppCard key={review.id} className="overflow-hidden rounded-[1.25rem]" padding="none">
              <div className="flex h-[5.25rem] items-center justify-center bg-[linear-gradient(180deg,#ebe8df_0%,#ddd7ca_100%)]">
                <Camera className="size-6 text-[var(--color-primary-green)]" />
              </div>
              <div className="px-3 py-2.5">
                <p className="text-xs text-[var(--color-accent-gold)]">{review.rating}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--color-ink)]">{review.content}</p>
              </div>
            </AppCard>
          ))}
        </div>
      </section>

      <AppCard className="rounded-[1.6rem] px-5 py-5" padding="none" variant="warm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
              DICHA의 이야기
            </h3>
            <p className="mt-2 max-w-[13rem] text-sm leading-6 text-[var(--color-muted)]">
              달라홀스처럼 변하지 않는 품질로 당신만의 원두를 로스팅합니다. 향으로 기억되는 한 잔을 전합니다.
            </p>
          </div>
          <div className="flex size-[4.9rem] shrink-0 items-center justify-center rounded-full bg-[rgba(29,62,43,0.08)]">
            <span className="text-[2rem]">🐴</span>
          </div>
        </div>
      </AppCard>
    </div>
  );
}
