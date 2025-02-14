"use client";

import { useEffect, useState } from "react";
import IKNTMainBlock from "./components/MainBlock";
import InfoBlock from "./components/AboutIknt";
import IkntFaculty from "./components/IkntFaculty";
import Advantages from "./components/Advantages";

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
      <InfoBlock />

      {/* Блок с направлениями */}
      <IkntFaculty />

      {/* Преимущества */}
      <Advantages />

      {/* Футер */}
      <footer className="bg-[#191919] py-4 text-center text-gray-400 sm:py-6">
        © 2025 ИКНТ. Все права защищены.
      </footer>
    </div>
  );
}
