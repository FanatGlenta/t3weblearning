"use client";

import PageTemplate from "~/components/PageTemplate";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ShopHome() {
  return (
    <PageTemplate
      title="Интернет-магазин"
      description="Добро пожаловать! Выберите нужный товар и добавьте в корзину"
    >
      {" "}
    </PageTemplate>
  );
}
