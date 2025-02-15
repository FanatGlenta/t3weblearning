"use client";

import { useState, useEffect } from "react";
import NewsCard from "~/components/iknt/NewsCard";
import Loader from "~/components/Loader";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/iknt/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="news"
      className="relative flex flex-col items-center justify-center bg-[#191919] px-6 py-16 text-center"
    >
      <h2 className="text-3xl font-bold text-white sm:text-5xl">
        Последние <span className="text-blue-400">новости</span>
      </h2>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : news.length === 0 ? (
        <p className="mt-6 text-white">Новостей пока нет.</p>
      ) : (
        <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {news.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-blue-400"></div>
    </section>
  );
}
