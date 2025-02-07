import PageTemplate from "~/components/PageTemplate";

const ikntLinks: { title: string; link: string }[] = [
  { title: "Новости", link: "/iknt/news" },
  { title: "Преподаватели", link: "/iknt/teachers" },
]; // No 'as const'

export default function IKNTPage() {
  return (
    <PageTemplate
      title="ИКНТ"
      description="Выберите раздел для просмотра информации."
      links={Array.from(ikntLinks)}
    />
  );
}
