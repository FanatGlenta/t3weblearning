"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md"
      >
        {/* Заголовок */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-3xl font-bold"
        >
          О компании
        </motion.h1>

        {/* Описание компании */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 text-lg text-gray-700"
        >
          Добро пожаловать в наш интернет-магазин! Мы занимаемся продажей
          качественных товаров и предоставляем высокий уровень сервиса.
        </motion.p>

        {/* Миссия и ценности */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-2xl font-semibold"
        >
          Наша миссия
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4 text-lg text-gray-700"
        >
          Мы стремимся делать покупки удобными и доступными каждому клиенту.
          Наша цель — предложить товары высокого качества по доступным ценам и
          создать лучший клиентский сервис.
        </motion.p>

        {/* Преимущества */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4 text-2xl font-semibold"
        >
          Наши преимущества
        </motion.h2>
        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-4 list-disc pl-6 text-lg text-gray-700"
        >
          <li>Широкий ассортимент товаров.</li>
          <li>Быстрая и надежная доставка.</li>
          <li>Гарантия качества на все товары.</li>
          <li>Профессиональная поддержка клиентов 24/7.</li>
          <li>Безопасная оплата.</li>
        </motion.ul>

        {/* Гарантии */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-4 text-2xl font-semibold"
        >
          Гарантия и возврат
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-4 text-lg text-gray-700"
        >
          Мы гарантируем качество каждого товара. Если продукт оказался
          бракованным или не соответствует описанию, вы можете вернуть его в
          течение 14 дней после покупки.
        </motion.p>

        {/* Оплата */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-4 text-2xl font-semibold"
        >
          Оплата
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mb-4 text-lg text-gray-700"
        >
          Мы принимаем следующие способы оплаты:
        </motion.p>
        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-4 list-disc pl-6 text-lg text-gray-700"
        >
          <li>Банковские карты (Visa, MasterCard, Мир).</li>
          <li>Электронные кошельки (ЮMoney, QIWI, WebMoney).</li>
          <li>Переводы через СБП.</li>
          <li>Наличный расчет при получении.</li>
        </motion.ul>

        {/* Контакты */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mb-4 text-2xl font-semibold"
        >
          Контакты
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-2 text-lg text-gray-700"
        >
          <strong>Телефон:</strong>{" "}
          <a href="tel:" className="text-blue-500">
            +7 (800) 123-45-67
          </a>
        </motion.p>

        {/* Социальные сети */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-4 text-2xl font-semibold"
        >
          Мы в социальных сетях
        </motion.h2>
        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="list-disc pl-6 text-lg text-gray-700"
        >
          <li>
            <a
              href="https://t.me/fanatglenta"
              className="text-blue-500"
              target="_blank"
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              href="https://vk.com/fanatglenta"
              className="text-blue-500"
              target="_blank"
            >
              ВКонтакте
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/"
              className="text-blue-500"
              target="_blank"
            >
              Instagram
            </a>
          </li>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
