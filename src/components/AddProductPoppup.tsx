"use client";

import { useState, useRef } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ссылка на input

  const handleFileChange = (file: File | null) => {
    if (file) {
      setProductImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Программно вызываем выбор файла
    }
  };

  const handleSubmit = () => {
    if (!productName || !productDescription || !productPrice || !productImage) {
      alert("Заполните все поля!");
      return;
    }
    onAddProduct(productName, productDescription, productPrice, productImage);
    onClose();
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      {/* Контейнер попапа */}
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
        <h2 className="mb-4 text-xl font-bold">Добавить товар</h2>

        {/* Поля ввода */}
        <input
          type="text"
          placeholder="Название"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mb-2 w-full rounded-md border p-2"
        />
        <input
          type="text"
          placeholder="Описание"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="mb-2 w-full rounded-md border p-2"
        />
        <input
          type="number"
          placeholder="Цена"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="mb-2 w-full rounded-md border p-2"
        />

        {/* Drag and Drop */}
        <div
          className={`mb-2 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-2 transition ${
            isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick} // Добавляем клик по области
        >
          {productImage ? (
            <div className="text-center">
              <p className="text-sm text-gray-700">Выбран файл:</p>
              <p className="text-sm font-medium">{productImage.name}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Перетащите файл сюда или кликните, чтобы выбрать
            </p>
          )}
        </div>

        {/* Скрытый input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef} // Добавляем ref
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        {/* Кнопки */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSubmit}
            className="mr-2 w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Добавить
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
