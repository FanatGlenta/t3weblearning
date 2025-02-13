import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
};

interface EditProductPopupProps {
  product: Product;
  onClose: () => void;
  onUpdateProduct: (
    id: number,
    name: string,
    description: string,
    price: string,
  ) => void;
}

export default function EditProductPopup({
  product,
  onClose,
  onUpdateProduct,
}: EditProductPopupProps) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());

  const handleSave = () => {
    onUpdateProduct(product.id, name, description, price);
  };

  return (
    <div className="backdrop-blur-sm: fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="relative w-full rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">Редактировать товар</h2>
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

        <p>Название</p>
        <input
          type="text"
          className="mt-2 w-full rounded border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Описание</p>
        <textarea
          className="mt-2 w-full rounded border px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Цена</p>
        <input
          type="number"
          className="mt-2 w-full rounded border px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
}
