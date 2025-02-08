"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import Photo from "../../../../public/assets/wb.png";

type Order = {
  id: number;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  createdById: string;
};

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
      fetchProducts();
    }
  }, [session]);

  // Получение заказов пользователя
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

  // Получение товаров пользователя
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `/api/shop/products?userId=${session?.user?.id}`,
      );
      if (response.ok) {
        const data: Product[] = await response.json();
        console.log("Загруженные товары:", data);
        setProducts(
          data.filter((product) => product.createdById === session?.user?.id),
        );
      }
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  };

  // Удаление заказа
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

  // Добавление товара
  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productImage) {
      alert("Заполните все поля!");
      return;
    }

    // Конвертируем файл в base64
    const reader = new FileReader();
    reader.readAsDataURL(productImage);
    reader.onload = async () => {
      const base64String = reader.result?.toString().split(",")[1]; // Убираем метаданные
      const filename = `${Date.now()}-${productImage.name}`;

      if (!base64String) {
        alert("Ошибка конвертации изображения");
        return;
      }

      // Загружаем изображение
      const uploadResponse = await fetch("/api/shop/upload-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64String, filename }),
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.filePath) {
        alert("Ошибка загрузки изображения");
        return;
      }

      const imageUrl = uploadData.filePath; // URL загруженного изображения

      // Добавляем товар в базу данных
      const response = await fetch("/api/shop/create-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          imageUrl,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        fetchProducts();
        setShowAddProduct(false);
        setProductName("");
        setProductPrice("");
        setProductImage(null);
      } else {
        alert("Ошибка при добавлении товара");
      }
    };
  };

  // Удаление товара
  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch("/api/shop/create-products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId: session?.user?.id }),
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        alert("Ошибка при удалении товара");
      }
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
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
      {/* Список товаров пользователя */}
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-bold">Мои товары</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
        >
          + Добавить товар
        </button>

        {products.length === 0 ? (
          <p className="text-gray-500">Вы еще не добавили товары.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between rounded-lg border p-4 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-700">₽{product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Попап добавления товара */}
      {showAddProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Добавить товар</h2>
            <input
              type="text"
              placeholder="Название"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mb-2 w-full border p-2"
            />
            <input
              type="number"
              placeholder="Цена"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="mb-2 w-full border p-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files?.[0] || null)}
              className="mb-2 w-full border p-2"
            />
            <button
              onClick={handleAddProduct}
              className="w-full rounded bg-blue-500 px-4 py-2 text-white"
            >
              Добавить
            </button>
            <button
              onClick={() => setShowAddProduct(false)}
              className="mt-2 text-gray-500"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

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
