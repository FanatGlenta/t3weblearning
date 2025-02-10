"use client";

import { useState } from "react";
import Navbar from "~/components/Navbar";
import NumberPad from "~/components/ButtonCalculator";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState("");

  // Функция для ввода цифр кнопками
  const handleNumberClick = (digit: string) => {
    setInput((prev) => prev + digit);
  };

  // Функция для конвертации числа
  const handleConvert = () => {
    if (input) {
      setResult(parseInt(input, fromBase).toString(toBase).toUpperCase());
    }
  };

  // Функция для сброса ввода
  const handleReset = () => {
    setInput("");
    setResult("");
  };

  const homeLinks = [
    { title: "На главную", link: "/" },
    { title: "Интернет-магазин", link: "/shop" },
    { title: "Калькулятор", link: "/lab2" },
    { title: "Сайт ИКНТ", link: "/iknt" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 text-gray-900">
      <Navbar links={homeLinks} />
      <h1 className="mt-6 text-center text-3xl font-bold">
        Калькулятор систем счисления
      </h1>

      {/* Выбор систем счисления */}
      <div className="mt-4 flex space-x-4">
        <div>
          <label className="block text-lg font-semibold">Из системы</label>
          <select
            className="rounded-md border border-gray-300 bg-white p-2 text-lg shadow-sm transition-all hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            value={fromBase}
            onChange={(e) => {
              setFromBase(parseInt(e.target.value, 10));
              setInput("");
              setResult("");
            }}
          >
            {Array.from({ length: 15 }, (_, i) => i + 2).map((base) => (
              <option key={base} value={base}>
                {base}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold">В систему</label>
          <select
            className="rounded border p-2"
            value={toBase}
            onChange={(e) => setToBase(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 15 }, (_, i) => i + 2).map((base) => (
              <option key={base} value={base}>
                {base}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Поле ввода (только для чтения) */}
      <div className="mt-4">
        <input
          className="w-64 rounded border bg-white p-2 text-center text-xl"
          value={input}
          readOnly
        />
      </div>

      {/* Кнопки ввода цифр */}
      <NumberPad onClick={handleNumberClick} fromBase={fromBase} />

      {/* Кнопки "Перевести" и "Сброс" */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleConvert}
          className="rounded bg-green-500 px-6 py-2 text-lg text-white hover:bg-green-600"
        >
          Перевести
        </button>
        <button
          onClick={handleReset}
          className="rounded bg-red-500 px-6 py-2 text-lg text-white hover:bg-red-600"
        >
          Сброс
        </button>
      </div>

      {/* Вывод результата */}
      <p className="mt-4 text-2xl font-bold">Результат: {result}</p>
    </main>
  );
}
