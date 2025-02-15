import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { news, newsImages } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    // Дождаться загрузки параметров (исправляет ошибку "params should be awaited")
    const { params } = await context;

    if (!params || !params.id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    const newsId = parseInt(params.id, 10);

    if (isNaN(newsId)) {
      return NextResponse.json({ message: "Invalid news ID" }, { status: 400 });
    }

    // Получаем новость из БД
    const foundNews = await db.select().from(news).where(eq(news.id, newsId));

    if (foundNews.length === 0) {
      return NextResponse.json(
        { message: "Новость не найдена" },
        { status: 404 },
      );
    }

    const newsItem = foundNews[0];

    // Получаем изображения новости
    const images = await db
      .select()
      .from(newsImages)
      .where(eq(newsImages.newsId, newsId));

    return NextResponse.json({
      ...newsItem,
      images: images.map((img) => img.imageUrl), // Добавляем массив изображений
    });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
