"use client";

import { useState } from "react";

interface CreateShopPopupProps {
  onClose: () => void;
  onCreateShop: (shopName: string, shopDescription: string) => void;
}

export default function CreateShopPopup({
  onClose,
  onCreateShop,
}: CreateShopPopupProps) {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  const handleSubmit = () => {
    if (!shopName || !shopDescription) {
      alert("Заполните все поля!");
      return;
    }
    onCreateShop(shopName, shopDescription);
    onClose(); // Закрываем попап после создания магазина
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Попап */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Заголовок */}
        <h2 className="mb-4 text-center text-xl font-bold">Создать магазин</h2>

        {/* Поля ввода */}
        <input
          type="text"
          placeholder="Название магазина"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="mb-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Описание магазина"
          value={shopDescription}
          onChange={(e) => setShopDescription(e.target.value)}
          className="mb-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Кнопки */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className="mr-2 w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Создать
          </button>
          <button
            onClick={onClose}
            className="ml-2 w-1/2 rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
