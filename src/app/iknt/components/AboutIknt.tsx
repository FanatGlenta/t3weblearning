import Image from "next/image";
import React from "react";
import AboutIKNT from "~/assets/AboutIKNT.png";

const InfoBlock: React.FC = () => {
  return (
    <section className="flex w-full flex-col justify-between gap-32 p-28 font-golos font-normal text-white md:flex-row">
      {/* Текстовый блок */}
      <div className="flex w-full flex-col justify-between">
        <p className="w-full text-2xl">
          «Основной задачей ИКНТ является <br /> создание условий для получения
          знаний,
          <br /> позволяющих нашим выпускникам найти <br /> направление
          деятельности в большом
          <br /> мире информационных технологий и<br /> полностью раскрыть свой
          <br />
          интеллектуальный потенциал»
        </p>
        <p className="text-2xl font-normal">Автайкин С.В. директор ИКНТ</p>
      </div>

      {/* Изображение */}
      <div className="flex justify-end">
        <Image src={AboutIKNT} alt="ИКНТ команда" className="rounded-lg" />
      </div>
    </section>
  );
};

export default InfoBlock;
