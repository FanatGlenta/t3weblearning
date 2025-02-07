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
      <h1 className="mb-4 text-2xl font-bold">Корзина</h1>

      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
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
