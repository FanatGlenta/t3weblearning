import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { news } from "~/server/db/schema";
import { desc } from "drizzle-orm"; // Импортируем desc()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Используем desc() для сортировки по убыванию даты создания
    const allNews = await db.select().from(news).orderBy(desc(news.createdAt));

    return res.status(200).json(allNews);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
