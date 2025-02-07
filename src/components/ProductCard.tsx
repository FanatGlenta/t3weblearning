"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "~/store/useCartStore";
import { useSession } from "next-auth/react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? ""; // Проверяем userId
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Вы должны войти в систему, чтобы добавить товары в корзину!");
      return;
    }
    addToCart(userId, { ...product, quantity }); // Передаем userId первым аргументом
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full rounded object-cover"
      />
      <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">Цена: {product.price}₽</p>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="rounded bg-gray-200 px-3 py-1 text-xl"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="rounded bg-gray-200 px-3 py-1 text-xl"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-2 block w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Добавить в корзину
      </button>

      <Link
        href={`/shop/product/${product.id}`}
        className="mt-2 block rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
      >
        Подробнее
      </Link>
    </div>
  );
}
