"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import Loader from "~/components/Loader";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  previewImageUrl: string;
  images: string[];
}

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  const getFileName = (url: string) => {
    return url.split("/").pop();
  };

  useEffect(() => {
    if (!params || !params.id) return;

    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/iknt/news/${params.id}`);
        if (!response.ok) throw new Error("Новость не найдена");

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка загрузки новости:", error);
        router.push("/iknt/newsNotFound");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params, router]);

  if (loading) return <Loader />;

  if (!news)
    return (
      <div className="flex flex-col items-center justify-center p-6 text-white">
        <p className="text-lg">Новость не найдена.</p>
        <Button className="mt-4" onClick={() => router.push("/iknt/news")}>
          Назад к новостям
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#191919] p-6 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Заголовок новости */}
        <h1 className="text-4xl font-bold">{news.title}</h1>

        {/* Галерея изображений */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {news.images.length > 0
            ? news.images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg"
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={imgUrl}
                      alt={`Изображение ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                  <span>{getFileName(imgUrl)}</span>
                </div>
              ))
            : news.previewImageUrl && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={news.previewImageUrl}
                      alt="Обложка новости"
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
        </div>

        {/* Описание новости */}
        <p className="mt-6 text-lg leading-relaxed text-gray-300">
          {news.description}
        </p>

        {/* Кнопка назад */}
        <div className="mt-10">
          <Button
            className="bg-blue-600 px-6 py-3 text-lg font-semibold hover:bg-blue-500"
            onClick={() => router.push("/iknt")}
          >
            Назад к новостям
          </Button>
        </div>
      </div>
    </div>
  );
}
