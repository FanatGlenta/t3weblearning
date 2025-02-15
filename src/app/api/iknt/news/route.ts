import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db"; // Подключение к БД
import { news } from "~/server/db/schema"; // Импорт таблицы новостей

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newNews = await db
      .insert(news)
      .values({
        title,
        description,
        imageUrl,
      })
      .returning();

    return res.status(201).json({ message: "News added", news: newNews });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
