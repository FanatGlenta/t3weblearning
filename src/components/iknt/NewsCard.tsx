"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl?: string; // Сделаем imageUrl необязательным
}

export default function NewsCard({
  id,
  title,
  description,
  imageUrl,
}: NewsCardProps) {
  const router = useRouter();
  const fallbackImage = "/images/placeholder.png";

  return (
    <div
      className="relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-[#252525] shadow-md transition-transform hover:scale-105"
      onClick={() => router.push(`/iknt/news/${id}`)}
    >
      {/* Картинка новости */}
      <div className="relative h-48 w-full sm:h-60">
        {imageUrl && imageUrl.trim() !== "" ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <Image
            src={fallbackImage}
            alt="No image available"
            fill
            className="object-cover"
          />
        )}
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
