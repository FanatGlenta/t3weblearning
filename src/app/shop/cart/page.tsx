"use client";

import { useEffect } from "react";
import { useCartStore } from "~/store/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart, updateQuantity, clearCart } =
    useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id ?? "";

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-2xl p-4">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          {/* SVG-иконка пустой корзины */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-32 w-32 text-gray-400"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2 13h13l2-7H6"></path>
          </svg>

          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Ваша корзина пуста
          </h2>
          <p className="mt-2 text-gray-500">
            Добавьте товары в корзину, чтобы оформить заказ.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 rounded bg-blue-500 px-6 py-2 font-bold text-white transition hover:bg-blue-600"
          >
            Перейти в магазин
          </button>
        </div>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold">Корзина</h1>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={`${item.id}-${userId}`}
                className="flex items-center justify-between rounded border p-4 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    {item.price}₽ x {item.quantity} ={" "}
                    {item.price * item.quantity}₽
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(userId, item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-700 transition hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(userId, item.id, item.quantity + 1)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white transition hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(userId, item.id)}
                    className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white transition hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Итоговая сумма */}
          <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-100 p-4">
            <span className="text-lg font-semibold">Сумма заказа:</span>
            <span className="text-xl font-bold text-green-600">
              {totalPrice} ₽
            </span>
          </div>

          {/* Кнопки действий */}
          <div className="mt-4 space-y-2">
            <button
              onClick={() => clearCart(userId)}
              className="w-full rounded bg-red-500 px-4 py-2 font-bold text-white transition hover:bg-red-600"
            >
              Очистить корзину
            </button>
            <button
              onClick={() => router.push("/shop/checkout")}
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
