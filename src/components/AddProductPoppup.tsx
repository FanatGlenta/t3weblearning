"use client";

import { useState } from "react";

interface AddProductPopupProps {
  onClose: () => void;
  onAddProduct: (
    name: string,
    description: string,
    price: string,
    image: File | null,
  ) => void;
}

export default function AddProductPopup({
  onClose,
  onAddProduct,
}: AddProductPopupProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!productName || !productDescription || !productPrice || !productImage) {
      alert("Заполните все поля!");
      return;
    }
    console.log(productName, productDescription, productPrice, productImage);
    onAddProduct(productName, productDescription, productPrice, productImage);
    onClose();
    setProductName("");
    setProductPrice("");
    setProductImage(null);
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
        <h2 className="mb-4 text-xl font-bold">Добавить товар</h2>
        <input
          type="text"
          placeholder="Название"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mb-2 w-full border p-2"
        />
        <input
          type="text"
          placeholder="Описание"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
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
        {/* <button onClick={onClose}>отмена</button> */}
      </div>
    </div>
  );
}
