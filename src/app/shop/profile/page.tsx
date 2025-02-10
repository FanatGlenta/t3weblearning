"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Photo from "../../../../public/assets/wb.png";

import CreateShopPopup from "~/components/CreateShopPopup";
import UserOrders from "~/components/UserOrders";
import AddProductPopup from "~/components/AddProductPoppup";

type Shop = {
  id: number;
  name: string;
  description: string;
  ownerId: string;
};

type Order = {
  id: number;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
};

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [activeTab, setActiveTab] = useState<"shop" | "orders">("shop");

  useEffect(() => {
    if (session?.user) {
      fetchShop();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user && shop) {
      fetchOrders();
      fetchProducts();
    }
  }, [session, shop]);

  const fetchShop = async () => {
    try {
      const response = await fetch(
        `/api/shop/get-shop?ownerId=${session?.user?.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setShop(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки магазина:", error);
    }
  };

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

  const fetchProducts = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch(
        `/api/shop/product-user?userId=${session.user.id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  };

  const handleCreateShop = async (
    shopName: string,
    shopDescription: string,
  ) => {
    try {
      const response = await fetch("/api/shop/create-shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: shopName,
          description: shopDescription,
          ownerId: session?.user?.id,
        }),
      });

      if (response.ok) {
        fetchShop();
        setShowCreateShop(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка создания магазина:", error);
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
      }
    } catch (error) {
      console.error("Ошибка удаления заказа:", error);
    }
  };

  const handleAddProduct = async (
    name: string,
    description: string,
    price: string,
    image: File | null,
  ) => {
    if (!image || !shop) return;

    // Проверяем, что session и user существуют
    if (!session || !session.user || !session.user.id) {
      console.error("Ошибка: пользователь не авторизован.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64String = reader.result?.toString().split(",")[1];
      if (!base64String) return;

      const uploadResponse = await fetch("/api/shop/upload-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64String,
          filename: image.name, // Передаем имя файла
        }),
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.filePath) return;

      const productResponse = await fetch("/api/shop/create-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          imageUrl: uploadData.filePath,
          shopId: shop.id,
          userId: session.user?.id,
        }),
      });

      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        console.error("Ошибка создания товара:", errorData);
        return;
      }

      fetchProducts();
    };
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/shop/create-products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId: session.user.id }),
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
    }
  };

  if (status === "loading")
    return <p className="text-center text-gray-600">Загрузка...</p>;
  if (!session || !session.user) {
    router.push("/shop/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Профиль пользователя
      </h1>

      {/* Основная информация о пользователе */}
      <div className="relative flex flex-col items-center">
        <div className="relative h-32 w-32">
          <Image
            src={session.user.image || Photo}
            alt="Фото профиля"
            width={128}
            height={128}
            className="rounded-full border-4 border-gray-300 shadow-lg"
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg">
          <strong>Имя:</strong> {session.user.name ?? "Не указано"}
        </p>
        <p className="text-lg">
          <strong>Почта:</strong> {session.user.email ?? "Не указано"}
        </p>
      </div>

      {/* Вкладки */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab("shop")}
          className={`rounded px-4 py-2 ${activeTab === "shop" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Магазин
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`rounded px-4 py-2 ${activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Заказы
        </button>
      </div>

      {/* Контент вкладок */}
      {activeTab === "shop" && (
        <div className="mt-6">
          {shop ? (
            <>
              <h2 className="text-xl font-bold">Мой магазин: {shop.name}</h2>
              <p className="text-gray-600">{shop.description}</p>

              <button
                onClick={() => setShowAddProduct(true)}
                className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
              >
                + Добавить товар
              </button>
              {showAddProduct && (
                <AddProductPopup
                  onClose={() => setShowAddProduct(false)}
                  onAddProduct={handleAddProduct}
                />
              )}

              <h2 className="mt-6 text-xl font-bold">
                Мои товары: {products.length}
              </h2>
              {products.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-lg border p-4 shadow-sm"
                    >
                      <h3 className="mt-2 text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="truncate text-gray-600">
                        {product.description}
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        {product.price} ₽
                      </p>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="mt-2 w-full rounded bg-red-500 px-2 py-1 text-white"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Товаров пока нет.</p>
              )}
            </>
          ) : (
            <button
              onClick={() => setShowCreateShop(true)}
              className="mt-6 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Создать магазин
            </button>
          )}

          {showCreateShop && (
            <CreateShopPopup
              onClose={() => setShowCreateShop(false)}
              onCreateShop={handleCreateShop}
            />
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Мои заказы: {orders.length}</h2>
          {orders.length > 0 ? (
            <UserOrders orders={orders} onDeleteOrder={handleDeleteOrder} />
          ) : (
            <p className="text-gray-600">Заказов пока нет.</p>
          )}
        </div>
      )}

      {/* Кнопка выхода */}
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
