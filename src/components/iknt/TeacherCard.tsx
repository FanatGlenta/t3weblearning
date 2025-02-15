"use client";

import Image from "next/image";

interface TeacherCardProps {
  name: string;
  position: string;
  image: string;
}

export default function TeacherCard({
  name,
  position,
  image,
}: TeacherCardProps) {
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-lg bg-[#252525] p-4 shadow-md transition-transform hover:scale-105">
      {/* Фото преподавателя */}
      <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Имя и должность */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{position}</p>
      </div>

      {/* Декоративная линия */}
      <div className="mt-2 h-1 w-16 bg-blue-400"></div>
    </div>
  );
}
