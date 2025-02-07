"use client";

import { useEffect, useState } from "react";
import PageTemplate from "~/components/PageTemplate";
import ProductCard from "~/components/ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ShopHome() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/shop/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <PageTemplate
      title="Интернет-магазин"
      description="Добро пожаловать! Выберите нужный товар и добавьте в корзину"
    >
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Загрузка товаров...</p>
      )}
    </PageTemplate>
  );
}
