"use client";

import bg from "~/assets/bg-faculty.png";
import { useTranslation } from "react-i18next";

const IkntFaculty: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="flex gap-36 bg-cover bg-center px-20 py-8 text-center text-white sm:py-12"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="flex flex-col justify-start gap-4">
        <h3 className="text-left text-xl font-bold sm:text-2xl">
          {t("IkntFaculty.software_security")}
        </h3>
        <button className="w-1/2 rounded-lg bg-white px-4 py-2 text-black">
          {t("IkntFaculty.enroll")}
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4">
        <h3 className="text-left text-xl font-bold sm:text-2xl">
          {t("IkntFaculty.ai_devops_gamedev")}
        </h3>
        <button className="w-1/2 rounded-lg bg-white px-4 py-2 text-black">
          {t("IkntFaculty.enroll")}
        </button>
      </div>
    </section>
  );
};

export default IkntFaculty;
