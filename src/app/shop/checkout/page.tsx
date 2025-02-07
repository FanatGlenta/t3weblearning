"use client";

import { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    const order = { name, address, product, quantity };
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
    alert("Заказ отправлен!");
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Оформление заказа</h1>
      <input
        className="w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />
      <input
        className="w-full border p-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Адрес"
      />
      <input
        className="w-full border p-2"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Товар"
      />
      <button
        onClick={handleOrder}
        className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        Заказать
      </button>
    </main>
  );
}
