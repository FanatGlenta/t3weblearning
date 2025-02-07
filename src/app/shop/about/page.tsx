"use client";

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">О компании</h1>
        <p className="mb-4 text-lg text-gray-700">
          Добро пожаловать в наш интернет-магазин! Мы занимаемся продажей
          качественных товаров и предоставляем высокий уровень сервиса.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Наша компания была основана в 2020 году, и с тех пор мы активно
          развиваемся, расширяя ассортимент и улучшая качество обслуживания.
        </p>
        <p className="mb-6 text-lg text-gray-700">
          Мы ценим наших клиентов и стремимся обеспечить комфортные условия
          покупок. Если у вас есть вопросы, свяжитесь с нашей службой поддержки.
        </p>

        {/* Раздел о доставке */}
        <h2 className="mb-4 text-2xl font-semibold">Доставка</h2>
        <p className="mb-4 text-lg text-gray-700">
          Мы осуществляем доставку по всей России и странам СНГ. Доступны
          следующие варианты доставки:
        </p>
        <ul className="mb-4 list-disc pl-6 text-lg text-gray-700">
          <li>
            <strong>Курьерская доставка</strong> – от 1 до 3 дней в крупных
            городах.
          </li>
          <li>
            <strong>Доставка почтой</strong> – от 3 до 10 дней в зависимости от
            региона.
          </li>
          <li>
            <strong>Пункты самовывоза</strong> – доступно в более чем 100
            городах.
          </li>
        </ul>
        <p className="mb-6 text-lg text-gray-700">
          Стоимость доставки зависит от региона и рассчитывается при оформлении
          заказа.
        </p>

        {/* Контактные данные */}
        <h2 className="mb-4 text-2xl font-semibold">Контакты</h2>
        <p className="mb-2 text-lg text-gray-700">
          <strong>Телефон:</strong>{" "}
          <a href="tel:+78001234567" className="text-blue-500">
            +7 (800) 123-45-67
          </a>
        </p>
        <p className="mb-2 text-lg text-gray-700">
          <strong>Email:</strong>{" "}
          <a href="mailto:info@yourshop.ru" className="text-blue-500">
            info@yourshop.ru
          </a>
        </p>
        <p className="mb-2 text-lg text-gray-700">
          <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 10, офис 5
        </p>
        <p className="mb-6 text-lg text-gray-700">
          <strong>График работы:</strong> Пн-Пт с 9:00 до 20:00, Сб-Вс с 10:00
          до 18:00
        </p>

        {/* Социальные сети */}
        <h2 className="mb-4 text-2xl font-semibold">Мы в социальных сетях</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li>
            <a href="https://t.me/" className="text-blue-500">
              Telegram
            </a>
          </li>
          <li>
            <a href="https://vk.com/" className="text-blue-500">
              ВКонтакте
            </a>
          </li>
          <li>
            <a href="https://instagram.com/" className="text-blue-500">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
