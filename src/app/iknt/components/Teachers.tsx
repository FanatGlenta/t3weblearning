"use client";

import { useState, useEffect } from "react";
import TeacherSVG from "~/assets/teacher";
import TeacherCard from "~/components/iknt/TeacherCard";
import { fetchTeachers, Teacher } from "~/services/getTeachers";

export default function TeachersSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function loadTeachers() {
      const data = await fetchTeachers();
      setTeachers(data);
    }

    loadTeachers();
  }, []);

  return (
    <section
      id="teachers"
      className="relative flex flex-col items-center bg-[#191919] px-6 py-16 text-center"
    >
      {/* Заголовок */}
      <h2 className="text-3xl font-bold text-white sm:text-5xl">
        Наши <span className="text-blue-400">преподаватели</span>
      </h2>

      {/* Если есть преподаватели - показываем карточки */}
      {teachers.length > 0 ? (
        <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {teachers.map(({ id, name, position, imageUrl }) => (
            <TeacherCard
              key={id}
              name={name}
              position={position}
              image={imageUrl}
            />
          ))}
        </div>
      ) : (
        // Заглушка, если преподавателей нет
        <div className="mt-10 flex flex-col items-center text-gray-400">
          <TeacherSVG />
          <p className="mt-6 text-xl font-semibold text-gray-300">
            Преподаватели пока не добавлены
          </p>
          <p className="text-md mt-2 text-gray-500">
            Скоро они появятся, оставайтесь с нами!
          </p>
        </div>
      )}

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-blue-400"></div>
    </section>
  );
}
