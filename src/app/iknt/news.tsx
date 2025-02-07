"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Новости</h1>
      {news.map((item) => (
        <div key={item.id} className="rounded-lg border p-4 shadow">
          <h2 className="text-xl font-bold">{item.title}</h2>
        </div>
      ))}
    </main>
  );
}
