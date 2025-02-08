"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Photo from "../../../../public/assets/wb.png";

type Order = {
  id: number;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `/api/shop/orders?userId=${session?.user?.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const response = await fetch("/api/shop/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        alert("Ошибка при удалении заказа");
      }
    } catch (error) {
      console.error("Ошибка удаления заказа:", error);
    }
  };

  if (status === "loading") {
    return <p className="text-center text-gray-600">Загрузка...</p>;
  }

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <div className="relative mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Профиль пользователя
      </h1>

      <div className="relative flex flex-col items-center">
        <div className="relative h-32 w-32">
          <Image
            src={Photo}
            alt="Фото профиля"
            width={128}
            height={128}
            className="rounded-full border-4 border-gray-300 shadow-lg"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg">
          <strong>Имя:</strong> {user.name ?? "Не указано"}
        </p>
        <p className="text-lg">
          <strong>Почта:</strong> {user.email ?? "Не указано"}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-bold">Мои заказы</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">У вас пока нет заказов.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="rounded-lg border p-4 shadow-md">
                <p>
                  <strong>Заказ #{order.id}</strong>
                </p>
                <p>
                  <strong>Общая сумма:</strong> ₽{order.total.toFixed(2)}
                </p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="mt-2 flex items-center gap-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  <FiTrash2 /> Удалить заказ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
