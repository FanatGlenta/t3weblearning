"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "~/store/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "~/components/Input"; // Импортируем компонент Input

export default function CheckoutPage() {
  const { cart, fetchCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id ?? "";

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    passport: "",
    paymentType: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Заказ оформлен!");
    router.push("/");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const isSubmitDisabled =
    formData.paymentType === "online" &&
    (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV);

  return (
    <div className="mx-auto max-w-2xl p-4">
      {cart.length === 0 ? (
        <div>
          <h1 className="mb-4 text-2xl font-bold">Информация о доставке</h1>
          <p>Мы предоставляем бесплатную доставку по всей России.</p>

          <div className="mt-6 flex flex-col space-y-2">
            <button
              onClick={() => router.push("/")}
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold">Оформление заказа</h1>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between rounded border p-2"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity} x {item.price}₽
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded bg-gray-100 p-4 text-lg font-bold">
            Итоговая стоимость: {totalPrice}₽
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Адрес доставки</label>
            <Input
              type="text"
              name="address"
              placeholder="Введите адрес"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Телефон</label>
            <Input
              type="tel"
              name="phone"
              placeholder="Введите номер телефона"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Паспортные данные
            </label>
            <Input
              type="text"
              name="passport"
              placeholder="Введите паспортные данные"
              value={formData.passport}
              onChange={handleChange}
              required
            />
          </div>

          {/* Выбор типа оплаты */}
          <div className="mt-4">
            <label className="block text-sm font-medium">Тип оплаты</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            >
              <option value="cash">Наличными при получении</option>
              <option value="online">Онлайн оплата</option>
            </select>
          </div>

          {/* Форма для банковской карты */}
          {formData.paymentType === "online" && (
            <div className="mt-4 rounded bg-gray-100 p-4">
              <h2 className="font-bold">Оплата картой</h2>

              <div className="mt-2">
                <label className="block text-sm font-medium">Номер карты</label>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-2 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Срок</label>
                  <Input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium">CVV</label>
                  <Input
                    type="text"
                    name="cardCVV"
                    placeholder="CVV"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-2">
            <button
              onClick={() => router.push("/cart")}
              className="w-full rounded bg-gray-500 px-4 py-2 font-bold text-white transition hover:bg-gray-600"
            >
              Вернуться к корзине
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={`w-full rounded px-4 py-2 font-bold text-white transition ${
                isSubmitDisabled
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Подтвердить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
