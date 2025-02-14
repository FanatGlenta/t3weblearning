"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import IKNTMainBlock from "./components/mainBlock";

export default function IKNTPage() {
  "use client";

  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }

    const handleResize = () => {
      if (navbar) setNavHeight(navbar.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full bg-[#191919] text-white">
      {/* Главный блок */}
      <IKNTMainBlock />

      {/* Блок с фото и описанием */}
      <section className="flex flex-col items-center justify-between gap-10 px-4 py-10 sm:flex-row sm:px-10 sm:py-16">
        <p className="w-full text-center text-lg text-gray-300 sm:w-1/2 sm:text-left sm:text-xl">
          «Основной задачей ИКНТ является создание условий для получения
          знаний...»
        </p>
        <Image
          src="/iknt_photo.jpg"
          alt="ИКНТ"
          width={400}
          height={250}
          className="h-auto w-full max-w-[400px]"
        />
      </section>

      {/* Блок с направлениями */}
      <section className="bg-blue-600 py-8 text-center text-white sm:py-12">
        <h3 className="text-xl font-bold sm:text-2xl">
          Вам интересна разработка ПО или ИИ?
        </h3>
        <button className="mt-4 rounded-lg bg-black px-4 py-2 hover:bg-gray-800 sm:px-6 sm:py-3">
          Поступить!
        </button>
      </section>

      {/* Преимущества */}
      <section className="px-4 py-8 sm:px-10 sm:py-12" id="news">
        <h3 className="text-center text-xl font-bold sm:text-2xl">
          Наши преимущества
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-gray-800 p-4 sm:p-6">
            <h4 className="font-semibold">Квалифицированные преподаватели</h4>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Наши преподаватели – опытные специалисты...
            </p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4 sm:p-6">
            <h4 className="font-semibold">Современное оборудование</h4>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Студенты имеют доступ к лабораториям...
            </p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4 sm:p-6">
            <h4 className="font-semibold">Карьерное планирование</h4>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Мы помогаем студентам строить карьеру...
            </p>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 py-4 text-center text-gray-400 sm:py-6">
        © 2025 ИКНТ. Все права защищены.
      </footer>
    </div>
  );
}
