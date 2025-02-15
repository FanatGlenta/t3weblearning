"use client";

import { useState, useEffect } from "react";
import TeacherCard from "~/components/iknt/TeacherCard";

interface Teacher {
  id: string;
  name: string;
  position: string;
  image: string;
}

export default function TeachersSection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Здесь можно сделать запрос к API, пока используем моковые данные
    setTeachers([
      {
        id: "1",
        name: "Иванов Иван Иванович",
        position: "Профессор кафедры ИТ",
        image: "/images/teacher1.jpg",
      },
      {
        id: "2",
        name: "Петров Петр Петрович",
        position: "Доцент кафедры программирования",
        image: "/images/teacher2.jpg",
      },
      {
        id: "3",
        name: "Сидорова Анна Викторовна",
        position: "Старший преподаватель кафедры ИИ",
        image: "/images/teacher3.jpg",
      },
    ]);
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

      {/* Сетка с карточками преподавателей */}
      <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} {...teacher} />
        ))}
      </div>

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-blue-400"></div>
    </section>
  );
}
