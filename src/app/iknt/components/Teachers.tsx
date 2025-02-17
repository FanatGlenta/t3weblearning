"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TeacherSVG from "~/assets/teacher";
import TeacherCard from "~/components/iknt/TeacherCard";
import { fetchTeachers, Teacher } from "~/services/getTeachers";

export default function TeachersSection() {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      const data = await fetchTeachers();
      setTeachers(data);
      setLoading(false);
    }

    loadTeachers();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, teachers.length));
  };

  // Анимация появления карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="teachers"
      className="relative flex flex-col items-center bg-[#191919] px-6 py-16 text-center"
    >
      {/* Заголовок */}
      <h2 className="text-3xl font-bold text-white sm:text-5xl">
        {t("teachers.title")}{" "}
        <span className="text-blue-400">{t("teachers.highlight")}</span>
      </h2>

      {/* Загрузка */}
      {loading ? (
        <p className="mt-10 text-lg text-gray-300">{t("loading")}</p>
      ) : teachers.length > 0 ? (
        <>
          {/* Карточки преподавателей */}
          <motion.div
            className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {teachers.slice(0, visibleCount).map((teacher, index) => (
              <motion.div
                key={teacher.id}
                custom={index}
                variants={cardVariants}
              >
                <TeacherCard
                  name={teacher.name}
                  position={teacher.position}
                  image={teacher.imageUrl}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Кнопка "Показать еще", если есть скрытые преподаватели */}
          {visibleCount < teachers.length && (
            <motion.button
              onClick={handleShowMore}
              className="mt-6 rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
            >
              {t("teachers.show_more")}
            </motion.button>
          )}
        </>
      ) : (
        // Заглушка, если преподавателей нет
        <div className="mt-10 flex flex-col items-center text-gray-400">
          <TeacherSVG />
          <p className="mt-6 text-xl font-semibold text-gray-300">
            {t("teachers.no_teachers")}
          </p>
          <p className="text-md mt-2 text-gray-500">
            {t("teachers.no_teachers_description")}
          </p>
        </div>
      )}

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-blue-400"></div>
    </section>
  );
}
