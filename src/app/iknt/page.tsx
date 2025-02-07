import PageTemplate from "~/components/PageTemplate";

const ikntLinks: { title: string; link: string }[] = [
  { title: "Новости", link: "/iknt/news" },
  { title: "Преподаватели", link: "/iknt/teachers" },
];

export default function IKNTPage() {
  return (
    <PageTemplate
      title="ИКНТ"
      description="Выберите раздел для просмотра информации."
    >
      {" "}
    </PageTemplate>
  );
}
