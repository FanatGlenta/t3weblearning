"use client";

import Image from "next/image";
import Photo from "~/assets/mainBlock.png";
import Arrow from "~/assets/arrow.png";
import NavBarIKNT from "~/components/iknt/NavBarIKNT";
import { useTranslation } from "react-i18next";

export default function IKNTMainBlock() {
  const { t } = useTranslation();

  const homeLinks = [
    { title: t("mainPage.about_us"), link: "#aboutUs" },
    { title: t("mainPage.news"), link: "#news" },
    { title: t("mainPage.teachers"), link: "#teachers" },
  ] as const;

  return (
    <section
      id="AboutUs"
      className="relative z-10 flex h-screen flex-col items-center justify-center px-4 py-10 pt-0 text-center sm:px-10 sm:py-20"
    >
      <NavBarIKNT
        links={homeLinks}
        brand={{ title: "FanatGlenta", link: "/" }}
      />

      <Image
        src={Photo}
        alt="Фото"
        className="absolute left-1/2 top-1/2 z-[-1] hidden h-auto max-h-[1080px] w-auto max-w-[1920px] -translate-x-1/2 -translate-y-1/2 sm:block"
      />

      <div className="flex w-full max-w-[900px] flex-col items-center font-golos font-medium sm:items-start">
        {/* Текст "Получи" и "Высшее образование" */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
          <span className="mt-2 font-cormorant text-4xl italic text-[#E0E0E0] sm:text-4xl">
            {t("mainPage.get")}
          </span>
          <h2 className="text-nowrap text-3xl font-medium sm:text-6xl md:text-7xl">
            {t("mainPage.higher_education")}
          </h2>
        </div>

        {/* Текст "в IT-сфере" и кнопка со стрелкой */}
        <div className="mt-4 flex w-full flex-col items-center justify-center sm:flex-row sm:justify-between">
          <h2 className="text-3xl font-bold sm:text-6xl md:text-7xl">
            {t("mainPage.in_it")}
          </h2>
          <button className="mt-4 sm:mt-0">
            <Image
              src={Arrow}
              alt="Arrow"
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          </button>
        </div>

        {/* Текст "Первый IT на Урале" */}
        <p className="mt-6 text-left text-xl text-[#E0E0E0] sm:absolute sm:bottom-20 sm:left-20 sm:text-2xl">
          {t("mainPage.first_it_in_urals")}
        </p>
      </div>

      {/* Кнопка "Поступить" */}
      <button className="mt-8 w-56 rounded-lg border-2 border-white bg-transparent px-4 py-2 text-xl sm:absolute sm:bottom-20 sm:right-20 sm:w-72 sm:px-6 sm:py-3 sm:text-2xl">
        {t("mainPage.enroll")}
      </button>
    </section>
  );
}
