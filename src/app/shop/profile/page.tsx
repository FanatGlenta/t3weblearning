"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

import Photo from "../../../assets/wb.png";
import CreateShopPopup from "~/components/CreateShopPopup";
import UserOrders from "~/components/UserOrders";
import AddProductPopup from "~/components/AddProductPoppup";

import { fetchShop, createShop } from "~/services/shopService";
import { fetchOrders, deleteOrder } from "~/services/orderService";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "~/services/productService";
import Loader from "~/components/Loader";
import EditProductPopup from "~/components/EditProductPopup";

type Shop = { id: number; name: string; description: string; ownerId: string };
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
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchShop(session.user.id).then(setShop);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.id && shop) {
      fetchOrders(session.user.id).then(setOrders);
      fetchProducts(session.user.id).then(setProducts);
    }
  }, [session, shop]);

  const handleCreateShop = async (
    shopName: string,
    shopDescription: string,
  ) => {
    if (!session?.user?.id) return;
    try {
      await createShop(shopName, shopDescription, session.user.id);
      fetchShop(session.user.id).then(setShop);
      setShowCreateShop(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleAddProduct = async (
    name: string,
    description: string,
    price: string,
    image: File | null,
  ) => {
    if (!image || !shop || !session?.user?.id) return;
    await addProduct(name, description, price, image, shop.id, session.user.id);
    fetchProducts(session.user.id).then(setProducts);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!session?.user?.id) return;
    if (await deleteProduct(productId, session.user.id)) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (await deleteOrder(orderId)) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const handleEditProductClick = (product: Product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = async (
    id: number,
    name: string,
    description: string,
    price: string,
  ) => {
    if (!session?.user?.id) return;
    try {
      await updateProduct(id, session.user.id, name, description, price);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, name, description, price: Number(price) }
            : product,
        ),
      );

      setEditProduct(null);
    } catch (error) {
      alert("Ошибка при обновлении товара");
    }
  };

  if (status === "loading") return <Loader />;

  if (!session || !session.user) {
    router.push("/shop");
    return null;
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Профиль пользователя
      </h1>

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

              <h2 className="mt-6 text-xl font-bold">Мои товары</h2>
              {products.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col justify-between rounded-lg border p-4 pt-3 shadow-sm"
                    >
                      <div>
                        <div className="relative">
                          <h3 className="text-lg font-semibold">
                            {product.name}
                          </h3>
                          <button
                            className="absolute right-0 top-0 p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => handleEditProductClick(product)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V14h3.828l7.586-7.586a2 2 0 000-2.828l-1-1zM4 13v3h3l10-10-3-3L4 13z" />
                            </svg>
                          </button>
                        </div>

                        <p className="truncate text-gray-600">
                          {product.description}
                        </p>
                        <p className="mt-1 text-sm font-bold">
                          {product.price} ₽
                        </p>
                      </div>
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

          {editProduct && (
            <EditProductPopup
              product={editProduct}
              onClose={() => setEditProduct(null)}
              onUpdateProduct={handleUpdateProduct}
            />
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

      <div className="mt-6">
        <button
          onClick={() => signOut({ callbackUrl: "/shop" })}
          className="w-full rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
