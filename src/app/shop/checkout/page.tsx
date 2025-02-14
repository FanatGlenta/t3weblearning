"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "~/store/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "~/components/Input";

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
    city: "",
    postalCode: "",
    phone: "",
    passport: "",
    deliveryType: "standard",
    paymentType: "cash",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    comment: "",
    agreeToTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async () => {
    if (!userId || !formData.agreeToTerms) {
      alert("Необходимо согласиться с условиями.");
      return;
    }

    try {
      const response = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cart, formData }),
      });

      if (response.ok) {
        alert("Заказ оформлен!");
        router.push("/shop/profile");
      } else {
        alert("Ошибка при оформлении заказа");
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const isSubmitDisabled =
    (formData.paymentType === "online" &&
      (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVV)) ||
    !formData.agreeToTerms;

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
            <label className="block text-sm font-medium">Город</label>
            <Input
              type="text"
              name="city"
              placeholder="Введите город"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Почтовый индекс</label>
            <Input
              type="number"
              name="postalCode"
              placeholder="Введите почтовый индекс"
              value={formData.postalCode}
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

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Выберите способ доставки
            </label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            >
              <option value="standard">Стандартная доставка</option>
              <option value="express">Экспресс-доставка</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Комментарий к заказу
            </label>
            <textarea
              name="comment"
              placeholder="Ваши пожелания"
              value={formData.comment}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-2"
            />
          </div>

          <div className="mt-4">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Я согласен с условиями доставки</label>
          </div>

          <div className="mt-6 flex flex-col space-y-2">
            <button
              onClick={() => router.push("/shop/cart")}
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
