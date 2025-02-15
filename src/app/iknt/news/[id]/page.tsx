"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
}

export default function NewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params); // ✅ Используем `use()` для получения id
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    // Загружаем id из params
    const newsId = unwrappedParams.id;

    // Здесь должен быть API-запрос
    const newsData = [
      {
        id: "1",
        title: "ИКНТ запускает новый курс по AI",
        content: "Подробное описание курса, расписание и условия участия...",
        image: "/images/ai-course.jpg",
      },
      {
        id: "2",
        title: "Хакатон 2025",
        content: "Все подробности о хакатоне, правила и регистрация...",
        image: "/images/hackathon.jpg",
      },
      {
        id: "3",
        title: "Новая лаборатория IoT",
        content: "Какие технологии доступны в новой лаборатории?",
        image: "/images/iot-lab.jpg",
      },
    ];

    const newsItem = newsData.find((n) => n.id === newsId);
    if (newsItem) {
      setNews(newsItem);
    } else {
      router.push("/iknt/news");
    }
  }, [unwrappedParams.id, router]);

  if (!news) return <p className="text-white">Загрузка...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#191919] p-6 text-white">
      <div className="w-full max-w-4xl">
        <Image
          src={news.image}
          alt={news.title}
          width={800}
          height={400}
          className="w-full rounded-md"
        />
        <h1 className="mt-6 text-center text-4xl font-bold">{news.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{news.content}</p>

        {/* Кнопка "Назад" */}
        <div className="mt-10 flex justify-center">
          <button
            className="rounded-md bg-[#00C6FF] px-6 py-3 text-lg text-white hover:bg-[#0072FF]"
            onClick={() => router.push("/iknt")}
          >
            Назад к новостям
          </button>
        </div>
      </div>
    </div>
  );
}
