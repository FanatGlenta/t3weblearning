import PageTemplate from "~/components/PageTemplate";

const shopLinks = [
  { title: "Каталог", link: "/shop/catalog" },
  { title: "Новости", link: "/shop/news" },
  { title: "Доставка", link: "/shop/delivery" },
  { title: "Контакты", link: "/shop/contacts" },
  { title: "Корзина", link: "/shop/cart" },
  { title: "Админка", link: "/shop/admin" },
];

export default function ShopHome() {
  return (
    <PageTemplate
      title="Интернет-магазин"
      description="Добро пожаловать! Выберите раздел для продолжения."
      links={Array.from(shopLinks)}
    />
  );
}
