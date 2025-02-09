"use client";

import { FiTrash2 } from "react-icons/fi";

type Order = {
  id: number;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

interface UserOrdersProps {
  orders: Order[];
  onDeleteOrder: (orderId: number) => void;
}

export default function UserOrders({ orders, onDeleteOrder }: UserOrdersProps) {
  return (
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
                onClick={() => onDeleteOrder(order.id)}
                className="mt-2 flex items-center gap-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                <FiTrash2 /> Удалить заказ
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
