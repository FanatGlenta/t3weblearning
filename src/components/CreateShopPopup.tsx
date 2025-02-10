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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 p-4">
      <div className="relative rounded-lg bg-white p-6 shadow-lg">
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
        <h2 className="mb-4 text-xl font-bold">Создать магазин</h2>
        <input
          type="text"
          placeholder="Название магазина"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="mb-2 w-full border p-2"
        />

        <input
          type="text"
          placeholder="Описание магазина"
          value={shopDescription}
          onChange={(e) => setShopDescription(e.target.value)}
          className="mb-2 w-full border p-2"
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Создать
        </button>
      </div>
    </div>
  );
}
