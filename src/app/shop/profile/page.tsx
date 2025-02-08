"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi"; // Иконки

type Order = {
  id: number;
  total: number;
  items: { name: string; quantity: number }[];
};

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders"); // Запрос к API заказов
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
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

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar(file);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.refresh();
      }
    }
  };

  const handleRemoveAvatar = async () => {
    const response = await fetch("/api/remove-avatar", {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
    }
  };

  const handleAddStore = () => {
    router.push("/add-store");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Профиль пользователя
      </h1>

      <div className="relative flex flex-col items-center">
        <div className="relative h-32 w-32">
          <Image
            src={user.image || "/default-avatar.png"}
            alt="Avatar"
            width={128}
            height={128}
            className="rounded-full border-4 border-gray-300 text-center shadow-lg"
          />

          {/* Кнопка загрузки аватара */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 rounded-full bg-gray-800 p-2 text-white transition hover:bg-gray-600"
          >
            <FiCamera className="h-5 w-5" />
          </button>

          {/* Поле выбора файла (скрытое) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Кнопка удаления аватара */}
        {user.image && (
          <button
            onClick={handleRemoveAvatar}
            className="mt-3 flex items-center gap-2 rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
          >
            <FiTrash2 className="h-5 w-5" /> Удалить аватар
          </button>
        )}
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
                  <strong>Общая сумма:</strong> ${order.total.toFixed(2)}
                </p>
                <ul className="mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {item.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={handleAddStore}
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Добавить магазин
        </button>
        <button
          onClick={handleLogout}
          className="rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
