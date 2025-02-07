import PageTemplate from "~/components/PageTemplate";

const homeLinks = [
  { title: "Интернет-магазин", link: "/shop" },
  { title: "Калькулятор", link: "/lab2" },
  { title: "Сайт ИКНТ", link: "/iknt" },
];

export default function HomePage() {
  return (
    <PageTemplate
      title="Лабораторные работы"
      description="Выберите лабораторную работу, чтобы начать изучение."
      links={Array.from(homeLinks)}
    />
  );
}
