"use client";

import IKNTMainBlock from "./components/MainBlock";
import InfoBlock from "./components/AboutIknt";
import IkntFaculty from "./components/IkntFaculty";
import Advantages from "./components/Advantages";
import NewsSection from "./components/News";
import TeachersSection from "./components/Teachers";

export default function IKNTPage() {
  return (
    <div className="relative h-full bg-[#191919] text-white">
      {/* Главный блок */}
      <IKNTMainBlock />

      {/* Блок с фото и описанием */}
      <InfoBlock />

      {/* Блок с направлениями */}
      <IkntFaculty />

      {/* Преимущества */}
      <Advantages />

      {/* Новости */}
      <NewsSection />

      {/* Преподаватели */}
      <TeachersSection />

      {/* Футер */}
      <footer className="bg-[#191919] py-4 text-center text-gray-400 sm:py-6">
        © 2025 ИКНТ. Все права защищены.
      </footer>
    </div>
  );
}
