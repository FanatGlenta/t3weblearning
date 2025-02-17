"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import NewsSVG from "~/assets/news";
import NewsCard from "~/components/iknt/NewsCard";
import Loader from "~/components/Loader";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  previewImageUrl: string;
}

export default function NewsSection() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(3); // Начинаем с 3 новостей
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/iknt/news/getNews")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.slice(0, 12)); // Ограничиваем максимум 12 новостей
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, news.length));
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
      id="news"
      className="relative flex flex-col items-center justify-center bg-[#191919] px-6 py-16 text-center"
    >
      <h2 className="text-3xl font-bold text-white sm:text-5xl">
        {t("news.latest_news")}{" "}
        <span className="text-blue-400">{t("news.news_highlight")}</span>
      </h2>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : news.length === 0 ? (
        // Заглушка, если новостей пока нет
        <div className="mt-10 flex flex-col items-center text-gray-400">
          <NewsSVG />
          <p className="mt-6 text-xl font-semibold text-gray-300">
            {t("news.no_news")}
          </p>
          <p className="text-md mt-2 text-gray-500">
            {t("news.no_news_description")}
          </p>
        </div>
      ) : (
        <>
          <motion.div
            className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {news.slice(0, visibleCount).map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                custom={index}
                variants={cardVariants}
              >
                <NewsCard
                  id={newsItem.id}
                  title={newsItem.title}
                  description={newsItem.description}
                  imageUrl={newsItem.previewImageUrl}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Кнопка "Показать еще", если есть скрытые новости */}
          {visibleCount < news.length && (
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
              {t("news.show_more")}
            </motion.button>
          )}
        </>
      )}

      <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-blue-400"></div>
    </section>
  );
}
