export function LoginSocialButtons() {
  return (
    <div className="mt-7 space-y-3">
      <button
        className="flex h-12 w-full items-center rounded-[0.85rem] bg-[var(--social-kakao)] px-6 text-[0.95rem] font-semibold text-[var(--text-title)]"
        type="button"
      >
        <span className="mr-2 text-base">💬</span>
        카카오로 시작하기
      </button>
      <button
        className="flex h-12 w-full items-center rounded-[0.85rem] bg-[var(--social-naver)] px-6 text-[0.95rem] font-semibold text-[var(--text-inverse)]"
        type="button"
      >
        <span className="mr-2 text-sm font-bold">N</span>
        네이버로 시작하기
      </button>
    </div>
  );
}
