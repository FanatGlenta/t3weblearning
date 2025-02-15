"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  id: number; // Исправил тип с string на number, так как id теперь integer в БД
  title: string;
  description: string;
  imageUrl: string; // Исправил с `image` на `imageUrl`, чтобы соответствовать БД
}

export default function NewsCard({
  id,
  title,
  description,
  imageUrl,
}: NewsCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-[#252525] shadow-md transition-transform hover:scale-105"
      onClick={() => router.push(`/iknt/news/${id}`)}
    >
      {/* Картинка новости */}
      <div className="relative h-48 w-full sm:h-60">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Контент */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-gray-400">{description}</p>
      </div>

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-400"></div>
    </div>
  );
}
