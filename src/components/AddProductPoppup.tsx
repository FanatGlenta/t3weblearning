"use client";

import { useState } from "react";

interface AddProductPopupProps {
  onClose: () => void;
  onAddProduct: (name: string, price: string, image: File | null) => void;
}

export default function AddProductPopup({
  onClose,
  onAddProduct,
}: AddProductPopupProps) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!productName || !productPrice || !productImage) {
      alert("Заполните все поля!");
      return;
    }
    onAddProduct(productName, productPrice, productImage);
    onClose();
    setProductName("");
    setProductPrice("");
    setProductImage(null);
  };

  return (
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
          onClick={handleSubmit}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          Добавить
        </button>
        <button onClick={onClose} className="mt-2 text-gray-500">
          Отмена
        </button>
      </div>
    </div>
  );
}
