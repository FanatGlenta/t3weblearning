"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import AboutIKNT from "~/assets/AboutIKNT.png";

const InfoBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="flex w-full flex-col justify-between gap-32 p-28 font-golos font-normal text-white md:flex-row">
      {/* Текстовый блок */}
      <div className="flex w-full flex-col justify-between">
        <p className="w-full text-2xl">{t("aboutUs.mission")}</p>
        <p className="text-2xl font-normal">{t("aboutUs.director")}</p>
      </div>

      {/* Изображение */}
      <div className="flex justify-end">
        <Image src={AboutIKNT} alt="IKNT Team" className="rounded-lg" />
      </div>
    </section>
  );
};

export default InfoBlock;
