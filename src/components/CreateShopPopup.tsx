"use client";

import { useState } from "react";

interface CreateShopPopupProps {
  onClose: () => void;
  onCreateShop: (shopName: string) => void;
}

export default function CreateShopPopup({
  onClose,
  onCreateShop,
}: CreateShopPopupProps) {
  const [shopName, setShopName] = useState("");

  const handleSubmit = () => {
    if (!shopName) {
      alert("Введите название магазина!");
      return;
    }
    onCreateShop(shopName);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Создать магазин</h2>
        <input
          type="text"
          placeholder="Название магазина"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="mb-2 w-full border p-2"
        />
        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Создать
        </button>
        <button onClick={onClose} className="mt-2 text-gray-500">
          Отмена
        </button>
      </div>
    </div>
  );
}
