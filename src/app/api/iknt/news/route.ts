import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { news, newsImages } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, previewImageUrl, images } = body;

    if (!title || !description || !previewImageUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Добавляем новость
    const [newNews] = await db
      .insert(news)
      .values({
        title,
        description,
        previewImageUrl,
      })
      .returning();

    if (!newNews) {
      return NextResponse.json(
        { message: "Failed to create news" },
        { status: 500 },
      );
    }

    // Добавляем дополнительные изображения, если они есть
    if (images && Array.isArray(images) && images.length > 0) {
      await db.insert(newsImages).values(
        images.map((imageUrl: string) => ({
          newsId: newNews.id,
          imageUrl,
        })),
      );
    }

    return NextResponse.json(
      { message: "News added", news: newNews },
      { status: 201 },
    );
  } catch (error) {
    console.error("Ошибка при добавлении новости:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing news ID" }, { status: 400 });
    }

    // Удаляем изображения, связанные с новостью
    await db.delete(newsImages).where(eq(newsImages.newsId, id));

    // Удаляем саму новость
    const deletedNews = await db
      .delete(news)
      .where(eq(news.id, id))
      .returning();

    if (!deletedNews.length) {
      return NextResponse.json(
        { message: "Failed to delete news" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "News deleted" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении новости:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, previewImageUrl, images } = body;

    if (
      !id ||
      !title ||
      !description ||
      !previewImageUrl ||
      !Array.isArray(images)
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await db.transaction(async (trx) => {
      // Обновляем новость
      await trx
        .update(news)
        .set({ title, description, previewImageUrl })
        .where(eq(news.id, id));

      // Удаляем старые изображения и добавляем новые
      await trx.delete(newsImages).where(eq(newsImages.newsId, id));
      await trx
        .insert(newsImages)
        .values(images.map((imageUrl) => ({ newsId: id, imageUrl })));
    });

    return NextResponse.json(
      { message: "News updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка при обновлении новости:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
