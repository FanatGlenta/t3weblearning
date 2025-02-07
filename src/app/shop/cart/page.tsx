"use client";

import { useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Корзина</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="rounded-lg border p-4 shadow">
            <span>{item.name}</span>
          </div>
        ))
      )}
    </main>
  );
}
