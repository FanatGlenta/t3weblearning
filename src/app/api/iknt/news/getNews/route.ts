import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { news, newsImages } from "~/server/db/schema";
import { desc, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Получаем список новостей
    const allNews = await db.select().from(news).orderBy(desc(news.createdAt));

    // Если новостей нет, сразу возвращаем пустой массив
    if (allNews.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Получаем ID всех загруженных новостей
    const newsIds = allNews.map((n) => n.id);

    // Получаем изображения для всех новостей
    const images = await db
      .select()
      .from(newsImages)
      .where(inArray(newsImages.newsId, newsIds));

    // Группируем изображения по новостям
    const newsWithImages = allNews.map((n) => ({
      ...n,
      images: images
        .filter((img) => img.newsId === n.id)
        .map((img) => img.imageUrl),
    }));

    return NextResponse.json(newsWithImages, { status: 200 });
  } catch (error) {
    console.error("Ошибка сервера при загрузке новостей:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
