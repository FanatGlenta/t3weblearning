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
  const userId = session?.user?.id ?? "";
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!userId) {
      alert("Вы должны войти в систему, чтобы добавить товары в корзину!");
      return;
    }

    addToCart(userId, { ...product, quantity });

    // Анимация на кнопке
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105">
      {/* Верхний блок с изображением и информацией */}
      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-40 w-full rounded object-cover"
        />
        <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">Цена: {product.price}₽</p>
      </div>

      {/* Нижний блок с кнопками */}
      <div className="mt-4">
        <div className="flex items-center justify-center gap-2">
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
          className={`mt-2 block w-full rounded px-4 py-2 text-white transition ${
            added ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {added ? "Добавлено!" : "Добавить в корзину"}
        </button>
      </div>
    </div>
  );
}
