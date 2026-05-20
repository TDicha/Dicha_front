import { placeholderIcon, placeholderPageDescriptions, adminPageTitles } from "@/app/navigation";

interface PlaceholderPageProps {
  route: string;
}

export function PlaceholderPage({ route }: PlaceholderPageProps) {
  const Icon = placeholderIcon;
  const title = adminPageTitles.get(route) ?? "관리 화면";
  const description = placeholderPageDescriptions.get(route) ?? "관리자 기능이 들어갈 자리입니다.";

  return (
    <section className="admin-card placeholder-card">
      <Icon size={28} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}
